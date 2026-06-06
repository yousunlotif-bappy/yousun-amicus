import Link from "next/link";

export default function HomePage() {
  const demoSteps = [
    "Bank officer logs in",
    "Opens Rahim Fashion House application",
    "Runs Financial Twin + Future Mirror",
    "Generates Gemini-powered reports",
    "Creates Rescue Before Default plan",
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-10">
      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E5EAF0] bg-white shadow-sm lg:grid-cols-[1fr_0.9fr]">
        {/* Left side: product story */}
        <div className="flex flex-col justify-between p-10">
          <div>
            {/* Brand block */}
            <img
              src="/logo.png"
              alt="YOUSUN Amicus Logo"
              className="h-28 w-auto"
            />

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#0B2341]">
              YOUSUN <span className="text-[#0E9F9A]">Amicus</span>
            </h1>

            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#667085]">
              Financial Twin Agent for Fair Lending
            </p>

            <div className="mt-4 h-[2px] w-16 bg-[#C9961A]" />

            {/* Main pitch */}
            <h2 className="mt-12 max-w-2xl text-5xl font-bold leading-tight text-[#0B2341]">
              Simulate before lending. Report with fairness. Rescue before
              default.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#667085]">
              A secure bank-facing AI agent that builds borrower financial
              twins, simulates future repayment risk, recommends safer loan
              structures, and creates rescue-before-default reports.
            </p>

            {/* Main actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-[#0B2341] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#071A2F]"
              >
                Login
              </Link>

              <Link
                href="/applications/APP-001"
                className="rounded-xl border border-[#0E9F9A] px-6 py-3 text-sm font-bold text-[#0E9F9A] transition hover:bg-[#E8F7F5]"
              >
                View Demo Application
              </Link>
            </div>
          </div>

          {/* Demo login helper */}
          <p className="mt-10 text-xs leading-6 text-[#667085]">
            Bank demo:{" "}
            <span className="font-semibold text-[#0B2341]">
              bappy@amicus.ai
            </span>{" "}
            / <span className="font-semibold text-[#0B2341]">demo123</span>
            <span className="mx-2 text-[#C9961A]">•</span>
            Customer demo:{" "}
            <span className="font-semibold text-[#0B2341]">
              rafi@amicus.ai
            </span>{" "}
            / <span className="font-semibold text-[#0B2341]">demo123</span>
          </p>
        </div>

        {/* Right side: demo workflow */}
        <div className="bg-[#F8FAFC] p-8">
          <div className="h-full rounded-3xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-[#0B2341]">Demo Workflow</p>

            <div className="mt-6 space-y-4">
              {demoSteps.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-[#E5EAF0] bg-[#F8FAFC] p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F7F5] text-sm font-bold text-[#0E9F9A]">
                    {index + 1}
                  </div>

                  <p className="text-sm font-semibold text-[#0B2341]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Judge-facing explanation */}
            <div className="mt-8 rounded-2xl border border-[#F0E3C4] bg-[#FFFDF8] p-5">
              <p className="text-sm font-bold text-[#0B2341]">
                Judge-facing focus
              </p>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                This project shows a real multi-step agent workflow using
                MongoDB data, agent calculations, Gemini report generation, and
                rescue-before-default actions.
              </p>
            </div>

            {/* Small feature summary */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <FeaturePill text="MongoDB-backed borrower memory" />
              <FeaturePill text="Gemini-powered report generation" />
              <FeaturePill text="Responsible AI decision-support" />
              <FeaturePill text="Customer application submission portal" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturePill({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-[#E5EAF0] bg-white px-4 py-3 text-sm font-semibold text-[#0B2341]">
      {text}
    </div>
  );
}

