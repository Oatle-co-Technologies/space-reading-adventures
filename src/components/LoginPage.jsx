import { useState } from "react";
import { supabase } from "../lib/supabase";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    onLogin(data.user);
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-mark">O</div>
        </div>

        <p className="eyebrow">WELCOME, CAPTAIN</p>

        <h1>Welcome back!</h1>

        <p className="login-intro">
          Log in to continue your space learning adventure.
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Your email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            className="primary-button login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Launching..." : "Log In 🚀"}
          </button>
        </form>

        <button
          className="text-button"
          type="button"
          onClick={() => {
            // We'll add password reset next.
          }}
        >
          Forgot password?
        </button>

        <p className="login-signup">
          Don't have an account?{" "}
          <button
            className="text-button"
            type="button"
            onClick={() => {
              // We'll add sign-up next.
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
