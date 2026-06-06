import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReportActions } from "@/components/reports/ReportActions";
import { getApplicationByIdFromDb } from "@/lib/db-applications";
import { getReportByIdFromDb } from "@/lib/db-reports";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReportDetailPage({ params }: PageProps) {
  const { id } = await params;

  /*
    Report now comes from MongoDB.
    If MongoDB fails, db-reports.ts will safely fall back to local demo reports.
  */
  const report = await getReportByIdFromDb(id);

  if (!report) {
    notFound();
  }

  /*
    The report only stores applicationId, so we fetch the related application separately.
  */
  const application = await getApplicationByIdFromDb(report.applicationId);

  if (!application) {
    notFound();
  }

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <Sidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          <Link
            href="/reports"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#0E9F9A] transition hover:text-[#087C78]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-[#0B2341]">
                  {report.title}
                </h1>

                <span className="rounded-full bg-[#E8F7F5] px-4 py-2 text-xs font-bold text-[#0E9F9A]">
                  {report.audience}
                </span>
              </div>

              <p className="mt-2 text-sm text-[#667085]">
                {application.businessName} • {report.applicationId} • Generated
                on {report.generatedAt}
              </p>
            </div>

            <ReportActions reportId={report.id} reportTitle={report.title} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
            <article
              id="report-content"
              className="rounded-2xl border border-[#E5EAF0] bg-white p-8 shadow-sm"
            >
              <div className="border-b border-[#E5EAF0] pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/logo.png"
                    alt="YOUSUN Amicus Logo"
                    className="h-16 w-auto"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-[#0B2341]">
                      YOUSUN <span className="text-[#0E9F9A]">Amicus</span>
                    </h2>

                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#667085]">
                      AI Agent for Fair Banking
                    </p>
                  </div>
                </div>

                <h3 className="mt-8 text-3xl font-bold text-[#0B2341]">
                  {report.title}
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#667085]">
                  {report.summary}
                </p>
              </div>

              <div className="mt-8 space-y-8">
                {report.sections.map((section) => (
                  <section key={section.heading}>
                    <h4 className="text-lg font-bold text-[#0B2341]">
                      {section.heading}
                    </h4>

                    <div className="mt-4 space-y-3">
                      {section.body.map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-4"
                        >
                          <p className="text-sm leading-6 text-[#0B2341]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#C9961A]" />

                  <div>
                    <p className="text-sm font-bold text-[#0B2341]">
                      Responsible AI Note
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                      YOUSUN Amicus provides decision-support only. Final
                      credit, approval, restructuring, or recovery decisions
                      must remain with authorized bank officers.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0B2341]">
                  Report Metadata
                </h3>

                <div className="mt-5 space-y-4">
                  <MetaItem label="Report ID" value={report.id} />
                  <MetaItem
                    label="Application ID"
                    value={report.applicationId}
                  />
                  <MetaItem label="Audience" value={report.audience} />
                  <MetaItem label="Date" value={report.generatedAt} />
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0B2341]">
                  Applicant
                </h3>

                <div className="mt-5 space-y-4">
                  <MetaItem label="Business" value={application.businessName} />
                  <MetaItem label="Owner" value={application.ownerName} />
                  <MetaItem label="Type" value={application.businessType} />
                  <MetaItem label="Risk" value={application.riskLevel} />
                </div>
              </div>

              <Link
                href={`/applications/${application.id}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0E9F9A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#087C78]"
              >
                <FileText className="h-4 w-4" />
                Open Application
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#EEF2F6] pb-3 last:border-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#0B2341]">{value}</p>
    </div>
  );
}


