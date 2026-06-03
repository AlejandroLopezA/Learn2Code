import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const reviewSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    correct: {
      type: 'boolean',
    },
    output: {
      type: 'string',
    },
    feedback: {
      type: 'string',
    },
  },
  required: ['correct', 'output', 'feedback'],
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      resolve(body)
    })

    req.on('error', reject)
  })
}

function extractOutputText(response) {
  if (typeof response.output_text === 'string') {
    return response.output_text
  }

  return response.output
    ?.flatMap((item) => item.content || [])
    ?.find((content) => content.type === 'output_text')
    ?.text
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function openAiChallengeReviewPlugin(mode) {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.OPENAI_API_KEY
  const model = env.OPENAI_MODEL || 'gpt-5.4-mini'

  return {
    name: 'openai-challenge-review',
    configureServer(server) {
      server.middlewares.use('/api/check-solution', async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, {
            correct: false,
            output: '',
            feedback: 'Este endpoint solo acepta peticiones POST.',
          })
          return
        }

        if (!apiKey) {
          sendJson(res, 500, {
            correct: false,
            output: '',
            feedback:
              'Falta la clave de OpenAI. Crea un archivo .env con OPENAI_API_KEY=tu_clave y vuelve a arrancar la app.',
          })
          return
        }

        try {
          const body = await readRequestBody(req)
          const payload = JSON.parse(body)

          const openAiResponse = await fetch(
            'https://api.openai.com/v1/responses',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                input: [
                  {
                    role: 'developer',
                    content: [
                      {
                        type: 'input_text',
                        text:
                          'Eres un corrector de ejercicios de programacion. Revisa la solucion del alumno comparandola con el enunciado, el ejemplo y los casos de prueba. Responde solo con JSON valido segun el esquema. Marca correct=true solo si la solucion parece correcta para el problema, no solo para el ejemplo. Si es incorrecta, explica en espanol de forma breve y util que esta mal y como pensarlo.',
                      },
                    ],
                  },
                  {
                    role: 'user',
                    content: [
                      {
                        type: 'input_text',
                        text: JSON.stringify(payload, null, 2),
                      },
                    ],
                  },
                ],
                text: {
                  format: {
                    type: 'json_schema',
                    name: 'solution_review',
                    strict: true,
                    schema: reviewSchema,
                  },
                },
                max_output_tokens: 700,
              }),
            }
          )

          const openAiPayload = await openAiResponse.json()

          if (!openAiResponse.ok) {
            sendJson(res, openAiResponse.status, {
              correct: false,
              output: '',
              feedback:
                openAiPayload.error?.message ||
                'OpenAI no ha podido comprobar la solucion ahora mismo.',
            })
            return
          }

          const outputText = extractOutputText(openAiPayload)

          if (!outputText) {
            sendJson(res, 502, {
              correct: false,
              output: '',
              feedback:
                'OpenAI respondio sin un resultado legible. Prueba otra vez.',
            })
            return
          }

          sendJson(res, 200, JSON.parse(outputText))
        } catch {
          sendJson(res, 500, {
            correct: false,
            output: '',
            feedback:
              'No se ha podido comprobar la solucion. Revisa el codigo y vuelve a intentarlo.',
          })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), openAiChallengeReviewPlugin(mode)],
}))
