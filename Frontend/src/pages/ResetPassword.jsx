import { useState, useRef, useEffect } from "react";
import { Lock } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthPageShell from "../components/AuthPageShell";
import FormInput from "../components/FormInput";
import { brand, loginContent } from "../data/authContent";
import { authApi } from "../lib/api";

const OTP_LENGTH = 6;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  // Stage 1: verify OTP → get resetToken
  // Stage 2: set new password
  const [stage, setStage] = useState(1);
  const [resetToken, setResetToken] = useState("");
  const [email, setEmail] = useState(emailParam);

  // Stage-1 state
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // Stage-2 state
  const [passwords, setPasswords] = useState({ newPassword: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!emailParam) navigate("/forgot-password", { replace: true });
  }, [emailParam, navigate]);

  // ── Stage 1 helpers ───────────────────────────────────────────────────────
  function handleDigitChange(index, value) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError("");
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setOtpError("Please enter the complete 6-digit code.");
      return;
    }

    setOtpLoading(true);
    try {
      const res = await authApi.verifyResetOtp({ email, otp });
      setResetToken(res.data.resetToken);
      setStage(2);
    } catch (err) {
      setOtpError(err.message || "Invalid or expired code. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Stage 2 helpers ───────────────────────────────────────────────────────
  const handlePwChange = (e) =>
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPwError("");

    if (passwords.newPassword !== passwords.confirm) {
      setPwError("Passwords do not match.");
      return;
    }

    setPwLoading(true);
    try {
      await authApi.resetPassword({
        email,
        resetToken,
        newPassword: passwords.newPassword,
      });
      setDone(true);
    } catch (err) {
      if (err.details && Array.isArray(err.details)) {
        setPwError(err.details.map((d) => d.message).join(" "));
      } else {
        setPwError(err.message || "Password reset failed. Please try again.");
      }
    } finally {
      setPwLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (done) {
    return (
      <AuthPageShell
        brand={brand}
        sideContent={loginContent}
        switchPrompt=""
        switchLabel=""
        switchTo="/login"
        title="Password Reset!"
        subtitle="Your password has been updated successfully"
      >
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            You can now log in with your new password.
          </div>
          <Link
            to="/login"
            className="block w-full rounded-xl bg-brand-900 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Go to Login
          </Link>
        </div>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell
      brand={brand}
      sideContent={loginContent}
      switchPrompt="Remembered your password?"
      switchLabel="Log in"
      switchTo="/login"
      title={stage === 1 ? "Enter Reset Code" : "Set New Password"}
      subtitle={
        stage === 1
          ? `Enter the 6-digit code sent to ${email}`
          : "Choose a strong new password"
      }
    >
      {/* Stage 1 — OTP entry */}
      {stage === 1 && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
          {otpError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {otpError}
            </div>
          )}

          <div>
            <span className="mb-3 block text-[11px] font-medium text-ink-400">
              Reset Code
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
                  className="rounded-xl border border-ink-200 bg-white text-center text-xl font-bold text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  style={{ width: "3rem", height: "3.25rem" }}
                  aria-label={`Digit ${i + 1}`}
                  autoFocus={i === 0}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={otpLoading}
            className="w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
          >
            {otpLoading ? "Verifying…" : "Verify Code"}
          </button>

          <p className="text-center text-xs text-ink-400">
            Didn't get the code?{" "}
            <Link
              to={`/forgot-password`}
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              Resend
            </Link>
          </p>
        </form>
      )}

      {/* Stage 2 — New password */}
      {stage === 2 && (
        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          {pwError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {pwError}
            </div>
          )}

          <div>
            <FormInput
              label="New Password"
              icon={Lock}
              isPassword
              name="newPassword"
              placeholder="Min 12 chars, uppercase, number, symbol"
              value={passwords.newPassword}
              onChange={handlePwChange}
              required
            />
          </div>

          <div>
            <FormInput
              label="Confirm New Password"
              icon={Lock}
              isPassword
              name="confirm"
              placeholder="Repeat your new password"
              value={passwords.confirm}
              onChange={handlePwChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={pwLoading}
            className="mt-2 w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
          >
            {pwLoading ? "Resetting…" : "Reset Password"}
          </button>
        </form>
      )}
    </AuthPageShell>
  );
}
