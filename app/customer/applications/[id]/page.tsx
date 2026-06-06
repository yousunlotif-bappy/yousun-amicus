import { ArrowLeft, CheckCircle2, Clock, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { CustomerSidebar } from "@/components/customer/CustomerSidebar";
import { formatBDT } from "@/data/applications";
import { getApplicationByIdFromDb } from "@/lib/db-applications";
import { runAmicusAnalysis } from "@/lib/agent-calculations";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CustomerApplicationStatusPage({ params }: PageProps) {
  const { id } = await params;
  const application = await getApplicationByIdFromDb(id);

  if (!application) {
    notFound();
  }

  const analysis = runAmicusAnalysis(application);

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <CustomerSidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          <Link
            href="/customer/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#0E9F9A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Customer Dashboard
          </Link>

          <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <h1 className="text-3xl font-bold text-[#0B2341]">
                  {application.businessName}
                </h1>
                <p className="mt-2 text-sm text-[#667085]">
                  Application ID: {application.id}
                </p>
              </div>

              <span className="rounded-full bg-[#FFF7E8] px-4 py-2 text-xs font-bold text-[#C9961A]">
                {application.status}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              <InfoCard title="Requested Loan" value={formatBDT(application.requestedLoan)} />
              <InfoCard title="Safer Range Preview" value={formatBDT(analysis.recommendation.safeLoan)} teal />
              <InfoCard title="Status" value={application.status} gold />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border border-[#E5EAF0] bg-[#F8FAFC] p-6">
                <h2 className="text-xl font-bold text-[#0B2341]">
                  Application Status Timeline
                </h2>

                <div className="mt-6 space-y-5">
                  <TimelineItem
                    icon={CheckCircle2}
                    title="Application Submitted"
                    text="Your application has been received."
                    done
                  />
                  <TimelineItem
                    icon={Clock}
                    title="AI Review Pending"
                    text="A bank officer can now run Amicus analysis."
                    done
                  />
                  <TimelineItem
                    icon={FileText}
                    title="Bank Officer Review"
                    text="The bank will review safe loan recommendation and documents."
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-[#C9961A]" />
                  <h2 className="text-xl font-bold text-[#0B2341]">
                    Amicus Guidance
                  </h2>
                </div>

                <div className="mt-5 space-y-4">
                  <Guide
                    title="What happens next?"
                    text="A bank officer will review your application and may run the Amicus Financial Twin analysis."
                  />
                  <Guide
                    title="Why safe loan may be lower?"
                    text="A lower amount can protect your business from repayment pressure during weak-sales months."
                  />
                  <Guide
                    title="What should you prepare?"
                    text="Keep trade license, bank statement, and supplier invoices ready."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
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
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#667085]">{title}</p>
      <p className={`mt-3 text-2xl font-bold ${teal ? "text-[#0E9F9A]" : gold ? "text-[#C9961A]" : "text-[#0B2341]"}`}>
        {value}
      </p>
    </div>
  );
}

function TimelineItem({
  icon: Icon,
  title,
  text,
  done = false,
}: {
  icon: typeof CheckCircle2;
  title: string;
  text: string;
  done?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${done ? "bg-[#E8F7F5]" : "bg-white"}`}>
        <Icon className={`h-5 w-5 ${done ? "text-[#0E9F9A]" : "text-[#667085]"}`} />
      </div>
      <div>
        <p className="text-sm font-bold text-[#0B2341]">{title}</p>
        <p className="mt-1 text-sm text-[#667085]">{text}</p>
      </div>
    </div>
  );
}

function Guide({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-white p-4">
      <p className="text-sm font-bold text-[#0B2341]">{title}</p>
      <p className="mt-1 text-sm leading-6 text-[#667085]">{text}</p>
    </div>
  );
}
