"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Search, UserCircle } from "lucide-react";

type DemoUser = {
  name: string;
  email: string;
  role: string;
  bank: string;
};

export function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    /*
      Load the demo user after the page opens in the browser.
      We use localStorage for the MVP stage, so this must run on the client side.
    */
    const savedUser = localStorage.getItem("yousun_amicus_user");

    if (!savedUser) return;

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      /*
        If the saved user data becomes broken, we clear it.
        This keeps the app from crashing and sends the user back to login.
      */
      localStorage.removeItem("yousun_amicus_user");
      router.push("/login");
    }
  }, [router]);

  function handleLogout() {
    /*
      Simple MVP logout.
      Later, this can also call a real backend logout/session endpoint.
    */
    localStorage.removeItem("yousun_amicus_user");
    router.push("/login");
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-5">
      {/* 
        Welcome text.
        The name comes from login/signup data, with "Bappy" as a safe fallback.
      */}
      <div className="min-w-[280px]">
        <h1 className="text-3xl font-bold tracking-tight text-[#0B2341]">
          Welcome back, {user?.name || "Bappy"}
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-[#667085]">
          Here&apos;s what&apos;s happening across your portfolio today.
        </p>
      </div>

      {/* 
        Right side controls.
        flex-wrap helps the topbar stay clean on smaller laptop widths.
      */}
      <div className="flex flex-wrap items-center justify-end gap-4">
        {/* Search bar is hidden on smaller screens to avoid crowding the topbar */}
        <div className="hidden h-12 w-[390px] items-center rounded-xl border border-[#D9E0EA] bg-white px-4 shadow-sm lg:flex">
          <Search className="h-5 w-5 shrink-0 text-[#0B2341]" />

          <input
            type="text"
            className="ml-3 w-full border-none bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
            placeholder="Search applications, customers, reports..."
          />
        </div>

        {/* Notification button with a small gold alert dot */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative rounded-full bg-white p-3 shadow-sm ring-1 ring-[#E5EAF0] transition hover:bg-[#F8FAFC]"
        >
          <Bell className="h-5 w-5 text-[#0B2341]" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#C9961A]" />
        </button>

        {/* User profile chip */}
        <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-[#E5EAF0]">
          <UserCircle className="h-9 w-9 shrink-0 text-[#0B2341]" />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-4 text-[#0B2341]">
              {user?.name || "Bappy"}
            </p>

            <p className="text-xs text-[#667085]">
              {user?.role || "Bank Officer"}
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-[#667085]" />
        </div>

        {/* Logout button shows on extra-wide screens to keep medium screens uncluttered */}
        <button
          type="button"
          onClick={handleLogout}
          className="hidden items-center gap-2 rounded-xl border border-[#E5EAF0] bg-white px-4 py-3 text-sm font-semibold text-[#0B2341] shadow-sm transition hover:bg-[#F8FAFC] 2xl:flex"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}


