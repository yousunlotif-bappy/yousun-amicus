"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, PlayCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type AgentActionButtonsProps = {
  applicationId: string;
};

type ActionStatus = {
  type: "success" | "error" | "";
  message: string;
};

type AgentApiResponse = {
  success: boolean;
  message?: string;
};

export function AgentActionButtons({ applicationId }: AgentActionButtonsProps) {
  const router = useRouter();

  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [isCreatingRescue, setIsCreatingRescue] = useState(false);

  const [status, setStatus] = useState<ActionStatus>({
    type: "",
    message: "",
  });

  const isBusy = isRunningAnalysis || isCreatingRescue;

  async function runAmicusAnalysis() {
    /*
      Stop duplicate requests if the user double-clicks the button.
      This keeps the agent workflow clean and avoids repeated saves.
    */
    if (isBusy) return;

    try {
      setIsRunningAnalysis(true);
      setStatus({ type: "", message: "" });

      /*
        This endpoint runs the full Loan Review Agent workflow:
        Financial Twin → Future Mirror → Safe Loan → Reports.
      */
      const response = await fetch("/api/agent/loan-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
        }),
      });

      const result = (await response.json()) as AgentApiResponse;

      if (!response.ok || !result.success) {
        setStatus({
          type: "error",
          message: result.message || "Agent analysis failed.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          "Amicus analysis completed. Financial Twin, Future Mirror, reports, and recommendation were updated.",
      });

      /*
        Refresh the current page so the latest MongoDB data appears.
      */
      router.refresh();
    } catch (error) {
      console.error("Amicus analysis failed:", error);

      setStatus({
        type: "error",
        message: "Agent analysis failed. Please try again.",
      });
    } finally {
      setIsRunningAnalysis(false);
    }
  }

  async function createRescuePlan() {
    /*
      Rescue plan should not run while another agent task is already running.
    */
    if (isBusy) return;

    try {
      setIsCreatingRescue(true);
      setStatus({ type: "", message: "" });

      /*
        This endpoint creates the Rescue Before Default plan
        and saves it for the selected application.
      */
      const response = await fetch("/api/agent/rescue-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
        }),
      });

      const result = (await response.json()) as AgentApiResponse;

      if (!response.ok || !result.success) {
        setStatus({
          type: "error",
          message: result.message || "Rescue plan generation failed.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          "Rescue plan created. Early distress signals and recommended bank action were saved.",
      });

      router.refresh();
    } catch (error) {
      console.error("Rescue plan generation failed:", error);

      setStatus({
        type: "error",
        message: "Rescue plan generation failed. Please try again.",
      });
    } finally {
      setIsCreatingRescue(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={runAmicusAnalysis}
          disabled={isBusy}
          className="flex items-center gap-2 rounded-xl bg-[#0B2341] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#071A2F] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRunningAnalysis ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <PlayCircle className="h-4 w-4" />
          )}

          {isRunningAnalysis ? "Running Agent..." : "Run Amicus Analysis"}
        </button>

        <button
          type="button"
          onClick={createRescuePlan}
          disabled={isBusy}
          className="flex items-center gap-2 rounded-xl border border-[#C9961A] bg-[#FFFDF8] px-6 py-3 text-sm font-bold text-[#C9961A] shadow-sm transition hover:bg-[#FFF4D8] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isCreatingRescue ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}

          {isCreatingRescue ? "Creating Rescue..." : "Create Rescue Plan"}
        </button>
      </div>

      {/* Small status message after an agent action finishes */}
      {status.message ? (
        <div
          className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
            status.type === "success"
              ? "border border-[#BDE9E4] bg-[#E8F7F5] text-[#0B2341]"
              : "border border-red-100 bg-red-50 text-red-600"
          }`}
        >
          <CheckCircle2
            className={`mt-0.5 h-4 w-4 shrink-0 ${
              status.type === "success" ? "text-[#0E9F9A]" : "text-red-600"
            }`}
          />

          <span>{status.message}</span>
        </div>
      ) : null}
    </div>
  );
}

