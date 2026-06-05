import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant?: "teal" | "navy";
};

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  variant = "teal",
}: MetricCardProps) {
  // Some cards need a darker icon background for visual balance.
  const isNavyVariant = variant === "navy";

  return (
    <div className="rounded-2xl border border-[#E5EAF0] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-5">
        {/* Icon badge */}
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            isNavyVariant ? "bg-[#0B2341]" : "bg-[#0E9F9A]"
          }`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>

        {/* Metric text */}
        <div>
          <p className="text-sm font-semibold text-[#0B2341]">{title}</p>

          <p className="mt-2 text-3xl font-bold text-[#0B2341]">{value}</p>

          {/* 
            Small trend line.
            For the MVP, this is static text. Later, it can come from real dashboard data.
          */}
          <p className="mt-2 text-xs font-medium text-[#0E9F9A]">
            ↑ {change} vs yesterday
          </p>
        </div>
      </div>
    </div>
  );
}


