import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  Database,
  FileText,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type TimelineItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/*
  Agent Activity Timeline

  This timeline explains how YOUSUN Amicus completes the loan review workflow.
  It is mainly useful for the application detail page and judge-facing demo,
  because it shows that the product is not just a static dashboard.
*/
const timeline: TimelineItem[] = [
  {
    title: "Application data fetched",
    description: "MongoDB returned borrower profile and business cashflow.",
    icon: Database,
  },
  {
    title: "Financial Twin DNA built",
    description: "Amicus calculated repayment capacity and cashflow rhythm.",
    icon: Sparkles,
  },
  {
    title: "Future Mirror simulated",
    description: "Growth, steady, and stress scenarios were generated.",
    icon: LineChart,
  },
  {
    title: "Debt-Trap Shield applied",
    description: "Safe loan amount and risky zone were identified.",
    icon: ShieldCheck,
  },
  {
    title: "Reports prepared",
    description: "Bank memo, customer summary, and rescue report are ready.",
    icon: FileText,
  },
];

export function AgentActivityTimeline() {
  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
      {/* Section heading */}
      <div>
        <h2 className="text-lg font-bold text-[#0B2341]">
          Agent Activity Timeline
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#667085]">
          This shows how YOUSUN Amicus completes the loan review workflow.
        </p>
      </div>

      {/* Timeline steps */}
      <div className="mt-6 space-y-5">
        {timeline.map((item, index) => {
          const Icon = item.icon;
          const isLastItem = index === timeline.length - 1;

          return (
            <div key={item.title} className="flex gap-4">
              {/* Icon and vertical connector */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7F5]">
                  <Icon className="h-5 w-5 text-[#0E9F9A]" />
                </div>

                {!isLastItem ? (
                  <div className="mt-2 h-8 w-px bg-[#E5EAF0]" />
                ) : null}
              </div>

              {/* Step content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0B2341]">
                    {item.title}
                  </h3>

                  <CheckCircle2 className="h-4 w-4 text-[#0E9F9A]" />
                </div>

                <p className="mt-1 text-sm leading-6 text-[#667085]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


