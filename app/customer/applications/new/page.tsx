"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus2, HelpCircle, Loader2, ShieldCheck } from "lucide-react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { CustomerSidebar } from "@/components/customer/CustomerSidebar";

type ApplicationForm = {
  businessName: string;
  ownerName: string;
  businessType: string;
  location: string;
  requestedLoan: string;
  averageMonthlySales: string;
  existingEmi: string;
  seasonality: string;
  loanPurpose: string;
  documents: string[];
};

type CreateApplicationResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
  };
};

const DOCUMENT_OPTIONS = [
  "Trade License",
  "Bank Statement",
  "Supplier Invoice",
];

export default function NewCustomerApplicationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
    Demo-friendly default values.
    This helps the judge/customer submit a sample application quickly.
  */
  const [form, setForm] = useState<ApplicationForm>({
    businessName: "Rafi Khan Trading",
    ownerName: "Rafi Khan",
    businessType: "Retail Trading",
    location: "Dhaka, Bangladesh",
    requestedLoan: "1000000",
    averageMonthlySales: "360000",
    existingEmi: "8000",
    seasonality:
      "Sales increase during festival periods and slow down after season",
    loanPurpose: "Working capital support for inventory purchase",
    documents: ["Trade License", "Bank Statement", "Supplier Invoice"],
  });

  function updateField(field: keyof ApplicationForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleDocument(documentName: string) {
    setForm((current) => {
      const alreadySelected = current.documents.includes(documentName);

      return {
        ...current,
        documents: alreadySelected
          ? current.documents.filter((item) => item !== documentName)
          : [...current.documents, documentName],
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
      Prevent double submission if the user clicks multiple times.
    */
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/applications/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          customerEmail: "rafi@amicus.ai",
        }),
      });

      const result = (await response.json()) as CreateApplicationResponse;

      if (!response.ok || !result.success || !result.data?.id) {
        alert(result.message || "Failed to submit application.");
        return;
      }

      /*
        After successful submission, send the customer to their application page.
      */
      router.push(`/customer/applications/${result.data.id}`);
      router.refresh();
    } catch (error) {
      console.error("Customer application submission failed:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC]">
        <CustomerSidebar />

        <section className="ml-[230px] max-w-[calc(100vw-230px)] px-7 py-7">
          {/* Page heading */}
          <div>
            <h1 className="text-3xl font-bold text-[#0B2341]">
              New Loan Application
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Submit your application with Amicus-guided support.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            {/* Main application form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#0B2341]">
                Business Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Amicus uses these details to help the bank understand your
                business cashflow, loan purpose, and repayment capacity.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                  label="Business Name"
                  value={form.businessName}
                  onChange={(value) => updateField("businessName", value)}
                />

                <Input
                  label="Owner Name"
                  value={form.ownerName}
                  onChange={(value) => updateField("ownerName", value)}
                />

                <Input
                  label="Business Type"
                  value={form.businessType}
                  onChange={(value) => updateField("businessType", value)}
                />

                <Input
                  label="Location"
                  value={form.location}
                  onChange={(value) => updateField("location", value)}
                />

                <Input
                  label="Requested Loan Amount"
                  value={form.requestedLoan}
                  type="number"
                  onChange={(value) => updateField("requestedLoan", value)}
                />

                <Input
                  label="Average Monthly Sales"
                  value={form.averageMonthlySales}
                  type="number"
                  onChange={(value) =>
                    updateField("averageMonthlySales", value)
                  }
                />

                <Input
                  label="Existing EMI"
                  value={form.existingEmi}
                  type="number"
                  onChange={(value) => updateField("existingEmi", value)}
                />

                <Input
                  label="Loan Purpose"
                  value={form.loanPurpose}
                  onChange={(value) => updateField("loanPurpose", value)}
                />
              </div>

              <div className="mt-5">
                <label className="text-sm font-semibold text-[#0B2341]">
                  Seasonality / Business Pattern
                </label>

                <textarea
                  value={form.seasonality}
                  onChange={(event) =>
                    updateField("seasonality", event.target.value)
                  }
                  className="mt-2 min-h-28 w-full rounded-xl border border-[#D9E0EA] bg-white p-4 text-sm leading-6 text-[#0B2341] outline-none transition focus:border-[#0E9F9A]"
                  placeholder="Example: Sales increase during Eid and slow down after the season."
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-[#0B2341]">
                  Available Documents
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Select the documents you can provide. These help the bank
                  review your application fairly.
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {DOCUMENT_OPTIONS.map((documentName) => {
                    const selected = form.documents.includes(documentName);

                    return (
                      <button
                        key={documentName}
                        type="button"
                        onClick={() => toggleDocument(documentName)}
                        className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                          selected
                            ? "border-[#0E9F9A] bg-[#E8F7F5] text-[#0E9F9A]"
                            : "border-[#E5EAF0] bg-white text-[#667085] hover:border-[#0E9F9A]"
                        }`}
                      >
                        {documentName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2341] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#071A2F] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FilePlus2 className="h-4 w-4" />
                )}

                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>

            <ApplicationGuide />
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#0B2341]">{label}</label>

      <input
        value={value}
        type={type}
        min={type === "number" ? 0 : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-[#D9E0EA] bg-white px-4 text-sm text-[#0B2341] outline-none transition focus:border-[#0E9F9A]"
      />
    </div>
  );
}

function ApplicationGuide() {
  return (
    <aside className="space-y-5">
      <div className="rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 shrink-0 text-[#C9961A]" />

          <h2 className="text-xl font-bold text-[#0B2341]">
            Why these details?
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#667085]">
          Amicus explains why each field matters, so the customer understands
          the process instead of feeling rejected or confused.
        </p>

        <div className="mt-5 space-y-4">
          <Guide
            title="Requested Loan"
            text="Used to compare your request with your safe repayment capacity."
          />

          <Guide
            title="Monthly Sales"
            text="Helps Amicus estimate how much EMI your business can safely carry."
          />

          <Guide
            title="Seasonality"
            text="Important for businesses that earn more during festival or high-sales months."
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 shrink-0 text-[#0E9F9A]" />

          <h2 className="text-lg font-bold text-[#0B2341]">
            Customer Promise
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#667085]">
          Amicus explains what is needed and why. It helps the bank review your
          application fairly, but final approval remains with the bank.
        </p>
      </div>
    </aside>
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

