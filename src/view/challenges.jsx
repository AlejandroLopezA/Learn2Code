import { Link } from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../context/authcontext";

import challenges from "../data/challenges";

import "../styles/challenges.css";

function Challenges() {

  const [search, setSearch] =
  useState("");

  const [filters, setFilters] =
  useState([]);

const filteredChallenges =
  challenges.filter((challenge) => {

    const matchesSearch =
      challenge.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesDifficulty =

      filters.length === 0 ||

      filters.includes(
        challenge.difficulty
      );

    return (
      matchesSearch &&
      matchesDifficulty
    );
  });

  const { user } = useAuth();

  const toggleFilter = (difficulty) => {

  if (
    filters.includes(difficulty)
  ) {

    setFilters(
      filters.filter(
        (f) => f !== difficulty
      )
    );

  } else {

    setFilters([
      ...filters,
      difficulty
    ]);
  }
};

  return (

    <div>

      <div className="page-header">

        <h1>
          Coding Challenges
        </h1>

        <p>
          Improve your programming skills solving challenges
        </p>

        <div className="filters-row">

          <input
            type="text"
            placeholder="Search challenge..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="search-input"
          />

          <div className="difficulty-filters">

            <button
              className={`filter easy-filter ${
                filters.includes("easy")
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                toggleFilter("easy")
              }
            />

            <button
              className={`filter medium-filter ${
                filters.includes("medium")
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                toggleFilter("medium")
              }
            />

            <button
              className={`filter hard-filter ${
                filters.includes("hard")
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                toggleFilter("hard")
              }
            />

          </div>

        </div>

      </div>

      <div className="challenges-grid">

        {filteredChallenges.map((challenge) => (

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