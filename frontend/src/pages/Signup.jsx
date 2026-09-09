import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import AuthPageShell from "../components/AuthPageShell";
import FormInput from "../components/FormInput";
import SocialAuthRow from "../components/SocialAuthRow";
import { brand, signupContent } from "../data/authContent";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submit", { ...form, agreed });
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
        <FormInput
          label="Full Name"
          icon={User}
          name="fullName"
          placeholder="Robin"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <FormInput
          icon={Mail}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormInput
          icon={Lock}
          isPassword
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <FormInput
          icon={Lock}
          isPassword
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="flex items-start gap-2.5 pt-1 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-200 accent-brand-600"
            required
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

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Create Account
        </button>
      </form>

      <SocialAuthRow onSelect={(id) => console.log("signup with", id)} />
    </AuthPageShell>
  );
}
