import { Users } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";

export default function CustomersPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        {/* 
          Fixed sidebar.
          This keeps the navigation experience consistent across the app.
        */}
        <Sidebar />

        {/* 
          Main page content.
          Sidebar width is 230px, so the content starts after that space.
        */}
        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          <div className="rounded-2xl border border-[#E5EAF0] bg-white p-8 shadow-sm">
            {/* Page title block */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5]">
                <Users className="h-7 w-7 text-[#0E9F9A]" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-[#0B2341]">
                  Customers
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  Borrower profiles and customer financial twins will appear
                  here.
                </p>
              </div>
            </div>

            {/* 
              Demo guidance.
              This keeps the page useful even before full customer CRM features are added.
            */}
            <div className="mt-8 rounded-xl bg-[#F8FAFC] p-5 text-sm leading-6 text-[#667085]">
              Demo focus: use{" "}
              <strong className="font-bold text-[#0B2341]">Applications</strong>{" "}
              to open Rahim Fashion House and run the Amicus agent workflow.
            </div>

            {/* Future module preview */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <PreviewCard
                title="Customer Profiles"
                description="View borrower identity, business details, and loan history."
              />

              <PreviewCard
                title="Financial Twins"
                description="Track customer cashflow rhythm, debt stress, and repayment capacity."
              />

              <PreviewCard
                title="Rescue History"
                description="Review support actions before a borrower reaches default."
              />
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function PreviewCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#E5EAF0] bg-white p-5">
      <p className="text-sm font-bold text-[#0B2341]">{title}</p>

      <p className="mt-2 text-sm leading-6 text-[#667085]">{description}</p>
    </div>
  );
}


