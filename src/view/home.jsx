import { Link } from "react-router-dom";

import "../styles/home.css";

function Home() {

  return (
    <div className="home-page">

      <section className="hero">

        <div className="hero-content">

          <h1>
            Become a better programmer solving real challenges
          </h1>

          <p>
            Practice coding with interactive programming challenges
            and improve your skills every day.
          </p>

          <Link to="/challenges">
            <button>
                Start Coding
            </button>
          </Link>

        </div>

      </section>

      <section className="stats-section">

        <div className="stat-card">
          <h2>120+</h2>
          <p>Challenges</p>
        </div>

        <div className="stat-card">
          <h2>5K+</h2>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <h2>25K+</h2>
          <p>Submissions</p>
        </div>

      </section>

      <section className="featured-section">

        <div className="section-header">
          <h2>Featured Challenges</h2>
        </div>

        <div className="featured-grid">

            <Link
                to="/challenges/1"
                className="featured-card"
            >

                <h3>Two Sum</h3>

                <span className="difficulty easy">
                Easy
                </span>

                <p>
                Solve the classic array problem using hash maps.
                </p>

            </Link>

            <Link
                to="/challenges/2"
                className="featured-card"
            >

                <h3>Longest Substring</h3>

                <span className="difficulty medium">
                Medium
                </span>

                <p>
                Sliding window challenge focused on strings.
                </p>

            </Link>

            <Link
                to="/challenges/3"
                className="featured-card"
            >

                <h3>Median of Arrays</h3>

                <span className="difficulty hard">
                Hard
                </span>

                <p>
                Advanced divide and conquer challenge.
                </p>

            </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;