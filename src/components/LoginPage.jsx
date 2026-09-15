import { useState } from "react";
import { supabase } from "../lib/supabase";

function LoginPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    if (isSignUp) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session && data.user) {
        onLogin(data.user);
        return;
      }

      setMessage(
        "Account created! Check your email to confirm your account, then log in."
      );

      setIsSignUp(false);
      return;
    }

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

        <p className="eyebrow">
          {isSignUp ? "JOIN THE ADVENTURE" : "WELCOME, CAPTAIN"}
        </p>

        <h1>{isSignUp ? "Create your account!" : "Welcome back!"}</h1>

        <p className="login-intro">
          {isSignUp
            ? "Create an account to start your space learning adventure."
            : "Log in to continue your space learning adventure."}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={6}
              required
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          {message && <p className="login-message">{message}</p>}

          <button
            className="primary-button login-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? "Creating..."
                : "Launching..."
              : isSignUp
                ? "Create Account 🚀"
                : "Log In 🚀"}
          </button>
        </form>

        {!isSignUp && (
          <button
            className="text-button"
            type="button"
            onClick={() => {
              setError("");
              setMessage("");
              // Password reset will be added next.
            }}
          >
            Forgot password?
          </button>
        )}

        <p className="login-signup">
          {isSignUp
            ? "Already have an account? "
            : "Don't have an account? "}

          <button
            className="text-button"
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setMessage("");
              setEmail("");
              setPassword("");
            }}
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;