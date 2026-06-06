"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  /*
    Default values are kept for quick demo login.
    During judging/demo, this saves time and keeps the flow smooth.
  */
  const [email, setEmail] = useState("bappy@amicus.ai");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    /*
      Demo user 1:
      Bank officer can review applications, run agents,
      generate reports, and create rescue plans.
    */
    const bankOfficer = {
      email: "bappy@amicus.ai",
      password: "demo123",
      user: {
        name: "Bappy",
        email: "bappy@amicus.ai",
        role: "Bank Officer",
        bank: "YOUSUN Demo Bank",
        portal: "bank",
      },
    };

    /*
      Demo user 2:
      Customer portal user.
      This user will submit/view their own application from the customer side.
    */
    const customer = {
      email: "rafi@amicus.ai",
      password: "demo123",
      user: {
        name: "Rafi Khan",
        email: "rafi@amicus.ai",
        role: "Customer",
        bank: "YOUSUN Demo Bank",
        portal: "customer",
      },
    };

    if (email === bankOfficer.email && password === bankOfficer.password) {
      localStorage.setItem(
        "yousun_amicus_user",
        JSON.stringify(bankOfficer.user)
      );

      router.push("/dashboard");
      return;
    }

    if (email === customer.email && password === customer.password) {
      localStorage.setItem("yousun_amicus_user", JSON.stringify(customer.user));

      router.push("/customer/dashboard");
      return;
    }

    setError("Invalid email or password. Use demo credentials.");
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E5EAF0] bg-white shadow-sm lg:grid-cols-2">
        {/* Left side: project story and demo credentials */}
        <section className="flex flex-col justify-between bg-white p-10">
          <div>
            <div>
              <img
                src="/logo.png"
                alt="YOUSUN Amicus Logo"
                className="h-28 w-auto"
              />

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#0B2341]">
                YOUSUN <span className="text-[#0E9F9A]">Amicus</span>
              </h1>

              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#667085]">
                AI Agent for Fair Banking
              </p>

              <div className="mt-3 h-[2px] w-16 bg-[#C9961A]" />
            </div>

            <div className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0E9F9A]">
                Secure Bank Agent Platform
              </p>

              <h2 className="mt-5 max-w-md text-4xl font-bold leading-tight text-[#0B2341]">
                Simulate before lending. Rescue before default.
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-[#667085]">
                YOUSUN Amicus helps bank officers review loan applications,
                generate fair lending reports, and detect distress before
                default. Customers can also access a separate portal for their
                own application journey.
              </p>
            </div>
          </div>

          {/* Demo credentials for both portals */}
          <div className="rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-5">
            <p className="text-sm font-bold text-[#0B2341]">Demo accounts</p>

            <div className="mt-2 space-y-3 text-sm text-[#667085]">
              <div>
                <p className="font-bold text-[#0B2341]">Bank Officer</p>
                <p>
                  Email:{" "}
                  <span className="font-semibold">bappy@amicus.ai</span>
                </p>
                <p>
                  Password: <span className="font-semibold">demo123</span>
                </p>
              </div>

              <div className="border-t border-[#F0E3C4] pt-3">
                <p className="font-bold text-[#0B2341]">Customer</p>
                <p>
                  Email: <span className="font-semibold">rafi@amicus.ai</span>
                </p>
                <p>
                  Password: <span className="font-semibold">demo123</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right side: login form */}
        <section className="flex items-center justify-center bg-[#F8FAFC] p-10">
          <div className="w-full max-w-md rounded-3xl border border-[#E5EAF0] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-[#0B2341]">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-[#667085]">
              Login as a bank officer or customer to continue.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-semibold text-[#0B2341]">
                  Email address
                </label>

                <div className="mt-2 flex h-12 items-center rounded-xl border border-[#D9E0EA] bg-white px-4">
                  <Mail className="h-5 w-5 shrink-0 text-[#667085]" />

                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    className="ml-3 w-full bg-transparent text-sm text-[#0B2341] outline-none"
                    placeholder="bappy@amicus.ai"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#0B2341]">
                  Password
                </label>

                <div className="mt-2 flex h-12 items-center rounded-xl border border-[#D9E0EA] bg-white px-4">
                  <Lock className="h-5 w-5 shrink-0 text-[#667085]" />

                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="ml-3 w-full bg-transparent text-sm text-[#0B2341] outline-none"
                    placeholder="Enter password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="text-[#667085] transition hover:text-[#0B2341]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#0B2341] text-sm font-bold text-white transition hover:bg-[#071A2F]"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#667085]">
              New customer?{" "}
              <a href="/signup" className="font-bold text-[#0E9F9A]">
                Create demo account
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

