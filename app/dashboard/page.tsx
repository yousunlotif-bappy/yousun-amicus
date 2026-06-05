import {
  ArrowRight,
  BarChart3,
  Download,
  FileText,
  Info,
  Minus,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { MetricCard } from "@/components/dashboard/MetricCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Fixed sidebar gives the app a real banking SaaS dashboard feeling */}
      <Sidebar />

      {/* Main dashboard content starts after the sidebar width */}
      <section className="ml-[250px] px-9 py-7">
        <Topbar />

        {/* 
          Top metric cards.
          lg:grid-cols-4 keeps all four cards in one row on normal laptop/desktop screens.
        */}
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

        {/* Main analysis area */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <ApplicantOverview />
          <FinancialTwinCard />
          <FutureMirrorCard />
        </div>

        {/* Supporting dashboard cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <DynamicEmiCard />
          <ReportCenterCard />
        </div>

        {/* Bottom action banner */}
        <RescueBanner />
      </section>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-bold text-[#0B2341]">{title}</h2>

      {/* This info icon can later show a small tooltip explanation */}
      <Info className="h-4 w-4 text-[#98A2B3]" />
    </div>
  );
}

function ApplicantOverview() {
  const applicationRows = [
    ["New Applications", "58", "#0E9F9A"],
    ["Under Review", "42", "#0B2341"],
    ["Approved", "18", "#0E9F9A"],
    ["Rejected", "10", "#A7B0BE"],
  ];

  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <SectionTitle title="Applicant Overview" />
        <span className="text-xs font-medium text-[#667085]">This Week</span>
      </div>

      <div className="flex items-center gap-8">
        {/* Simple CSS donut chart for a clean MVP dashboard */}
        <div className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#0B2341_0_35%,#0E9F9A_35%_72%,#D9E0EA_72%_100%)]">
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-[#0B2341]">128</span>
            <span className="text-xs text-[#667085]">Total</span>
          </div>
        </div>

        {/* Application status list */}
        <div className="flex-1 space-y-4">
          {applicationRows.map(([label, value, color]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-[#EEF2F6] pb-3 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />

                <span className="text-sm text-[#0B2341]">{label}</span>
              </div>

              <span className="text-sm font-bold text-[#0B2341]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#0E9F9A]"
      >
        View all applications <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function FinancialTwinCard() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Financial Twin Score" />

      <div className="mt-8 flex flex-col items-center">
        {/* Financial Twin score ring */}
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(#0E9F9A_0_76%,#0B2341_76%_84%,#D9E0EA_84%_100%)]">
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-5xl font-bold text-[#0B2341]">736</span>
            <span className="text-lg text-[#667085]">/ 900</span>
            <span className="mt-1 text-lg font-semibold text-[#0E9F9A]">
              Good
            </span>
          </div>
        </div>

        {/* Short AI insight preview */}
        <div className="mt-8 flex w-full gap-3 rounded-xl border border-[#F0E3C4] bg-[#FFFDF8] p-4">
          <Sparkles className="mt-1 h-5 w-5 text-[#C9961A]" />

          <div>
            <p className="text-sm font-semibold text-[#0B2341]">
              Strong repayment capacity
            </p>

            <p className="mt-1 text-sm text-[#667085]">
              Low default probability
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 flex items-center gap-2 self-start text-sm font-semibold text-[#0E9F9A]"
        >
          View full analysis <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function FutureMirrorCard() {
  const scenarios = [
    {
      title: "Growth Scenario",
      subtitle: "Best case projection",
      value: "18%",
      icon: TrendingUp,
      color: "#0E9F9A",
      positive: true,
    },
    {
      title: "Steady Scenario",
      subtitle: "Most likely projection",
      value: "6%",
      icon: Minus,
      color: "#0B2341",
      positive: true,
    },
    {
      title: "Stress Scenario",
      subtitle: "Adverse projection",
      value: "12%",
      icon: TrendingDown,
      color: "#A7B0BE",
      positive: false,
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Future Mirror Scenarios" />

      <div className="mt-8 space-y-5">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;

          return (
            <div
              key={scenario.title}
              className="flex items-center justify-between border-b border-[#EEF2F6] pb-5 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${scenario.color}18` }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: scenario.color }}
                  />
                </div>

                <div>
                  <p className="font-semibold text-[#0B2341]">
                    {scenario.title}
                  </p>

                  <p className="mt-1 text-sm text-[#667085]">
                    {scenario.subtitle}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    scenario.positive ? "text-[#0E9F9A]" : "text-[#E5484D]"
                  }`}
                >
                  {scenario.positive ? "↑" : "↓"} {scenario.value}
                </p>

                <p className="text-xs text-[#667085]">Impact</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#0E9F9A]"
      >
        View scenarios <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function DynamicEmiCard() {
  const emiPoints = [
    { label: "Now", value: 48 },
    { label: "6M", value: 58 },
    { label: "12M", value: 45 },
    { label: "18M", value: 70 },
    { label: "24M", value: 76 },
    { label: "30M", value: 62 },
  ];

  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Dynamic EMI Summary" />

      <div className="mt-7 flex gap-8">
        {/* EMI recommendation snapshot */}
        <div className="w-40 rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-4">
          <p className="text-xs text-[#0B2341]">Optimal EMI</p>

          <p className="mt-2 text-2xl font-bold text-[#0B2341]">৳ 18,450</p>

          <p className="text-xs text-[#667085]">/ month</p>

          <div className="mt-5 border-t border-[#E5EAF0] pt-4">
            <p className="text-xs text-[#0B2341]">Affordability</p>
            <p className="mt-1 text-xl font-bold text-[#0E9F9A]">High</p>
          </div>
        </div>

        {/* Simple bar chart for EMI movement */}
        <div className="flex flex-1 items-end gap-4 border-b border-[#D9E0EA] pb-8">
          {emiPoints.map((point, index) => (
            <div
              key={point.label}
              className="flex flex-1 flex-col items-center"
            >
              <div
                className={`w-full rounded-t-lg ${
                  index === 4 ? "bg-[#0B2341]" : "bg-[#0E9F9A]"
                }`}
                style={{ height: `${point.value * 2}px` }}
              />

              <span className="mt-3 text-xs text-[#667085]">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#0E9F9A]"
      >
        View EMI details <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ReportCenterCard() {
  const reports = [
    "Portfolio Risk Report",
    "Approval Trend Analysis",
    "Financial Twin Insights",
  ];

  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <SectionTitle title="Report Center" />

        <button type="button" className="text-sm font-semibold text-[#0E9F9A]">
          All Reports →
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {reports.map((report, index) => (
          <div
            key={report}
            className="flex items-center justify-between border-b border-[#EEF2F6] pb-4 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                  index === 1 ? "bg-[#EAF1F8]" : "bg-[#E8F7F5]"
                }`}
              >
                <FileText
                  className={`h-5 w-5 ${
                    index === 1 ? "text-[#0B2341]" : "text-[#0E9F9A]"
                  }`}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0B2341]">
                  {report}
                </p>

                <p className="text-xs text-[#667085]">
                  Generated on May {20 - index}, 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-bold text-[#0B2341]">
                PDF
              </span>

              <Download className="h-4 w-4 text-[#0B2341]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RescueBanner() {
  return (
    <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#E4B14B] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="flex items-center gap-5">
        {/* Gold shield icon supports the rescue-before-default story */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8E9C8]">
          <ShieldCheck className="h-8 w-8 text-[#C9961A]" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#0B2341]">
            Rescue Before Default
          </h2>

          <p className="mt-1 text-sm text-[#667085]">
            3 accounts detected with early signs of stress. Proactive actions
            can reduce potential losses.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-[#C9961A] px-6 py-3 text-sm font-bold text-[#C9961A] transition hover:bg-[#FFF4D8]"
      >
        View At-Risk Accounts <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}


