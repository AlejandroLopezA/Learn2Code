import { useAuth } from "../context/authcontext";

import challenges from "../data/challenges";

import "../styles/ranking.css";

function Ranking() {

  const { user } = useAuth();

  const completedChallengesData =
    challenges.filter((challenge) =>
      user.completedChallenges.includes(
        challenge.id
      )
    );

  const easyCount =
    completedChallengesData.filter(
      (challenge) =>
        challenge.difficulty === "easy"
    ).length;

  const mediumCount =
    completedChallengesData.filter(
      (challenge) =>
        challenge.difficulty === "medium"
    ).length;

  const hardCount =
    completedChallengesData.filter(
      (challenge) =>
        challenge.difficulty === "hard"
    ).length;

  const fakeUsers = [

    {
      username: "Maria",
      points: 2400,

      easy: 12,
      medium: 5,
      hard: 2
    },

    {
      username: "David",
      points: 2100,

      easy: 10,
      medium: 4,
      hard: 1
    },

    {
      username: "Lucas",
      points: 1800,

      easy: 8,
      medium: 3,
      hard: 1
    },

    {
      username: "Sofia",
      points: 1500,

      easy: 7,
      medium: 2,
      hard: 0
    },

    {
      username: "Emma",
      points: 1200,

      easy: 5,
      medium: 1,
      hard: 0
    }

  ];

  const ranking = [
    ...fakeUsers,

    {
      username: user.username,

      points: user.points,

      easy: easyCount,
      medium: mediumCount,
      hard: hardCount,

      currentUser: true
    }

  ]
    .sort((a, b) => b.points - a.points);

  return (

    <div className="ranking-page">

      <div className="ranking-header">

        <h1>
          Global Ranking
        </h1>

        <p>
          Compete with other programmers and climb the leaderboard.
        </p>

      </div>

      <div className="ranking-table">

        {ranking.map((player, index) => (

          <div
            key={index}
            className={`ranking-row ${
              player.currentUser
                ? "current-user"
                : ""
            }`}
          >

            <div className="ranking-left">

              <div className="ranking-position">

                #{index + 1}

              </div>

              <div className="ranking-avatar">

                {player.username.charAt(0)}

              </div>

              <div>

                <h3>
                  {player.username}
                </h3>

                {player.currentUser && (
                  <span className="you-badge">
                    You
                  </span>
                )}

              </div>

            </div>

            <div className="ranking-right">

              <div className="difficulty-stats">

                <span className="difficulty easy">

                  {player.easy}

                </span>

                <span className="difficulty medium">

                  {player.medium}

                </span>

                <span className="difficulty hard">

                  {player.hard}

                </span>

              </div>

              <div className="ranking-points">

                {player.points} pts

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Ranking;