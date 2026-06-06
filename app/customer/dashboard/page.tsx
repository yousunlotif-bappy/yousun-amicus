import { ArrowRight, FilePlus2, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { CustomerSidebar } from "@/components/customer/CustomerSidebar";
import { getAllApplicationsFromDb } from "@/lib/db-applications";

export const dynamic = "force-dynamic";

export default async function CustomerDashboardPage() {
  /*
    Demo customer email.
    Later, this can come from a real authenticated user session.
  */
  const customerEmail = "rafi@amicus.ai";

  /*
    Fresh MongoDB data will be read on every request because this page is force-dynamic.
  */
  const applications = await getAllApplicationsFromDb();

  const customerApplications = applications.filter(
    (application) => application.customerEmail === customerEmail
  );

  const pendingApplications = customerApplications.filter(
    (application) => application.status === "AI Review Pending"
  );

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <CustomerSidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          {/* Page header */}
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold text-[#0B2341]">
                Welcome, Rafi Khan
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Submit your loan application and track your status with Amicus
                guidance.
              </p>
            </div>

            <Link
              href="/customer/applications/new"
              className="flex items-center gap-2 rounded-xl bg-[#0B2341] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#071A2F]"
            >
              <FilePlus2 className="h-4 w-4" />
              New Application
            </Link>
          </div>

          {/* Customer status summary */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <StatusCard
              title="My Applications"
              value={String(customerApplications.length)}
            />

            <StatusCard
              title="AI Review Pending"
              value={String(pendingApplications.length)}
            />

            <StatusCard title="Guided Documents" value="3" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            {/* Customer application list */}
            <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#0B2341]">
                    My Applications
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    Applications submitted from your customer portal.
                  </p>
                </div>

                <span className="rounded-full bg-[#E8F7F5] px-4 py-2 text-xs font-bold text-[#0E9F9A]">
                  Customer View
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {customerApplications.length > 0 ? (
                  customerApplications.map((application) => (
                    <Link
                      key={application.id}
                      href={`/customer/applications/${application.id}`}
                      className="flex items-center justify-between rounded-2xl border border-[#E5EAF0] p-5 transition hover:border-[#0E9F9A] hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5]">
                          <FileText className="h-6 w-6 text-[#0E9F9A]" />
                        </div>

                        <div>
                          <p className="font-bold text-[#0B2341]">
                            {application.businessName}
                          </p>

                          <p className="mt-1 text-sm text-[#667085]">
                            {application.id} • {application.status}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="h-5 w-5 text-[#0E9F9A]" />
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#D9E0EA] p-8 text-center">
                    <p className="text-sm font-semibold text-[#0B2341]">
                      No application yet
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                      Create your first loan application with guided support
                      from Amicus.
                    </p>

                    <Link
                      href="/customer/applications/new"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0B2341] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#071A2F]"
                    >
                      <FilePlus2 className="h-4 w-4" />
                      Start Application
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <AmicusDocumentGuide />
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function StatusCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#667085]">{title}</p>

      <p className="mt-3 text-3xl font-bold text-[#0B2341]">{value}</p>

      <p className="mt-2 text-xs font-bold text-[#0E9F9A]">
        Customer portal
      </p>
    </div>
  );
}

function AmicusDocumentGuide() {
  return (
    <div className="rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 shrink-0 text-[#C9961A]" />

        <h2 className="text-xl font-bold text-[#0B2341]">Amicus Guide</h2>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#667085]">
        These documents help the bank understand your business clearly and
        review your application fairly.
      </p>

      <div className="mt-6 space-y-4">
        <GuideItem
          title="Trade License"
          text="Shows the bank that your business is legally registered."
        />

        <GuideItem
          title="Bank Statement"
          text="Helps the bank understand your real cashflow and sales rhythm."
        />

        <GuideItem
          title="Supplier Invoice"
          text="Shows business activity, purchase cycle, and working capital need."
        />
      </div>
    </div>
  );
}

function GuideItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-white p-4">
      <p className="text-sm font-bold text-[#0B2341]">{title}</p>

      <p className="mt-1 text-sm leading-6 text-[#667085]">{text}</p>
    </div>
  );
}

