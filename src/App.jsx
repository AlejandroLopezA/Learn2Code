import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import ProtectedRoute from "./components/protectedroute";

import Home from "./view/home";
import Challenges from "./view/challenges";
import ChallengeDetail from "./view/challengeDetail";
import Ranking from "./view/ranking";
import Profile from "./view/profile";

import Login from "./view/login";
import Register from "./view/register";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* APP */}

        <Route
          path="/"
          element={
            <ProtectedRoute>

              <Layout>
                <Home />
              </Layout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/challenges"
          element={
            <ProtectedRoute>

              <Layout>
                <Challenges />
              </Layout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/challenges/:id"
          element={
            <ProtectedRoute>

              <Layout>
                <ChallengeDetail />
              </Layout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/ranking"
          element={
            <ProtectedRoute>

              <Layout>
                <Ranking />
              </Layout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Layout>
                <Profile />
              </Layout>

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;