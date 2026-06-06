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
import { AgentActionButtons } from "@/components/applications/AgentActionButtons";
import { AgentActivityTimeline } from "@/components/applications/AgentActivityTimeline";
import { Sidebar } from "@/components/layout/Sidebar";
import { GeminiReportButton } from "@/components/reports/GeminiReportButton";
import { formatBDT } from "@/data/applications";
import { runAmicusAnalysis } from "@/lib/agent-calculations";
import { getApplicationByIdFromDb } from "@/lib/db-applications";
import { getReportsByApplicationIdFromDb } from "@/lib/db-reports";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;

  /*
    Application data comes from MongoDB.
    If MongoDB has an issue, the repository safely falls back to demo data.
  */
  const application = await getApplicationByIdFromDb(id);

  if (!application) {
    notFound();
  }

  /*
    Run the Amicus analysis engine for this borrower.
    This powers Financial Twin, Future Mirror, Safe Loan, EMI, and Rescue Plan.
  */
  const analysis = runAmicusAnalysis(application);

  /*
    Reports are loaded from MongoDB.
    Existing generated reports will appear under the Gemini buttons.
  */
  const reports = await getReportsByApplicationIdFromDb(application.id);

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <Sidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          <Link
            href="/applications"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#0E9F9A] transition hover:text-[#087C78]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-[#0B2341]">
                  {application.businessName}
                </h1>

                <span className="rounded-full bg-[#FFF7E8] px-4 py-2 text-xs font-bold text-[#C9961A]">
                  Agent Analysis Ready
                </span>
              </div>

              <p className="mt-2 text-sm text-[#667085]">
                {application.businessType} • {application.location} •{" "}
                {application.id}
              </p>
            </div>

            <AgentActionButtons applicationId={application.id} />
          </div>

          {/* Judge/demo guidance note */}
          <div className="mt-6 rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#0B2341]">
                  Judge Demo Path
                </p>

                <p className="mt-1 text-sm leading-6 text-[#667085]">
                  1. Run Amicus Analysis → 2. Generate Gemini Bank Memo → 3.
                  Download PDF → 4. Create Rescue Plan.
                </p>
              </div>

              <span className="rounded-full bg-[#E8F7F5] px-4 py-2 text-xs font-bold text-[#0E9F9A]">
                Agent Workflow Ready
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard
              title="Requested Loan"
              value={formatBDT(analysis.recommendation.requestedLoan)}
            />

            <InfoCard
              title="Safe Loan"
              value={formatBDT(analysis.recommendation.safeLoan)}
              teal
            />

            <InfoCard
              title="Risky Zone"
              value={`Above ${formatBDT(analysis.recommendation.riskyZone)}`}
              gold
            />

            <InfoCard
              title="Optimal EMI"
              value={formatBDT(analysis.dynamicEmi.normalMonthEmi)}
            />
          </div>

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

                <ProfileRow
                  label="Risk Level"
                  value={analysis.recommendation.riskLevel}
                />

                <ProfileRow
                  label="Seasonality"
                  value={application.seasonality}
                  wide
                />
              </div>

              <div className="mt-6 rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-5">
                <div className="flex gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#C9961A]" />

                  <div>
                    <p className="text-sm font-bold text-[#0B2341]">
                      Amicus Insight
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                      {analysis.financialTwin.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <FinancialTwinPanel
              score={analysis.financialTwin.score}
              grade={analysis.financialTwin.grade}
              cashflowRhythm={analysis.financialTwin.cashflowRhythm}
              debtStress={analysis.financialTwin.debtStress}
              emergencyBuffer={analysis.financialTwin.emergencyBuffer}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <FutureMirrorPanel scenarios={analysis.futureMirror} />

            <RecommendationPanel
              requested={analysis.recommendation.requestedLoan}
              recommended={analysis.recommendation.safeLoan}
              riskyZone={analysis.recommendation.riskyZone}
              reason={analysis.recommendation.reason}
            />

            <EmiPanel
              normal={analysis.dynamicEmi.normalMonthEmi}
              high={analysis.dynamicEmi.highSeasonEmi}
              low={analysis.dynamicEmi.lowSeasonEmi}
              affordability={analysis.dynamicEmi.affordability}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ReportPanel applicationId={application.id} reports={reports} />

            <RescuePanel
              distressLevel={analysis.rescuePlan.distressLevel}
              signals={analysis.rescuePlan.triggerSignals}
              bankAction={analysis.rescuePlan.bankAction}
              avoidAction={analysis.rescuePlan.avoidAction}
              recoveryProbability={analysis.rescuePlan.recoveryProbability}
            />
          </div>

          <div className="mt-6">
            <AgentActivityTimeline />
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
      <Info className="h-4 w-4 text-[#98A2B3]" />
    </div>
  );
}

