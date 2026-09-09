import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import AuthPageShell from "../components/AuthPageShell";
import FormInput from "../components/FormInput";
import Toggle from "../components/Toggle";
import SocialAuthRow from "../components/SocialAuthRow";
import { brand, loginContent } from "../data/authContent";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submit", { ...form, rememberMe });
  };

  return (
    <AuthPageShell
      brand={brand}
      sideContent={loginContent}
      switchPrompt="Don't have an account?"
      switchLabel="Sign up"
      switchTo="/signup"
      title="Welcome Back"
      subtitle="Login into your account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Email"
          icon={Mail}
          type="email"
          name="email"
          placeholder="Robin@gmail.com"
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

        <div className="flex items-center justify-between pt-1">
          <Toggle checked={rememberMe} onChange={setRememberMe} label="Remember me" />
          <a href="#" className="text-sm font-medium text-orange-500 hover:text-orange-600">
            Forgot Password
          </a>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Log In
        </button>
      </form>

      <SocialAuthRow onSelect={(id) => console.log("login with", id)} />
    </AuthPageShell>
  );
}
