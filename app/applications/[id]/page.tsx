import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  FileText,
  Info,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { formatBDT, getApplicationById } from "@/data/applications";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const application = getApplicationById(id);

  if (!application) {
    notFound();
  }

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        {/* 
          Fixed sidebar.
          This keeps navigation consistent with the rest of the protected dashboard pages.
        */}
        <Sidebar />

        {/* 
          Main application detail area.
          Sidebar width is 230px, so the content starts after 230px.
        */}
        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          {/* Back link */}
          <Link
            href="/applications"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#0E9F9A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Link>

          {/* Page header */}
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-[#0B2341]">
                  {application.businessName}
                </h1>

                <span className="rounded-full bg-[#FFF7E8] px-4 py-2 text-xs font-bold text-[#C9961A]">
                  {application.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-[#667085]">
                {application.businessType} • {application.location} •{" "}
                {application.id}
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-[#0B2341] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#071A2F]"
            >
              Run Amicus Analysis
            </button>
          </div>

          {/* Important loan numbers */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard
              title="Requested Loan"
              value={formatBDT(application.requestedLoan)}
            />

            <InfoCard
              title="Recommended Loan"
              value={formatBDT(application.recommendedLoan)}
              teal
            />

            <InfoCard
              title="Average Sales"
              value={formatBDT(application.averageMonthlySales)}
            />

            <InfoCard
              title="Existing EMI"
              value={formatBDT(application.existingEmi)}
            />
          </div>

          {/* Applicant profile and financial twin */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm xl:col-span-2">
              <SectionTitle title="Applicant Profile" />

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <ProfileRow label="Owner Name" value={application.ownerName} />

                <ProfileRow
                  label="Business Type"
                  value={application.businessType}
                />

                <ProfileRow
                  label="Product Type"
                  value={application.productType}
                />

                <ProfileRow label="Risk Level" value={application.riskLevel} />

                <ProfileRow
                  label="Seasonality"
                  value={application.seasonality}
                  wide
                />
              </div>

              {/* Short AI insight preview */}
              <div className="mt-6 rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-5">
                <div className="flex gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#C9961A]" />

                  <div>
                    <p className="text-sm font-bold text-[#0B2341]">
                      Amicus Insight
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                      This applicant shows stable but seasonal cashflow. The
                      requested amount may create pressure during low-sales
                      months. A smaller working capital bridge with dynamic EMI
                      is safer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <FinancialTwinPanel score={application.twinScore} />
          </div>

          {/* AI decision support panels */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <FutureMirrorPanel />

            <RecommendationPanel
              requested={application.requestedLoan}
              recommended={application.recommendedLoan}
            />

            <ReportPanel />
          </div>

          {/* Rescue before default preview */}
          <div className="mt-6 rounded-2xl border border-[#E4B14B] bg-[#FFFDF8] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F8E9C8]">
                  <ShieldCheck className="h-8 w-8 text-[#C9961A]" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#0B2341]">
                    Rescue Before Default Preview
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    If sales drop by 35% and EMI is delayed twice, Amicus will
                    recommend a 4-month lower EMI support plan.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="rounded-xl border border-[#C9961A] px-6 py-3 text-sm font-bold text-[#C9961A] transition hover:bg-[#FFF4D8]"
              >
                Create Rescue Plan
              </button>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-bold text-[#0B2341]">{title}</h2>

      {/* Later, this icon can open a small helper tooltip */}
      <Info className="h-4 w-4 text-[#98A2B3]" />
    </div>
  );
}

function InfoCard({
  title,
  value,
  teal = false,
}: {
  title: string;
  value: string;
  teal?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#667085]">{title}</p>

      <p
        className={`mt-3 text-2xl font-bold ${
          teal ? "text-[#0E9F9A]" : "text-[#0B2341]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ProfileRow({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-4 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-[#0B2341]">{value}</p>
    </div>
  );
}

function FinancialTwinPanel({ score }: { score: number }) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Financial Twin DNA" />

      <div className="mt-8 flex flex-col items-center">
        {/* Financial Twin score ring */}
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#0E9F9A_0_76%,#0B2341_76%_84%,#D9E0EA_84%_100%)]">
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-4xl font-bold text-[#0B2341]">{score}</span>
            <span className="text-sm text-[#667085]">/ 900</span>

            <span className="mt-1 text-sm font-bold text-[#0E9F9A]">
              Good
            </span>
          </div>
        </div>

        {/* Financial Twin breakdown */}
        <div className="mt-6 w-full space-y-3">
          <ScoreItem label="Cashflow Rhythm" value="Seasonal but stable" />
          <ScoreItem label="Debt Stress" value="Medium" />
          <ScoreItem label="Emergency Buffer" value="Weak" />
        </div>
      </div>
    </div>
  );
}

function ScoreItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF2F6] pb-3 last:border-0">
      <span className="text-sm text-[#667085]">{label}</span>

      <span className="text-sm font-bold text-[#0B2341]">{value}</span>
    </div>
  );
}

function FutureMirrorPanel() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Future Mirror" />

      <div className="mt-6 space-y-4">
        <Scenario
          icon={CheckCircle2}
          title="Normal Scenario"
          subtitle="Manageable with safeguards"
          value="Stable"
          color="#0E9F9A"
        />

        <Scenario
          icon={TrendingDown}
          title="Sales Down 25%"
          subtitle="High EMI pressure"
          value="Risky"
          color="#E5484D"
        />

        <Scenario
          icon={ShieldCheck}
          title="Safe Scenario"
          subtitle="BDT 9 lakh + dynamic EMI"
          value="Best"
          color="#0B2341"
        />
      </div>
    </div>
  );
}

function Scenario({
  icon: Icon,
  title,
  subtitle,
  value,
  color,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#E5EAF0] p-4">
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>

        <div>
          <p className="text-sm font-bold text-[#0B2341]">{title}</p>
          <p className="text-xs text-[#667085]">{subtitle}</p>
        </div>
      </div>

      <p className="text-sm font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function RecommendationPanel({
  requested,
  recommended,
}: {
  requested: number;
  recommended: number;
}) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Debt-Trap Shield" />

      <div className="mt-6 space-y-4">
        <div className="rounded-xl bg-red-50 p-4">
          <div className="flex gap-3">
            <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />

            <div>
              <p className="text-sm font-bold text-red-600">Risky Zone</p>

              <p className="text-sm text-[#667085]">
                Full request {formatBDT(requested)} may create pressure.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#E8F7F5] p-4">
          <div className="flex gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#0E9F9A]" />

            <div>
              <p className="text-sm font-bold text-[#0E9F9A]">
                Safer Recommendation
              </p>

              <p className="text-sm text-[#667085]">
                Approve {formatBDT(recommended)} with dynamic EMI.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-[#0B2341] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#071A2F]"
        >
          Generate Recommendation
        </button>
      </div>
    </div>
  );
}

function ReportPanel() {
  const reports = ["Bank Officer Memo", "Customer Summary", "Rescue Report"];

  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Report Center" />

      <div className="mt-6 space-y-4">
        {reports.map((report) => (
          <button
            key={report}
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-[#E5EAF0] p-4 text-left transition hover:border-[#0E9F9A]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F7F5]">
                <FileText className="h-5 w-5 text-[#0E9F9A]" />
              </div>

              <span className="text-sm font-bold text-[#0B2341]">
                {report}
              </span>
            </div>

            <BarChart3 className="h-4 w-4 text-[#667085]" />
          </button>
        ))}
      </div>
    </div>
  );
}


