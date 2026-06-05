import { Bell, ChevronDown, Search, UserCircle } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center justify-between gap-6">
      {/* 
        Welcome section.
        For now, "Bappy" is our demo bank officer.
        Later, this name will come from the authenticated user profile.
      */}
      <div className="min-w-[320px]">
        <h1 className="whitespace-nowrap text-3xl font-bold tracking-tight text-[#0B2341]">
          Welcome back, Bappy
        </h1>

        <p className="mt-2 text-sm text-[#667085]">
          Here&apos;s what&apos;s happening across your portfolio today.
        </p>
      </div>

      {/* 
        Right side actions.
        This area keeps search, notifications, and user account controls together.
      */}
      <div className="flex items-center gap-5">
        {/* 
          Dashboard search bar.
          Hidden on smaller screens so the layout does not feel crowded.
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

        {/* User profile menu button */}
        <button
          type="button"
          aria-label="Open user menu"
          className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-[#E5EAF0] transition hover:bg-[#F8FAFC]"
        >
          <UserCircle className="h-9 w-9 text-[#0B2341]" />

          <span className="text-sm font-semibold text-[#0B2341]">Bappy</span>

          <ChevronDown className="h-4 w-4 text-[#667085]" />
        </button>
      </div>
    </header>
  );
}


