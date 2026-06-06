import { Settings } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";

export default function SettingsPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        {/* 
          Fixed sidebar.
          This keeps the navigation consistent across all protected pages.
        */}
        <Sidebar />

        {/* 
          Main settings area.
          Sidebar width is 230px, so the content starts after that space.
        */}
        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          <div className="rounded-2xl border border-[#E5EAF0] bg-white p-8 shadow-sm">
            {/* Page title block */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5]">
                <Settings className="h-7 w-7 text-[#0E9F9A]" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-[#0B2341]">
                  Settings
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  Demo configuration, bank profile, and responsible AI settings.
                </p>
              </div>
            </div>

            {/* Responsible AI configuration */}
            <div className="mt-8 rounded-xl border border-[#F0E3C4] bg-[#FFFDF8] p-5">
              <p className="text-sm font-bold text-[#0B2341]">
                Responsible AI Mode
              </p>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Amicus is configured as decision-support only. Final loan
                approval, restructuring, or recovery decisions remain with
                authorized bank officers.
              </p>
            </div>

            {/* Future settings preview */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <SettingsCard
                title="Bank Profile"
                status="Demo Bank"
                description="Bank name, officer role, and branch-level profile will be managed here."
              />

              <SettingsCard
                title="Agent Safety"
                status="Enabled"
                description="Responsible AI rules keep the agent focused on fair lending and human review."
              />

              <SettingsCard
                title="MongoDB Storage"
                status="Connected"
                description="Loan applications, reports, and rescue plans are prepared for database-backed workflows."
              />
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function SettingsCard({
  title,
  status,
  description,
}: {
  title: string;
  status: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#E5EAF0] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#0B2341]">{title}</p>

        <span className="rounded-full bg-[#E8F7F5] px-3 py-1 text-[11px] font-bold text-[#0E9F9A]">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#667085]">{description}</p>
    </div>
  );
}


