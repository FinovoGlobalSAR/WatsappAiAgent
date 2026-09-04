import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  UserRound,
  Building2,
  ArrowRight,
  Check,
} from "lucide-react";

import AuthBrand from "../components/auth/AuthBrand";
import AuthInput from "../components/auth/AuthInput";
import AuthTabs from "../components/auth/AuthTabs";
import AIAgentShowcase from "../components/auth/AIAgentShowcase";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError(
        "Please accept the Terms of Service and Privacy Policy."
      );
      return;
    }

    setLoading(true);

    try {
      console.log("Register:", form);

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f8f8] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1500px] mx-auto min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch">

        <section className="w-full min-w-0 min-h-[calc(100vh-64px)] bg-white rounded-[24px] lg:rounded-[28px] shadow-[0_10px_60px_rgba(5,48,50,0.08)] overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto auth-scroll">
              <div className="w-full max-w-[620px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 lg:py-10">

                <AuthBrand />

                <div className="mt-10">
                  <h2 className="text-[30px] sm:text-[34px] lg:text-[37px] font-bold tracking-[-0.035em] leading-tight text-[#07363a]">
                    Build your
                    <br />
                    <span className="text-[#118d91]">
                      AI-powered WhatsApp.
                    </span>
                  </h2>

                  <p className="mt-4 text-[13px] sm:text-[14px] leading-6 text-[#6f8588] max-w-[450px]">
                    Create your workspace and start automating
                    customer conversations, capturing leads, and
                    answering questions with AI.
                  </p>
                </div>

                <div className="mt-7 w-full max-w-[460px]">
                  <AuthTabs />

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <AuthInput
                        label="Full name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        icon={UserRound}
                        value={form.name}
                        onChange={handleChange}
                        required
                      />

                      <AuthInput
                        label="Company"
                        type="text"
                        name="company"
                        placeholder="Company name"
                        icon={Building2}
                        value={form.company}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <AuthInput
                      label="Work email"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      icon={Mail}
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                    <AuthInput
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      icon={Lock}
                      value={form.password}
                      onChange={handleChange}
                      required
                    />

                    <AuthInput
                      label="Confirm password"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      icon={Lock}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />

                    {error && (
                      <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-[11px] text-red-600">
                        {error}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setAgree(!agree)}
                      className="flex items-start gap-2.5 text-left"
                    >
                      <span
                        className={`mt-0.5 shrink-0 w-[19px] h-[19px] rounded-md border flex items-center justify-center transition ${
                          agree
                            ? "bg-[#0d9296] border-[#0d9296]"
                            : "border-[#cbdadb]"
                        }`}
                      >
                        {agree && (
                          <Check
                            size={13}
                            className="text-white"
                          />
                        )}
                      </span>

                      <span className="text-[11px] leading-5 text-[#708689]">
                        I agree to the{" "}
                        <span className="text-[#07888c] font-medium">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-[#07888c] font-medium">
                          Privacy Policy
                        </span>
                        .
                      </span>
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="primary-button w-full h-[52px] rounded-xl bg-[#0c9297] hover:bg-[#087e83] text-white text-[13px] font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create my AI workspace
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-[12px] text-[#73888a] mt-6">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-[#07888c] hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>

                  <div className="text-center text-[9px] text-[#a1afb0] mt-7 pb-4">
                    © {new Date().getFullYear()} FinovoChat AI. All rights reserved.
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div className="hidden md:block w-full min-w-0 min-h-[calc(100vh-64px)]">
          <AIAgentShowcase />
        </div>

      </div>
    </main>
  );
}