import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

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

  const [code, setCode] = useState(
    challenge.starterCode
  );

  const [result, setResult] = useState("");

  const runCode = () => {

  if (code.includes("return")) {

    setResult("✅ Test passed");

  } else {

    setResult("❌ Wrong answer");
  }
};

const submitSolution = () => {

  if (code.includes("return")) {

    completeChallenge(challenge);

    setResult(
      "🎉 Challenge completed successfully"
    );

  } else {

    setResult(
      "❌ Your solution is incorrect"
    );
  }
};

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

          <Editor
            height="500px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) =>
              setCode(value)
            }
          />

          <div className="editor-buttons">

            <button
              type="button"
              className="run-button"
              onClick={runCode}
            >
              Run Code
            </button>

            <button
              type="button"
              className="submit-button"
              onClick={submitSolution}
            >
              Submit
            </button>

          </div>

          {result && (

            <div className="result-box">

              {result}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default ChallengeDetail;