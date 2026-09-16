import { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthPageShell from "../components/AuthPageShell";
import FormInput from "../components/FormInput";
import { brand, loginContent } from "../data/authContent";
import { authApi } from "../lib/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.forgotPassword({ email: email.trim() });
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      brand={brand}
      sideContent={loginContent}
      switchPrompt="Remembered your password?"
      switchLabel="Log in"
      switchTo="/login"
      title="Forgot Password"
      subtitle="Enter your email and we'll send you a reset code"
    >
      {sent ? (
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            <p className="font-semibold">Check your inbox!</p>
            <p className="mt-1 text-green-600">
              We sent a password reset code to{" "}
              <span className="font-medium">{email}</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/reset-password?email=${encodeURIComponent(email.trim())}`,
              )
            }
            className="w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Enter Reset Code
          </button>

          <p className="text-center text-xs text-ink-400">
            Didn't receive it?{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              Send again
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <FormInput
            label="Email address"
            icon={Mail}
            type="email"
            name="email"
            placeholder="Robin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send Reset Code"}
          </button>

          <p className="text-center text-sm text-ink-400">
            <Link
              to="/login"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              ← Back to Login
            </Link>
          </p>
        </form>
      )}
    </AuthPageShell>
  );
}
