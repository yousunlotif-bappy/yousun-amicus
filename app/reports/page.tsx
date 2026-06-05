import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { demoReports } from "@/data/reports";

export default function ReportsPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        {/* 
          Fixed sidebar.
          This keeps navigation consistent across the protected dashboard pages.
        */}
        <Sidebar />

        {/* 
          Main report center area.
          Sidebar width is 230px, so content starts after that space.
        */}
        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          {/* Page title and search */}
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#0B2341]">
                Report Center
              </h1>

              <p className="mt-2 text-sm text-[#667085]">
                View bank memos, customer summaries, and rescue-before-default
                reports.
              </p>
            </div>

            {/* 
              Search bar.
              For now this is visual only. Later, we can connect it with report filtering.
            */}
            <div className="flex h-12 w-full max-w-md items-center rounded-xl border border-[#D9E0EA] bg-white px-4 shadow-sm">
              <Search className="h-5 w-5 shrink-0 text-[#0B2341]" />

              <input
                type="text"
                className="ml-3 w-full border-none bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                placeholder="Search reports..."
              />
            </div>
          </div>

          {/* Quick report summary */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <SummaryCard
              title="Total Reports"
              value={String(demoReports.length)}
            />

            <SummaryCard title="Bank Memos" value="4" />

            <SummaryCard title="Rescue Reports" value="4" />
          </div>

          {/* Generated report list */}
          <div className="mt-8 rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B2341]">
                Generated Reports
              </h2>

              <span className="rounded-full bg-[#E8F7F5] px-4 py-2 text-xs font-bold text-[#0E9F9A]">
                Agent Generated
              </span>
            </div>

            <div className="space-y-4">
              {demoReports.map((report) => (
                <Link
                  key={report.id}
                  href={`/reports/${report.id}`}
                  className="block rounded-2xl border border-[#E5EAF0] p-5 transition hover:border-[#0E9F9A] hover:shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    {/* Report identity */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5]">
                        <ReportIcon type={report.type} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-[#0B2341]">
                            {report.title}
                          </h3>

                          <ReportBadge type={report.type} />
                        </div>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                          {report.summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#667085]">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            {report.generatedAt}
                          </span>

                          <span>Audience: {report.audience}</span>

                          <span>Application: {report.applicationId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Report actions */}
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-bold text-[#0B2341]">
                        PDF Soon
                      </span>

                      <Download className="h-4 w-4 text-[#0B2341]" />

                      <ArrowRight className="h-5 w-5 text-[#0E9F9A]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#667085]">{title}</p>

      <p className="mt-3 text-3xl font-bold text-[#0B2341]">{value}</p>

      <p className="mt-2 text-xs font-semibold text-[#0E9F9A]">
        Generated by Amicus Agent
      </p>
    </div>
  );
}

function ReportIcon({ type }: { type: string }) {
  if (type === "rescue_report") {
    return <ShieldCheck className="h-7 w-7 text-[#C9961A]" />;
  }

  if (type === "customer_summary") {
    return <UserRound className="h-7 w-7 text-[#0E9F9A]" />;
  }

  return <FileText className="h-7 w-7 text-[#0E9F9A]" />;
}

function ReportBadge({ type }: { type: string }) {
  const label = getReportLabel(type);
  const badgeStyle =
    type === "rescue_report"
      ? "bg-[#FFF7E8] text-[#C9961A]"
      : "bg-[#E8F7F5] text-[#0E9F9A]";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeStyle}`}>
      {label}
    </span>
  );
}

function getReportLabel(type: string): string {
  if (type === "bank_memo") return "Bank Memo";
  if (type === "customer_summary") return "Customer Summary";
  return "Rescue Report";
}


