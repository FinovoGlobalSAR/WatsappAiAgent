import { useState, useEffect, useRef } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import AuthPageShell from "../components/AuthPageShell";
import { brand, signupContent } from "../data/authContent";
import { authApi } from "../lib/api";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_S = 60; // client-side cooldown guard

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  // 6 individual digit inputs
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Resend state
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  // If no email in URL, redirect back to signup
  useEffect(() => {
    if (!email) navigate("/signup", { replace: true });
  }, [email, navigate]);

  function handleDigitChange(index, value) {
    // Accept only single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    // Auto-advance
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      await authApi.verifyEmail({ email, otp });
      setSuccess("Email verified! Redirecting to login…");
      setTimeout(() => navigate("/login?verified=1"), 1500);
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resendLoading) return;
    setResendError("");
    setResendSuccess("");
    setResendLoading(true);

    try {
      await authApi.resendOtp({ email });
      setResendSuccess("A new code has been sent to your email.");
      setCooldown(RESEND_COOLDOWN_S);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err) {
      // Backend returns retryAfterSeconds in some cases; extract from message
      setResendError(err.message || "Could not resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthPageShell
      brand={brand}
      sideContent={signupContent}
      switchPrompt="Already verified?"
      switchLabel="Log in"
      switchTo="/login"
      title="Verify Your Email"
      subtitle={`Enter the 6-digit code sent to ${email}`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* 6-digit OTP input */}
        <div>
          <span className="mb-3 block text-[11px] font-medium text-ink-400">
            Verification Code
          </span>
          <div className="flex gap-2.5 justify-center" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-13 w-13 rounded-xl border border-ink-200 bg-white text-center text-xl font-bold text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                style={{ width: "3rem", height: "3.25rem" }}
                aria-label={`Digit ${i + 1}`}
                autoFocus={i === 0}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !!success}
          className="w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
        >
          {loading ? "Verifying…" : "Verify Email"}
        </button>

        {/* Resend section */}
        <div className="text-center">
          {resendError && (
            <p className="mb-2 text-xs text-red-500">{resendError}</p>
          )}
          {resendSuccess && (
            <p className="mb-2 text-xs text-green-600">{resendSuccess}</p>
          )}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || resendLoading}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 disabled:text-ink-400 disabled:cursor-not-allowed"
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : resendLoading
              ? "Sending…"
              : "Resend code"}
          </button>
        </div>

        <p className="text-center text-xs text-ink-400">
          Wrong email?{" "}
          <Link to="/signup" className="font-medium text-brand-600 hover:text-brand-700">
            Go back
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}
