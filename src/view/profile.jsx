import { useAuth } from "../context/authcontext";

import challenges from "../data/challenges";

import "../styles/profile.css";

function Profile() {

  const { user } = useAuth();

  const totalChallenges = challenges.length;

  const completed =
    user.completedChallenges.length;

  const progress =
    Math.round(
      (completed / totalChallenges) * 100
    );

  return (

    <div className="profile-page">

      <div className="profile-header">

        <div className="profile-avatar">

          {user.username.charAt(0).toUpperCase()}

        </div>

        <div>

          <h1>
            {user.username}
          </h1>

          <p>
            {user.email}
          </p>

        </div>

      </div>

      <div className="profile-stats">

        <div className="profile-card">

          <h2>
            {user.points}
          </h2>

          <p>Total Points</p>

        </div>

        <div className="profile-card">

          <h2>
            {completed}
          </h2>

          <p>Completed Challenges</p>

        </div>

        <div className="profile-card">

          <h2>
            {progress}%
          </h2>

          <p>Progress</p>

        </div>

      </div>

      <div className="completed-section">

        <h2>
          Completed Challenges
        </h2>

        <div className="completed-grid">

          {challenges
            .filter((challenge) =>
              user.completedChallenges.includes(
                challenge.id
              )
            )
            .map((challenge) => (

              <div
                key={challenge.id}
                className="completed-card"
              >

                <h3>
                  {challenge.title}
                </h3>

                <span
                  className={`difficulty ${challenge.difficulty}`}
                >
                  {challenge.difficulty}
                </span>

              </div>

            ))}

        </div>

      </div>

    </div>

  );
}

export default Profile;