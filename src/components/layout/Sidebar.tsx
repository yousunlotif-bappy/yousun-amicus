"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Each item has its own route, so the sidebar can highlight the current page automatically.
*/
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Applications", icon: FileText, href: "/applications" },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Risk Monitor", icon: ShieldAlert, href: "/risk-monitor" },
  { name: "Reports", icon: BarChart3, href: "/reports" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[230px] flex-col border-r border-[#E5EAF0] bg-white px-4 py-6">
      {/* 
        Brand section.
        This keeps the product identity visible across every dashboard page.
      */}
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
          Fair Banking Agent
        </p>

        {/* Small gold line for a premium banking feel */}
        <div className="mt-3 h-[2px] w-14 bg-[#C9961A]" />
      </div>

      {/* 
        Navigation links.
        The active page gets a soft teal background so users always know where they are.
      */}
      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#E8F7F5] text-[#0B2341]"
                  : "text-[#0B2341] hover:bg-[#F3F7F8]"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${
                  isActive ? "text-[#0E9F9A]" : "text-[#0B2341]"
                }`}
              />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 
        Bottom AI identity block.
        This supports the main product story: fair lending with early risk protection.
      */}
      <div className="mt-auto">
        <div className="border-t border-[#E5EAF0] pt-5">
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
        <p className="mt-6 text-xs leading-5 text-[#667085]">
          © 2026 YOUSUN Amicus
          <br />
          All rights reserved.
        </p>

        {/* Final gold accent */}
        <div className="mt-4 h-[2px] w-14 bg-[#C9961A]" />
      </div>
    </aside>
  );
}


