import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

/*
  Main sidebar navigation for YOUSUN Amicus.
  These items are static for now. Later, we can connect each item with real routes.
*/
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Applications", icon: FileText },
  { name: "Customers", icon: Users },
  { name: "Risk Monitor", icon: ShieldAlert },
  { name: "Reports", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[250px] flex-col border-r border-[#E5EAF0] bg-white px-5 py-6">
      {/* 
        Logo section.
        Keeping it centered gives the sidebar a clean banking SaaS look.
      */}
      <div className="flex justify-center">
        <img
          src="/logo.png"
          alt="YOUSUN Amicus Logo"
          className="h-28 w-auto object-contain"
        />
      </div>

      {/* 
        Sidebar menu.
        The active item uses a soft teal background so users can quickly see where they are.
      */}
      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                item.active
                  ? "bg-[#E8F7F5] text-[#0B2341]"
                  : "text-[#0B2341] hover:bg-[#F3F7F8]"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  item.active ? "text-[#0E9F9A]" : "text-[#0B2341]"
                }`}
              />

              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* 
        Bottom area.
        This gives the product a stronger AI-agent identity without making the UI too busy.
      */}
      <div className="mt-auto">
        <div className="border-t border-[#E5EAF0] pt-6">
          <div className="flex gap-3">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#C9961A]" />

            <div>
              <p className="text-sm font-bold text-[#0B2341]">AI Agent</p>

              <p className="mt-1 text-xs leading-5 text-[#667085]">
                Always analyzing, always protecting.
              </p>
            </div>
          </div>
        </div>

        {/* Small product footer */}
        <p className="mt-8 text-xs leading-5 text-[#667085]">
          © 2026 YOUSUN Amicus
          <br />
          All rights reserved.
        </p>

        {/* Gold accent line for a premium banking feel */}
        <div className="mt-4 h-[2px] w-16 bg-[#C9961A]" />
      </div>
    </aside>
  );
}

