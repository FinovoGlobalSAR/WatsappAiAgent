import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import AuthPageShell from "../components/AuthPageShell";
import FormInput from "../components/FormInput";
import Toggle from "../components/Toggle";
import SocialAuthRow from "../components/SocialAuthRow";
import { brand, loginContent } from "../data/authContent";
import { authApi } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.login({ email: form.email, password: form.password });
      const { user, tokens } = res.data;

      login(user, tokens);

      // Role-based routing
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (err) {
      // Handle email-not-verified: direct user to verify page
      if (err.code === "EMAIL_NOT_VERIFIED") {
        navigate(`/verify-email?email=${encodeURIComponent(form.email)}`);
        return;
      }
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

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
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-brand-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log In"}
        </button>
      </form>

      <SocialAuthRow onSelect={(id) => console.log("login with", id)} />
    </AuthPageShell>
  );
}
