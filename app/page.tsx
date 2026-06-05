import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
      {/* 
        Simple landing card for the project.
        We keep this page clean because the main product experience starts from the dashboard.
      */}
      <div className="w-full max-w-md rounded-3xl border border-[#E5EAF0] bg-white p-8 text-center shadow-sm">
        {/* Project logo */}
        <img
          src="/logo.png"
          alt="YOUSUN Amicus Logo"
          className="mx-auto mb-6 h-28 w-auto"
        />

        {/* Project name */}
        <h1 className="text-3xl font-bold text-[#0B2341]">
          YOUSUN Amicus
        </h1>

        {/* Short project identity line */}
        <p className="mt-3 text-sm leading-6 text-[#667085]">
          Financial Twin Agent for Fair Lending and Rescue Before Default.
        </p>

        {/* 
          Temporary dashboard button.
          Later, this will go to the login page first, then the dashboard.
        */}
        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-xl bg-[#0B2341] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#071A2F]"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}