function InfoCard({
  title,
  value,
  teal = false,
  gold = false,
}: {
  title: string;
  value: string;
  teal?: boolean;
  gold?: boolean;
}) {
  const valueColor = teal
    ? "text-[#0E9F9A]"
    : gold
      ? "text-[#C9961A]"
      : "text-[#0B2341]";

  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#667085]">{title}</p>
      <p className={`mt-3 text-2xl font-bold ${valueColor}`}>{value}</p>
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

function FinancialTwinPanel({
  score,
  grade,
  cashflowRhythm,
  debtStress,
  emergencyBuffer,
}: {
  score: number;
  grade: string;
  cashflowRhythm: string;
  debtStress: string;
  emergencyBuffer: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Financial Twin DNA" />

      <div className="mt-8 flex flex-col items-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#0E9F9A_0_76%,#0B2341_76%_84%,#D9E0EA_84%_100%)]">
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-4xl font-bold text-[#0B2341]">{score}</span>
            <span className="text-sm text-[#667085]">/ 900</span>

            <span className="mt-1 text-sm font-bold text-[#0E9F9A]">
              {grade}
            </span>
          </div>
        </div>

        <div className="mt-6 w-full space-y-3">
          <ScoreItem label="Cashflow Rhythm" value={cashflowRhythm} />
          <ScoreItem label="Debt Stress" value={debtStress} />
          <ScoreItem label="Emergency Buffer" value={emergencyBuffer} />
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

function FutureMirrorPanel({
  scenarios,
}: {
  scenarios: {
    name: string;
    description: string;
    riskLevel: string;
    projectedDefaultRisk: number;
    impact: string;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Future Mirror" />

      <div className="mt-6 space-y-4">
        {scenarios.map((scenario, index) => {
          const color =
            scenario.riskLevel === "High"
              ? "#E5484D"
              : scenario.riskLevel === "Medium"
                ? "#C9961A"
                : "#0E9F9A";

          const icon =
            index === 2
              ? TrendingDown
              : index === 1
                ? ShieldCheck
                : CheckCircle2;

          return (
            <Scenario
              key={scenario.name}
              icon={icon}
              title={scenario.name}
              subtitle={scenario.description}
              value={`${scenario.projectedDefaultRisk}%`}
              color={color}
            />
          );
        })}
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
          <p className="max-w-[210px] text-xs text-[#667085]">{subtitle}</p>
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
  riskyZone,
  reason,
}: {
  requested: number;
  recommended: number;
  riskyZone: number;
  reason: string;
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
                Above {formatBDT(riskyZone)} may create pressure.
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
                Approve {formatBDT(recommended)}, not {formatBDT(requested)}.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm leading-6 text-[#667085]">{reason}</p>
      </div>
    </div>
  );
}

function EmiPanel({
  normal,
  high,
  low,
  affordability,
}: {
  normal: number;
  high: number;
  low: number;
  affordability: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Dynamic EMI Plan" />

      <div className="mt-6 space-y-4">
        <EmiRow label="Normal Month EMI" value={formatBDT(normal)} />
        <EmiRow label="High Season EMI" value={formatBDT(high)} />
        <EmiRow label="Low Season EMI" value={formatBDT(low)} />
      </div>

      <div className="mt-6 rounded-xl bg-[#E8F7F5] p-4">
        <p className="text-sm font-bold text-[#0B2341]">Affordability</p>

        <p className="mt-1 text-2xl font-bold text-[#0E9F9A]">
          {affordability}
        </p>
      </div>
    </div>
  );
}

function EmiRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF2F6] pb-3 last:border-0">
      <span className="text-sm text-[#667085]">{label}</span>
      <span className="text-sm font-bold text-[#0B2341]">{value}</span>
    </div>
  );
}

function ReportPanel({
  applicationId,
  reports,
}: {
  applicationId: string;
  reports: {
    id: string;
    title: string;
    type: string;
    audience: string;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      <SectionTitle title="Report Center" />

      <div className="mt-6 space-y-4">
        <GeminiReportButton
          applicationId={applicationId}
          kind="bank_memo"
          label="Generate Bank Memo"
        />

        <GeminiReportButton
          applicationId={applicationId}
          kind="customer_summary"
          label="Generate Customer Summary"
        />

        <GeminiReportButton
          applicationId={applicationId}
          kind="rescue_report"
          label="Generate Rescue Report"
        />

        <div className="border-t border-[#E5EAF0] pt-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#667085]">
            Existing Reports
          </p>

          <div className="space-y-3">
            {reports.length > 0 ? (
              reports.map((report) => (
                <Link
                  href={`/reports/${report.id}`}
                  key={report.id}
                  className="flex w-full items-center justify-between rounded-xl border border-[#E5EAF0] p-4 text-left transition hover:border-[#0E9F9A]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F7F5]">
                      <FileText className="h-5 w-5 text-[#0E9F9A]" />
                    </div>

                    <div>
                      <span className="block text-sm font-bold text-[#0B2341]">
                        {report.title}
                      </span>

                      <span className="text-xs text-[#667085]">
                        {report.audience}
                      </span>
                    </div>
                  </div>

                  <BarChart3 className="h-4 w-4 text-[#667085]" />
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-[#D9E0EA] p-4">
                <p className="text-sm font-semibold text-[#0B2341]">
                  No reports generated yet
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Use the Gemini buttons above to generate reports for this
                  application.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RescuePanel({
  distressLevel,
  signals,
  bankAction,
  avoidAction,
  recoveryProbability,
}: {
  distressLevel: string;
  signals: string[];
  bankAction: string;
  avoidAction: string;
  recoveryProbability: number;
}) {
  return (
    <div className="rounded-2xl border border-[#E4B14B] bg-[#FFFDF8] p-6 shadow-sm">
      <SectionTitle title="Rescue Before Default" />

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#667085]">
            Distress Level
          </p>

          <p className="mt-1 text-2xl font-bold text-[#C9961A]">
            {distressLevel}
          </p>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#667085]">
              Trigger Signals
            </p>

            <ul className="mt-2 space-y-2">
              {signals.map((signal) => (
                <li key={signal} className="text-sm text-[#0B2341]">
                  • {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#667085]">
            Recommended Bank Action
          </p>

          <p className="mt-2 text-sm leading-6 text-[#0B2341]">{bankAction}</p>

          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#667085]">
            Avoid Action
          </p>

          <p className="mt-2 text-sm leading-6 text-[#0B2341]">{avoidAction}</p>

          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#667085]">
            Recovery Probability
          </p>

          <p className="mt-1 text-2xl font-bold text-[#0E9F9A]">
            {recoveryProbability}%
          </p>

          <span className="mt-5 inline-flex rounded-xl border border-[#C9961A] bg-white px-5 py-3 text-sm font-bold text-[#C9961A]">
            Rescue workflow ready
          </span>
        </div>
      </div>
    </div>
  );
}


