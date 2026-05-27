import { Link } from "react-router-dom";

import challenges from "../data/challenges";

import "../styles/challenges.css";

function Challenges() {

  return (

    <div>

      <div className="page-header">

        <h1>Coding Challenges</h1>

        <p>
          Improve your programming skills solving challenges
        </p>

      </div>

      <div className="challenges-grid">

        {challenges.map((challenge) => (

          <Link
            key={challenge.id}
            to={`/challenges/${challenge.id}`}
            className="challenge-card"
          >

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
              {challenge.points} points
            </p>

          </Link>

        ))}

      </div>

    </div>

  );
}

export default Challenges;