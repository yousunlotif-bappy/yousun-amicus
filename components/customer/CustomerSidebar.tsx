"use client";

import { FilePlus2, Home, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/*
  CustomerSidebar

  This sidebar is only for the customer portal.
  Bank officers use the main Sidebar, while customers get a simpler portal:
  - Dashboard
  - New Application
  - Logout
*/

export function CustomerSidebar() {
  const router = useRouter();

  function handleLogout() {
    /*
      Remove the demo session and send the user back to login.
      This keeps bank and customer portal access cleanly separated.
    */
    localStorage.removeItem("yousun_amicus_user");
    router.push("/login");
  }

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[230px] flex-col border-r border-[#E5EAF0] bg-white px-4 py-6">
      {/* Brand area */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/logo.png"
          alt="YOUSUN Amicus Logo"
          className="h-24 w-auto object-contain"
        />

        <h1 className="mt-4 text-xl font-bold tracking-tight text-[#0B2341]">
          YOUSUN <span className="text-[#0E9F9A]">Amicus</span>
        </h1>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
          Customer Portal
        </p>

        <div className="mt-3 h-[2px] w-14 bg-[#C9961A]" />
      </div>

      {/* Customer navigation */}
      <nav className="mt-8 space-y-2">
        <Link
          href="/customer/dashboard"
          className="flex items-center gap-3 rounded-xl bg-[#E8F7F5] px-4 py-3 text-sm font-semibold text-[#0B2341] transition hover:bg-[#DDF3F0]"
        >
          <Home className="h-5 w-5 shrink-0 text-[#0E9F9A]" />
          Dashboard
        </Link>

        <Link
          href="/customer/applications/new"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#0B2341] transition hover:bg-[#F3F7F8]"
        >
          <FilePlus2 className="h-5 w-5 shrink-0 text-[#0B2341]" />
          New Application
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#0B2341] transition hover:bg-[#F3F7F8]"
        >
          <LogOut className="h-5 w-5 shrink-0 text-[#0B2341]" />
          Logout
        </button>
      </nav>

      {/* Small helper card for customer guidance */}
      <div className="mt-auto rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-4">
        <div className="flex gap-3">
          <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#C9961A]" />

          <div>
            <p className="text-sm font-bold text-[#0B2341]">Amicus Guide</p>

            <p className="mt-1 text-xs leading-5 text-[#667085]">
              I will help you understand what documents are needed and why.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

