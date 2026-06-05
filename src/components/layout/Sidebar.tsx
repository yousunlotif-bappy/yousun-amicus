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
  Sidebar menu items for the main dashboard.
  For now, these are static items. Later, we can connect them with real routes.
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
    <aside className="fixed left-0 top-0 z-20 h-screen w-[250px] border-r border-[#E5EAF0] bg-white px-5 py-6">
      {/* Logo area */}
      <div className="flex flex-col items-center">
        <img
          src="/logo.png"
          alt="YOUSUN Amicus Logo"
          className="h-36 w-auto object-contain"
        />
      </div>

      {/* Main navigation */}
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

      {/* Bottom agent status and footer */}
      <div className="absolute bottom-8 left-5 right-5">
        <div className="border-t border-[#E5EAF0] pt-6">
          <div className="flex gap-3">
            <Sparkles className="mt-1 h-5 w-5 text-[#C9961A]" />

            <div>
              <p className="text-sm font-bold text-[#0B2341]">AI Agent</p>

              <p className="mt-1 text-xs leading-5 text-[#667085]">
                Always analyzing,
                <br />
                always protecting.
              </p>
            </div>
          </div>
        </div>

        {/* Small footer note for the dashboard */}
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

