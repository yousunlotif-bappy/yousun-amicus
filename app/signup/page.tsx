"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Mail, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  /*
    Pre-filled demo data keeps the signup flow fast for testing and demo.
    Later, this form will connect with a real backend signup API.
  */
  const [name, setName] = useState("Bappy");
  const [email, setEmail] = useState("bappy@amicus.ai");
  const [bank, setBank] = useState("YOUSUN Demo Bank");

  function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
      Simple demo account creation.
      We save the user locally so the dashboard can show the correct profile.
    */
    const demoUser = {
      name: name.trim() || "Bappy",
      email: email.trim() || "bappy@amicus.ai",
      role: "Bank Officer",
      bank: bank.trim() || "YOUSUN Demo Bank",
    };

    localStorage.setItem("yousun_amicus_user", JSON.stringify(demoUser));
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-[#E5EAF0] bg-white p-8 shadow-sm">
        {/* 
          Brand header.
          Logo + project name makes the signup page feel connected to the full product.
        */}
        <div className="text-center">
          <img
            src="/logo.png"
            alt="YOUSUN Amicus Logo"
            className="mx-auto h-24 w-auto"
          />

          <h2 className="mt-4 text-2xl font-bold text-[#0B2341]">
            YOUSUN <span className="text-[#0E9F9A]">Amicus</span>
          </h2>

          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#667085]">
            AI Agent for Fair Banking
          </p>

          <h1 className="mt-6 text-3xl font-bold text-[#0B2341]">
            Create Demo Account
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Create a demo bank officer profile for YOUSUN Amicus.
          </p>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          {/* Full name field */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-[#0B2341]"
            >
              Full name
            </label>

            <div className="mt-2 flex h-12 items-center rounded-xl border border-[#D9E0EA] bg-white px-4">
              <User className="h-5 w-5 text-[#667085]" />

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                className="ml-3 w-full bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                placeholder="Enter full name"
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#0B2341]"
            >
              Email
            </label>

            <div className="mt-2 flex h-12 items-center rounded-xl border border-[#D9E0EA] bg-white px-4">
              <Mail className="h-5 w-5 text-[#667085]" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                className="ml-3 w-full bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                placeholder="bappy@amicus.ai"
              />
            </div>
          </div>

          {/* Bank name field */}
          <div>
            <label
              htmlFor="bank"
              className="text-sm font-semibold text-[#0B2341]"
            >
              Bank name
            </label>

            <div className="mt-2 flex h-12 items-center rounded-xl border border-[#D9E0EA] bg-white px-4">
              <Building2 className="h-5 w-5 text-[#667085]" />

              <input
                id="bank"
                type="text"
                value={bank}
                onChange={(event) => setBank(event.target.value)}
                autoComplete="organization"
                className="ml-3 w-full bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                placeholder="Enter bank name"
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#0B2341] text-sm font-bold text-white transition hover:bg-[#071A2F]"
          >
            Create Account
          </button>
        </form>

        {/* Link back to login */}
        <p className="mt-6 text-center text-sm text-[#667085]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#0E9F9A]">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}


