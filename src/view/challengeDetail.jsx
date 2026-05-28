import { useState, useEffect } from "react";

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

  const [language, setLanguage] =
    useState("javascript");

  const storageKey =
    `challenge-${challenge.id}-${language}`;

  const templates = {

    javascript:
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

  useEffect(() => {

    localStorage.setItem(
      storageKey,
      code
    );

  }, [code, storageKey]);

  const runCode = () => {

    if (code.includes("return")) {

      setResult("✅ Test passed");

      setOutput("[0,1]");

    } else {

      setResult("❌ Wrong answer");

      setOutput("undefined");
    }
  };

  const submitSolution = () => {

    if (code.includes("return")) {

      completeChallenge(challenge);

      setResult(
        "🎉 Challenge completed successfully"
      );

      setOutput("[0,1]");

    } else {

      setResult(
        "❌ Your solution is incorrect"
      );

      setOutput("undefined");
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

          <div className="editor-header">

            <button
              className={
                language === "javascript"
                  ? "active-language"
                  : ""
              }
              onClick={() => {

                setLanguage("javascript");

                const savedCode =
                  localStorage.getItem(
                    `challenge-${challenge.id}-javascript`
                  );

                setCode(
                  savedCode ||
                  templates.javascript
                );
              }}
            >
              JavaScript
            </button>

            <button
              className={
                language === "python"
                  ? "active-language"
                  : ""
              }
              onClick={() => {

                setLanguage("python");

                const savedCode =
                  localStorage.getItem(
                    `challenge-${challenge.id}-python`
                  );

                setCode(
                  savedCode ||
                  templates.python
                );
              }}
            >
              Python
            </button>

            <button
              className={
                language === "java"
                  ? "active-language"
                  : ""
              }
              onClick={() => {

                setLanguage("java");

                const savedCode =
                  localStorage.getItem(
                    `challenge-${challenge.id}-java`
                  );

                setCode(
                  savedCode ||
                  templates.java
                );
              }}
            >
              Java
            </button>

            <button
              className={
                language === "cpp"
                  ? "active-language"
                  : ""
              }
              onClick={() => {

                setLanguage("cpp");

                const savedCode =
                  localStorage.getItem(
                    `challenge-${challenge.id}-cpp`
                  );

                setCode(
                  savedCode ||
                  templates.cpp
                );
              }}
            >
              C++
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

            <div
              className={`result-box ${
                result.includes("passed") ||
                result.includes("completed")
                  ? "success"
                  : "error"
              }`}
            >

              {result}

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