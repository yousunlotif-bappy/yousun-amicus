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
      Read the demo user from localStorage.
      This keeps the topbar personal after login or signup.
    */
    const savedUser = localStorage.getItem("yousun_amicus_user");

    if (!savedUser) return;

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      /*
        If the saved data is broken for any reason,
        clear it and send the user back to login.
      */
      localStorage.removeItem("yousun_amicus_user");
      router.push("/login");
    }
  }, [router]);

  function handleLogout() {
    /*
      For the MVP, logout simply removes the demo user.
      Later, this will also call the backend logout/session API.
    */
    localStorage.removeItem("yousun_amicus_user");
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between gap-6">
      {/* 
        Welcome section.
        The name comes from localStorage after login/signup.
        If nothing is loaded yet, we keep "Bappy" as a friendly fallback.
      */}
      <div className="min-w-[320px]">
        <h1 className="whitespace-nowrap text-3xl font-bold tracking-tight text-[#0B2341]">
          Welcome back, {user?.name || "Bappy"}
        </h1>

        <p className="mt-2 text-sm text-[#667085]">
          Here&apos;s what&apos;s happening across your portfolio today.
        </p>
      </div>

      {/* Search, notification, profile, and logout actions */}
      <div className="flex items-center gap-5">
        {/* 
          Dashboard search.
          Hidden on smaller screens so the topbar does not feel crowded.
        */}
        <div className="hidden h-12 w-[430px] items-center rounded-xl border border-[#D9E0EA] bg-white px-4 shadow-sm lg:flex">
          <Search className="h-5 w-5 shrink-0 text-[#0B2341]" />

          <input
            type="text"
            className="ml-3 w-full border-none bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
            placeholder="Search applications, customers, reports..."
          />
        </div>

        {/* Notification button with a small alert dot */}
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
          <UserCircle className="h-9 w-9 text-[#0B2341]" />

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

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="hidden items-center gap-2 rounded-xl border border-[#E5EAF0] bg-white px-4 py-3 text-sm font-semibold text-[#0B2341] shadow-sm transition hover:bg-[#F8FAFC] xl:flex"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}


