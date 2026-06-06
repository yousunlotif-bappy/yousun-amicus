import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

/*
  Demo Guide Card

  This card gives judges or demo viewers a clear starting point.
  Instead of exploring the whole app randomly, they can jump directly
  into the main YOUSUN Amicus workflow.
*/

const demoHighlights = [
  "Open Rahim Fashion House application",
  "Run Amicus Analysis",
  "Generate Gemini-powered reports",
  "Create a rescue-before-default plan",
];

export function DemoGuideCard() {
  return (
    <div className="mt-6 rounded-2xl border border-[#0E9F9A] bg-[#E8F7F5] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-5">
        {/* Left side: demo explanation */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
            <PlayCircle className="h-7 w-7 text-[#0E9F9A]" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2341]">
              Demo-Ready Agent Flow
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#667085]">
              Follow the main workflow: {demoHighlights.join(", ")}.
            </p>
          </div>
        </div>

        {/* Right side: direct demo action */}
        <Link
          href="/applications/APP-001"
          className="flex items-center gap-2 rounded-xl bg-[#0B2341] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#071A2F]"
        >
          Start Demo Flow
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

