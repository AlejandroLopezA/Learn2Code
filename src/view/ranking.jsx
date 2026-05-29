import { useState, useEffect } from "react";

import { supabase } from "../lib/supabase";

import { useAuth } from "../context/authcontext";

import challenges from "../data/challenges";

import "../styles/ranking.css";

function Ranking() {

  const { user } = useAuth();

  const [ranking, setRanking] =
  useState([]);

  useEffect(() => {

  const loadRanking = async () => {

    const { data, error } =
      await supabase
        .from("profiles")
        .select("*")
        .order("points", {
          ascending: false
        });

    if (!error) {

      const rankingData = data.map(player => {

        const completed =
          player.completed_challenges || [];

        const completedChallengesData =
          challenges.filter(challenge =>
            completed.includes(challenge.id)
          );

        return {

          ...player,

          easy:
            completedChallengesData.filter(
              c => c.difficulty === "easy"
            ).length,

          medium:
            completedChallengesData.filter(
              c => c.difficulty === "medium"
            ).length,

          hard:
            completedChallengesData.filter(
              c => c.difficulty === "hard"
            ).length
        };
      });

      setRanking(rankingData);
    }
  };

  loadRanking();

}, []);

  const completedChallengesData =
    challenges.filter((challenge) =>
      (user?.completedChallenges || [])
        .includes(challenge.id)
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
              player.id === user?.id
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

                {player.id === user?.id && (
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