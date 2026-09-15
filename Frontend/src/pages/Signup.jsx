import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthPageShell from "../components/AuthPageShell";
import FormInput from "../components/FormInput";
import SocialAuthRow from "../components/SocialAuthRow";
import { brand, signupContent } from "../data/authContent";
import { authApi } from "../lib/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // Clear per-field error on change
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    if (!form.password) errs.password = "Password is required.";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    if (!agreed) errs.agreed = "You must agree to the Terms & Conditions.";
    return errs;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      // Success — send to email verification
      navigate(`/verify-email?email=${encodeURIComponent(form.email.trim())}`);
    } catch (err) {
      // Map backend field-level validation errors if present
      if (err.details && Array.isArray(err.details)) {
        const fieldErrors = {};
        err.details.forEach(({ field, message }) => {
          fieldErrors[field] = message;
        });
        setErrors(fieldErrors);
      } else {
        setApiError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      brand={brand}
      sideContent={signupContent}
      switchPrompt="Already have an account?"
      switchLabel="Sign in!"
      switchTo="/login"
      title="Create Your Account"
      subtitle="Getting started is easy"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {apiError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {apiError}
          </div>
        )}

        {/* First name */}
        <div>
          <FormInput
            label="First Name"
            icon={User}
            name="firstName"
            placeholder="Robin"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last name */}
        <div>
          <FormInput
            label="Last Name"
            icon={User}
            name="lastName"
            placeholder="Smith"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <FormInput
            icon={Mail}
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <FormInput
            icon={Lock}
            isPassword
            name="password"
            placeholder="Password (min 12 chars)"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <FormInput
            icon={Lock}
            isPassword
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2.5 pt-1 text-sm text-ink-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-200 accent-brand-600"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreed && (
            <p className="mt-1 text-xs text-red-500">{errors.agreed}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <SocialAuthRow onSelect={(id) => console.log("signup with", id)} />
    </AuthPageShell>
  );
}
