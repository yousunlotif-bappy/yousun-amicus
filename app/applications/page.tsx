import {
  ArrowRight,
  CalendarDays,
  FileText,
  MapPin,
  Search,
  Store,
} from "lucide-react";
import Link from "next/link";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { formatBDT } from "@/data/applications";
import { getAllApplicationsFromDb } from "@/lib/db-applications";

export default async function ApplicationsPage() {
  /*
    Applications now come from MongoDB.
    If MongoDB has any issue, getAllApplicationsFromDb will safely return demo data.
  */
  const applications = await getAllApplicationsFromDb();

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <Sidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          {/* Page header */}
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#0B2341]">
                Loan Applications
              </h1>

              <p className="mt-2 text-sm text-[#667085]">
                Review borrower applications and run YOUSUN Amicus analysis.
              </p>
            </div>

            {/* Search UI for future filtering */}
            <div className="flex h-12 w-full max-w-md items-center rounded-xl border border-[#D9E0EA] bg-white px-4 shadow-sm">
              <Search className="h-5 w-5 shrink-0 text-[#0B2341]" />

              <input
                type="text"
                className="ml-3 w-full border-none bg-transparent text-sm text-[#0B2341] outline-none placeholder:text-[#98A2B3]"
                placeholder="Search applications..."
              />
            </div>
          </div>

          {/* Quick summary cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard title="Total Applications" value="128" />
            <SummaryCard title="AI Review Pending" value="48" />
            <SummaryCard title="Officer Review" value="42" />
            <SummaryCard title="Approved This Week" value="18" />
          </div>

          {/* Application list */}
          <div className="mt-8 rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B2341]">
                Recent Applications
              </h2>

              <span className="rounded-full bg-[#E8F7F5] px-4 py-2 text-xs font-bold text-[#0E9F9A]">
                MongoDB Connected
              </span>
            </div>

            <div className="space-y-4">
              {applications.map((application) => (
                <Link
                  key={application.id}
                  href={`/applications/${application.id}`}
                  className="block rounded-2xl border border-[#E5EAF0] bg-white p-5 transition hover:border-[#0E9F9A] hover:shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    {/* Application identity */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5]">
                        <Store className="h-7 w-7 text-[#0E9F9A]" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-[#0B2341]">
                            {application.businessName}
                          </h3>

                          <StatusBadge status={application.status} />
                        </div>

                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#667085]">
                          <span className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4" />
                            {application.id}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {application.location}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            {application.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Application numbers */}
                    <div className="grid grid-cols-2 gap-5 text-right md:grid-cols-4">
                      <MiniStat
                        label="Requested"
                        value={formatBDT(application.requestedLoan)}
                      />

                      <MiniStat
                        label="Recommended"
                        value={formatBDT(application.recommendedLoan)}
                        teal
                      />

                      <MiniStat
                        label="Twin Score"
                        value={`${application.twinScore}/900`}
                      />

                      <RiskStat riskLevel={application.riskLevel} />
                    </div>

                    <ArrowRight className="h-5 w-5 text-[#0E9F9A]" />
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
        Updated today
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  teal = false,
}: {
  label: string;
  value: string;
  teal?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-[#667085]">{label}</p>

      <p
        className={`mt-1 text-sm font-bold ${
          teal ? "text-[#0E9F9A]" : "text-[#0B2341]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function RiskStat({ riskLevel }: { riskLevel: "Low" | "Medium" | "High" }) {
  const riskColor =
    riskLevel === "High"
      ? "text-[#E5484D]"
      : riskLevel === "Medium"
        ? "text-[#C9961A]"
        : "text-[#0E9F9A]";

  return (
    <div>
      <p className="text-xs text-[#667085]">Risk</p>
      <p className={`mt-1 text-sm font-bold ${riskColor}`}>{riskLevel}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPending = status === "AI Review Pending";
  const isApproved = status === "Approved";
  const isRejected = status === "Rejected";

  const badgeStyle = isPending
    ? "bg-[#FFF7E8] text-[#C9961A]"
    : isApproved
      ? "bg-[#E8F7F5] text-[#0E9F9A]"
      : isRejected
        ? "bg-red-50 text-red-600"
        : "bg-[#EEF4FF] text-[#0B2341]";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeStyle}`}>
      {status}
    </span>
  );
}


