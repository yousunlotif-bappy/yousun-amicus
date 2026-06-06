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
import { getAllReportsFromDb } from "@/lib/db-reports";

export default async function ReportsPage() {
  /*
    Reports now come from MongoDB.
    If MongoDB fails, db-reports.ts will safely return local demo reports.
  */
  const reports = await getAllReportsFromDb();

  /*
    Dynamic report counts.
    These numbers update automatically based on the reports currently available.
  */
  const totalReports = reports.length;
  const bankMemoCount = reports.filter(
    (report) => report.type === "bank_memo"
  ).length;
  const rescueReportCount = reports.filter(
    (report) => report.type === "rescue_report"
  ).length;

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <Sidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          {/* Page header */}
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

            {/* Search UI for future filtering */}
            <div className="flex h-12 w-full max-w-md items-center rounded-xl border border-[#D9E0EA] bg-white px-4 shadow-sm">
              <Search className="h-5 w-5 shrink-0 text-[#0B2341]" />

              <input
                type="text"
                className="ml-3 w-full border-none bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                placeholder="Search reports..."
              />
            </div>
          </div>

          {/* Dynamic summary cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <SummaryCard title="Total Reports" value={String(totalReports)} />

            <SummaryCard title="Bank Memos" value={String(bankMemoCount)} />

            <SummaryCard
              title="Rescue Reports"
              value={String(rescueReportCount)}
            />
          </div>

          {/* Generated reports list */}
          <div className="mt-8 rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B2341]">
                Generated Reports
              </h2>

              <span className="rounded-full bg-[#E8F7F5] px-4 py-2 text-xs font-bold text-[#0E9F9A]">
                MongoDB Connected
              </span>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <Link
                  key={report.id}
                  href={`/reports/${report.id}`}
                  className="block rounded-2xl border border-[#E5EAF0] p-5 transition hover:border-[#0E9F9A] hover:shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-5">
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

                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-bold text-[#0B2341]">
                        PDF Ready
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

