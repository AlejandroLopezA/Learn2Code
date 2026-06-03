import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Play,
  RotateCcw,
  Send,
} from "lucide-react";

import Editor from "@monaco-editor/react";

import challenges from "../data/challenges";

import { useAuth } from "../context/authcontext";

import "../styles/challengeDetail.css";

function ChallengeDetail() {

  const { id } = useParams();

  const challenge = challenges.find(
    (c) => c.id === Number(id)
  );

  const { completeChallenge } = useAuth();

  const [language, setLanguage] =
    useState("javascript");

  const storageKey =
    `challenge-${challenge?.id || "missing"}-${language}`;

  const templates = {

    javascript:
      challenge?.starterCode ||
`function twoSum(nums, target) {

}`,
    python:
`def two_sum(nums, target):

    pass`,

    java:
`class Solution {

    public int[] twoSum(int[] nums, int target) {

    }

}`,

    cpp:
`class Solution {
public:

    vector<int> twoSum(vector<int>& nums, int target) {

    }

};`
  };

  const [code, setCode] = useState(() => {

    const savedCode =
      localStorage.getItem(storageKey);

    return (
      savedCode ||
      templates[language]
    );
  });

  const [result, setResult] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [isSuccess, setIsSuccess] =
    useState(false);

  const [isChecking, setIsChecking] =
    useState(false);

  useEffect(() => {

    localStorage.setItem(
      storageKey,
      code
    );

  }, [code, storageKey]);

  const loadTemplate = (nextLanguage) => {

    setLanguage(nextLanguage);

    const savedCode =
      localStorage.getItem(
        `challenge-${challenge.id}-${nextLanguage}`
      );

    setCode(
      savedCode ||
      templates[nextLanguage]
    );

    setResult("");
    setOutput("");
    setFeedback("");
    setIsSuccess(false);
  };

  const checkSolution = async (completeOnSuccess) => {

    setIsChecking(true);
    setResult("");
    setOutput("");
    setFeedback("");
    setIsSuccess(false);

    try {

      const response = await fetch("/api/check-solution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          challenge: {
            title: challenge.title,
            description: challenge.description,
            example: challenge.example,
            testCases: challenge.testCases || []
          },
          language,
          code
        })
      });

      const review = await response.json();

      setOutput(review.output || "");
      setFeedback(review.feedback || "");
      setIsSuccess(Boolean(review.correct));

      if (review.correct) {

        if (completeOnSuccess) {

          await completeChallenge(challenge);
        }

        setResult("Lo has hecho bien");

      } else {

        setResult("Hay algo que corregir");
      }

    } catch {

      setResult("Hay algo que corregir");
      setFeedback(
        "No se ha podido conectar con la correccion. Comprueba que la app esta arrancada con OPENAI_API_KEY configurada."
      );
      setIsSuccess(false);

    } finally {

      setIsChecking(false);
    }
  };

  const runCode = () => {

    checkSolution(false);
  };

  const submitSolution = () => {

    checkSolution(true);
  };

  const resetCode = () => {

    localStorage.removeItem(storageKey);

    setCode(
      templates[language]
    );

    setResult("");
    setOutput("");
    setFeedback("");
    setIsSuccess(false);
  };

  if (!challenge) {

    return (

      <div className="missing-challenge">

        <Link
          to="/challenges"
          className="back-button"
        >

          <ArrowLeft size={18} />

          Back to Challenges

        </Link>

        <h1>
          Challenge not found
        </h1>

      </div>
    );
  }

  return (

    <div>

      <Link
        to="/challenges"
        className="back-button"
      >

        <ArrowLeft size={18} />

        Back to Challenges

      </Link>

      <div className="challenge-detail-page">

        <div className="challenge-info">

          <div className="challenge-header">

            <div>

              <h1>
                {challenge.title}
              </h1>

              <p>
                Solve this coding challenge.
              </p>

            </div>

            <div className="challenge-meta">

              <span
                className={`difficulty ${challenge.difficulty}`}
              >
                {challenge.difficulty}
              </span>

              <span className="points">
                {challenge.points} pts
              </span>

            </div>

          </div>

          <div className="challenge-description">

            <h2>Description</h2>

            <p>
              {challenge.description}
            </p>

            <div className="example-box">

              <h3>Example</h3>

              <pre>
                {challenge.example}
              </pre>

            </div>

          </div>

        </div>

        <div className="editor-section">

          <div className="editor-header">

            <div className="language-tabs">

              <button
                className={
                  language === "javascript"
                    ? "active-language"
                    : ""
                }
                onClick={() =>
                  loadTemplate("javascript")
                }
              >
                JavaScript
              </button>

              <button
                className={
                  language === "python"
                    ? "active-language"
                    : ""
                }
                onClick={() =>
                  loadTemplate("python")
                }
              >
                Python
              </button>

              <button
                className={
                  language === "java"
                    ? "active-language"
                    : ""
                }
                onClick={() =>
                  loadTemplate("java")
                }
              >
                Java
              </button>

              <button
                className={
                  language === "cpp"
                    ? "active-language"
                    : ""
                }
                onClick={() =>
                  loadTemplate("cpp")
                }
              >
                C++
              </button>

            </div>

            <button
              className="reset-button"
              onClick={resetCode}
            >
              <RotateCcw size={16} />
              Reset Code
            </button>

          </div>

          <Editor
            height="500px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) =>
              setCode(value)
            }
            options={{
              minimap: {
                enabled: false
              }
            }}
          />

          <div className="editor-buttons">

            <button
              type="button"
              className="run-button"
              onClick={runCode}
              disabled={isChecking}
            >
              <Play size={18} />
              {isChecking ? "Checking..." : "Run Code"}
            </button>

            <button
              type="button"
              className="submit-button"
              onClick={submitSolution}
              disabled={isChecking}
            >
              <Send size={18} />
              Submit
            </button>

          </div>

          {result && (

            <div
              className={`result-box ${
                isSuccess ? "success" : "error"
              }`}
            >

              {result}

            </div>

          )}

          {feedback && !isSuccess && (

            <div className="feedback-panel">

              <label htmlFor="solution-feedback">
                Que has hecho mal
              </label>

              <textarea
                id="solution-feedback"
                value={feedback}
                readOnly
              />

            </div>

          )}

          <div className="testcases-panel">

            <h3>
              Test Cases
            </h3>

            <div className="testcase-box">

              <span className="label">
                Input
              </span>

              <pre>
                {challenge.testCases?.[0]?.input}
              </pre>

            </div>

            <div className="testcase-box">

              <span className="label">
                Expected Output
              </span>

              <pre>
                {challenge.testCases?.[0]?.expected}
              </pre>

            </div>

            <div className="testcase-box">

              <span className="label">
                Your Output
              </span>

              <pre>
                {output}
              </pre>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ChallengeDetail;
