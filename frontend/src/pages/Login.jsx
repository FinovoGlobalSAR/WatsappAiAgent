import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Check } from "lucide-react";

import AuthBrand from "../components/auth/AuthBrand";
import AuthInput from "../components/auth/AuthInput";
import AuthTabs from "../components/auth/AuthTabs";
import SocialLogin from "../components/auth/SocialLogin";
import AIAgentShowcase from "../components/auth/AIAgentShowcase";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      console.log("Login:", {
        ...form,
        remember,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
<main className="min-h-screen bg-[#f3f8f8] p-4 sm:p-6 lg:p-8">
  <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

    <section className="w-full min-w-0 min-h-[calc(100vh-32px)] bg-white rounded-[24px] lg:rounded-[28px] shadow-[0_10px_60px_rgba(5,48,50,0.08)] overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto auth-scroll">
          <div className="w-full max-w-[620px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 lg:py-10">

            <AuthBrand />

            <div className="mt-12 lg:mt-16">
              <h2 className="text-[30px] sm:text-[34px] lg:text-[37px] font-bold tracking-[-0.035em] leading-tight text-[#07363a]">
                Your WhatsApp,
                <br />
                <span className="text-[#118d91]">powered by AI.</span>
              </h2>

              <p className="mt-4 text-[13px] sm:text-[14px] leading-6 text-[#6f8588] max-w-[500px]">
                Sign in to connect your WhatsApp, automate conversations,
                capture leads, and deliver exceptional customer support 24/7.
              </p>
            </div>

            <div className="w-full max-w-[460px]">

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">

                <AuthInput
                  label="Email address"
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
                  placeholder="Enter your password"
                  icon={Lock}
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setRemember(!remember)}
                    className="flex items-center gap-2 text-[12px] text-[#60777a]"
                  >
                    <span
                      className={`cursor-pointer w-[19px] h-[19px] rounded-md border flex items-center justify-center transition ${
                        remember
                          ? "bg-[#0d9296] border-[#0d9296]"
                          : "border-[#cbdadb]"
                      }`}
                    >
                      {remember && (
                        <Check size={13} className="cursor-pointer text-white" />
                      )}
                    </span>
                    Remember me
                  </button>

                  <Link
                    to="/forgot-password"
                    className="text-[12px] font-semibold text-[#07858a] hover:text-[#05696d]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer primary-button w-full h-[52px] rounded-xl bg-[#0c9297] hover:bg-[#087e83] text-white text-[13px] font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to FinovoChat AI
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

              </form>

              <div className="mt-7">
                <SocialLogin />
              </div>

              <p className="text-center text-[12px] text-[#73888a] mt-7">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#07888c] hover:underline"
                >
                  Create one
                </Link>
              </p>

              <p className="text-center text-[10px] leading-5 text-[#91a2a4] mt-10">
                By continuing, you agree to our{" "}
                <a href="#terms" className="text-[#07888c]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="text-[#07888c]">
                  Privacy Policy
                </a>
                .
              </p>

              <div className="text-center text-[9px] text-[#a1afb0] mt-6">
                © {new Date().getFullYear()} FinovoChat AI. All rights reserved.
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="w-full min-w-0 min-h-[calc(100vh-32px)]">
      <AIAgentShowcase />
    </div>

  </div>
</main>
  );
}