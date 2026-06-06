import { ShieldAlert } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";

export default function RiskMonitorPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        {/* 
          Fixed sidebar.
          This keeps the navigation consistent across all protected pages.
        */}
        <Sidebar />

        {/* 
          Main page area.
          Sidebar width is 230px, so the content starts after that space.
        */}
        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          <div className="rounded-2xl border border-[#E4B14B] bg-[#FFFDF8] p-8 shadow-sm">
            {/* Page title block */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F8E9C8]">
                <ShieldAlert className="h-7 w-7 text-[#C9961A]" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-[#0B2341]">
                  Risk Monitor
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  Portfolio distress signals and rescue-before-default queues.
                </p>
              </div>
            </div>

            {/* Quick portfolio risk summary */}
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              <RiskCard title="Early Distress Cases" value="3" />
              <RiskCard title="Medium Risk Borrowers" value="16" />
              <RiskCard title="Rescue Plans Ready" value="4" />
            </div>

            {/* 
              Demo guidance.
              This explains how this module connects to the main agent workflow.
            */}
            <div className="mt-8 rounded-xl border border-[#F0E3C4] bg-white p-5">
              <p className="text-sm font-bold text-[#0B2341]">
                How this module fits the agent workflow
              </p>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                The Risk Monitor is designed to collect early warning signals
                from borrower behavior, repayment delays, and cashflow stress.
                In the current demo, open an application and use{" "}
                <strong className="font-bold text-[#0B2341]">
                  Create Rescue Plan
                </strong>{" "}
                to save a rescue-before-default action.
              </p>
            </div>

            {/* Future risk queue preview */}
            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
              <RiskQueueItem
                title="Sales Drop Alert"
                description="Detects borrowers with sudden monthly sales decline."
              />

              <RiskQueueItem
                title="EMI Delay Pattern"
                description="Flags repeated repayment delays before full default."
              />

              <RiskQueueItem
                title="Responsible Recovery"
                description="Suggests support-first actions before aggressive recovery."
              />
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function RiskCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#667085]">{title}</p>

      <p className="mt-3 text-3xl font-bold text-[#0B2341]">{value}</p>

      <p className="mt-2 text-xs font-bold text-[#C9961A]">
        Rescue workflow ready
      </p>
    </div>
  );
}

function RiskQueueItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#F0E3C4] bg-white p-5">
      <p className="text-sm font-bold text-[#0B2341]">{title}</p>

      <p className="mt-2 text-sm leading-6 text-[#667085]">{description}</p>
    </div>
  );
}


