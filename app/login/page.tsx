"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  /*
    Demo credentials are pre-filled so judges can quickly enter the dashboard.
    Later, this will be replaced with a real backend login system.
  */
  const [email, setEmail] = useState("bappy@amicus.ai");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    /*
      Simple MVP authentication.
      This is enough for the demo stage, but not for production.
    */
    const validEmail = "bappy@amicus.ai";
    const validPassword = "demo123";

    if (email.trim() !== validEmail || password !== validPassword) {
      setErrorMessage("Invalid email or password. Please use the demo credentials.");
      return;
    }

    /*
      Save a demo user in localStorage.
      AuthGuard will use this data to allow dashboard access.
    */
    const demoUser = {
      name: "Bappy",
      email: "bappy@amicus.ai",
      role: "Bank Officer",
      bank: "YOUSUN Demo Bank",
    };

    localStorage.setItem("yousun_amicus_user", JSON.stringify(demoUser));

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E5EAF0] bg-white shadow-sm lg:grid-cols-2">
        {/* 
          Left brand panel.
          This side explains the product story before the user logs in.
        */}
        <section className="flex flex-col justify-between bg-white p-10">
          <div>
            <img
              src="/logo.png"
              alt="YOUSUN Amicus Logo"
              className="h-32 w-auto"
            />

            <div className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0E9F9A]">
                Secure Bank Agent Platform
              </p>

              <h1 className="mt-5 max-w-md text-4xl font-bold leading-tight text-[#0B2341]">
                Simulate before lending. Rescue before default.
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-[#667085]">
                YOUSUN Amicus helps bank officers review loan applications,
                generate fair lending reports, and detect borrower distress
                before default.
              </p>
            </div>
          </div>

          {/* Demo login helper for quick testing */}
          <div className="rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-5">
            <p className="text-sm font-bold text-[#0B2341]">Demo account</p>

            <p className="mt-2 text-sm text-[#667085]">
              Email: <span className="font-semibold">bappy@amicus.ai</span>
            </p>

            <p className="text-sm text-[#667085]">
              Password: <span className="font-semibold">demo123</span>
            </p>
          </div>
        </section>

        {/* 
          Right login panel.
          This keeps the actual login form focused and easy to use.
        */}
        <section className="flex items-center justify-center bg-[#F8FAFC] p-10">
          <div className="w-full max-w-md rounded-3xl border border-[#E5EAF0] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-[#0B2341]">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-[#667085]">
              Login to continue to your lending intelligence dashboard.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#0B2341]"
                >
                  Email address
                </label>

                <div className="mt-2 flex h-12 items-center rounded-xl border border-[#D9E0EA] bg-white px-4">
                  <Mail className="h-5 w-5 text-[#667085]" />

                  <input
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    autoComplete="email"
                    className="ml-3 w-full bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                    placeholder="bappy@amicus.ai"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#0B2341]"
                >
                  Password
                </label>

                <div className="mt-2 flex h-12 items-center rounded-xl border border-[#D9E0EA] bg-white px-4">
                  <Lock className="h-5 w-5 text-[#667085]" />

                  <input
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="ml-3 w-full bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                    placeholder="Enter password"
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
                    className="text-[#667085] transition hover:text-[#0B2341]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login error message */}
              {errorMessage ? (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#0B2341] text-sm font-bold text-white transition hover:bg-[#071A2F]"
              >
                Login to Dashboard
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#667085]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-[#0E9F9A]">
                Create demo account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}


