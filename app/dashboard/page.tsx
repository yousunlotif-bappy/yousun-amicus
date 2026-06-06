import {
  BarChart3,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingDown,
} from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { DemoGuideCard } from "@/components/dashboard/DemoGuideCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <Sidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          <Topbar />

          {/* 
            Demo guide card.
            This gives judges/users a direct path into the main agent workflow.
          */}
          <DemoGuideCard />

          {/* Main dashboard metrics */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Active Applications"
              value="128"
              change="12%"
              icon={FileText}
            />

            <MetricCard
              title="Approval Readiness"
              value="72%"
              change="8%"
              icon={ShieldCheck}
            />

            <MetricCard
              title="Risk Alerts"
              value="16"
              change="4"
              icon={ShieldAlert}
              variant="navy"
            />

            <MetricCard
              title="Reports Generated"
              value="24"
              change="3"
              icon={BarChart3}
            />
          </div>

          {/* Core agent overview cards */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <ApplicantOverviewCard />
            <FinancialTwinCard />
            <FutureMirrorCard />
          </div>

          {/* EMI and report cards */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <DynamicEmiCard />
            <ReportCenterCard />
          </div>

          <RescueBanner />
        </section>
      </main>
    </AuthGuard>
  );
}

function ApplicantOverviewCard() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F7F5]">
          <Store className="h-6 w-6 text-[#0E9F9A]" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#0B2341]">
            Applicant Overview
          </h2>
          <p className="mt-1 text-sm text-[#667085]">
            Primary demo borrower profile
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <DashboardRow label="Business" value="Rahim Fashion House" />
        <DashboardRow label="Type" value="Retail Apparel" />
        <DashboardRow label="Location" value="Dhaka, Bangladesh" />
        <DashboardRow label="Requested Loan" value="BDT 15,00,000" />
      </div>
    </div>
  );
}

function FinancialTwinCard() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F7F5]">
          <Sparkles className="h-6 w-6 text-[#0E9F9A]" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#0B2341]">
            Financial Twin Score
          </h2>
          <p className="mt-1 text-sm text-[#667085]">
            Borrower health simulation
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-[#E8F7F5]">
          <span className="text-4xl font-bold text-[#0B2341]">736</span>
          <span className="text-sm font-semibold text-[#0E9F9A]">Good</span>
        </div>
      </div>

      <p className="mt-6 text-center text-sm leading-6 text-[#667085]">
        Seasonal cashflow is manageable, but full requested amount may create
        repayment pressure.
      </p>
    </div>
  );
}

function FutureMirrorCard() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F7F5]">
          <TrendingDown className="h-6 w-6 text-[#0E9F9A]" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#0B2341]">Future Mirror</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Scenario-based repayment view
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <ScenarioRow label="Growth Scenario" value="Low Risk" />
        <ScenarioRow label="Steady Scenario" value="Stable" />
        <ScenarioRow label="Stress Scenario" value="Needs Support" warning />
      </div>
    </div>
  );
}

function DynamicEmiCard() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#0B2341]">Dynamic EMI Summary</h2>

      <p className="mt-2 text-sm leading-6 text-[#667085]">
        EMI plan follows borrower cashflow rhythm instead of forcing one flat
        repayment pattern.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <MiniBox label="Normal Month" value="BDT 18,000" />
        <MiniBox label="High Season" value="BDT 29,500" />
        <MiniBox label="Low Season" value="BDT 12,500" />
      </div>
    </div>
  );
}

function ReportCenterCard() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#0B2341]">Report Center</h2>

      <p className="mt-2 text-sm leading-6 text-[#667085]">
        Amicus prepares separate reports for bank officers, borrowers, and risk
        managers.
      </p>

      <div className="mt-6 space-y-3">
        <ReportItem title="Bank Officer Credit Memo" />
        <ReportItem title="Customer-Friendly Loan Guidance" />
        <ReportItem title="Rescue Before Default Report" />
      </div>
    </div>
  );
}

function RescueBanner() {
  return (
    <div className="mt-6 rounded-2xl border border-[#E4B14B] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h2 className="text-xl font-bold text-[#0B2341]">
            Rescue Before Default
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#667085]">
            If sales drop and EMI delays appear, Amicus recommends support-first
            recovery actions before full default.
          </p>
        </div>

        <span className="rounded-xl border border-[#C9961A] bg-white px-5 py-3 text-sm font-bold text-[#C9961A]">
          Workflow Ready
        </span>
      </div>
    </div>
  );
}

function DashboardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF2F6] pb-3 last:border-0">
      <span className="text-sm text-[#667085]">{label}</span>
      <span className="text-sm font-bold text-[#0B2341]">{value}</span>
    </div>
  );
}

function ScenarioRow({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#E5EAF0] p-4">
      <span className="text-sm font-semibold text-[#0B2341]">{label}</span>

      <span
        className={`text-sm font-bold ${
          warning ? "text-[#C9961A]" : "text-[#0E9F9A]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function MiniBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-[#0B2341]">{value}</p>
    </div>
  );
}

function ReportItem({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-4">
      <p className="text-sm font-bold text-[#0B2341]">{title}</p>
    </div>
  );
}


