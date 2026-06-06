"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

type ReportKind = "bank_memo" | "customer_summary" | "rescue_report";

type GeminiReportButtonProps = {
  applicationId: string;
  kind: ReportKind;
  label: string;
};

type GeminiReportResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
  };
};

export function GeminiReportButton({
  applicationId,
  kind,
  label,
}: GeminiReportButtonProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    /*
      Prevent double-click requests.
      This avoids sending the same Gemini generation request multiple times.
    */
    if (isGenerating) return;

    try {
      setIsGenerating(true);

      /*
        This endpoint asks the backend to:
        1. Fetch application data
        2. Run Amicus analysis
        3. Generate a Gemini report
        4. Save/update the report in MongoDB
      */
      const response = await fetch("/api/agent/gemini-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          kind,
        }),
      });

      const result = (await response.json()) as GeminiReportResponse;

      /*
        If the backend returns an error, show a simple user-friendly message.
      */
      if (!response.ok || !result.success || !result.data?.id) {
        alert(result.message || "Failed to generate Gemini report.");
        return;
      }

      /*
        After the report is generated, open the report detail page.
        refresh() makes sure the latest MongoDB data is shown.
      */
      router.push(`/reports/${result.data.id}`);
      router.refresh();
    } catch (error) {
      console.error("Gemini report generation failed:", error);
      alert("Failed to generate Gemini report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={isGenerating}
      className="flex w-full items-center justify-between rounded-xl border border-[#E5EAF0] p-4 text-left transition hover:border-[#0E9F9A] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <div className="flex items-center gap-3">
        {/* Icon box changes from sparkle to loader while Gemini is working */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F7F5]">
          {isGenerating ? (
            <Loader2 className="h-5 w-5 animate-spin text-[#0E9F9A]" />
          ) : (
            <Sparkles className="h-5 w-5 text-[#0E9F9A]" />
          )}
        </div>

        <div>
          <span className="block text-sm font-bold text-[#0B2341]">
            {isGenerating ? "Generating with Gemini..." : label}
          </span>

          <span className="text-xs text-[#667085]">
            Gemini-powered report
          </span>
        </div>
      </div>

      {/* Small AI badge for judge-facing clarity */}
      <span className="rounded-full bg-[#FFF7E8] px-3 py-1 text-xs font-bold text-[#C9961A]">
        AI
      </span>
    </button>
  );
}


