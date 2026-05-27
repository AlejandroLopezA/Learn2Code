import { Link } from "react-router-dom";

import { useAuth } from "../context/authcontext";

import challenges from "../data/challenges";

import "../styles/challenges.css";

function Challenges() {

  const { user } = useAuth();

  return (

    <div>

      <div className="page-header">

        <h1>
          Coding Challenges
        </h1>

        <p>
          Improve your programming skills solving challenges
        </p>

      </div>

      <div className="challenges-grid">

        {challenges.map((challenge) => (

          <Link
            key={challenge.id}
            to={`/challenges/${challenge.id}`}
            className={`challenge-card ${
              user.completedChallenges.includes(challenge.id)
                ? "completed"
                : ""
            }`}
          >

            <div className="card-content">

              <div className="card-top">

                <h2>
                  {challenge.title}
                </h2>

                <span
                  className={`difficulty ${challenge.difficulty}`}
                >
                  {challenge.difficulty}
                </span>

              </div>

              <p>
                {challenge.description}
              </p>

              <div className="card-bottom">

                <span>
                  {challenge.points} points
                </span>

              </div>

            </div>

            {user.completedChallenges.includes(challenge.id) && (

              <div className="completed-overlay">

                ✓ Completed

              </div>

            )}

          </Link>

        ))}

      </div>

    </div>

  );
}

export default Challenges;