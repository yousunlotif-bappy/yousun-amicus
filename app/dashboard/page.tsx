export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] p-10">
      {/* 
        Dashboard welcome area.
        For now, we are using demo user name "Bappy".
        Later, this name will come from the login/session data.
      */}
      <section>
        <h1 className="text-3xl font-bold text-[#0B2341]">
          Welcome back, Bappy
        </h1>

        <p className="mt-2 text-[#667085]">
          Here&apos;s what&apos;s happening across your portfolio today.
        </p>
      </section>

      {/* 
        Temporary setup confirmation card.
        This card helps us confirm that the dashboard route is working properly.
        In the next step, we will replace this with the real dashboard layout.
      */}
      <section className="mt-8 rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#0B2341]">
          Step 1 setup complete
        </h2>

        <p className="mt-2 text-[#667085]">
          Next, we will build the professional dashboard layout based on your
          selected UI.
        </p>
      </section>
    </main>
  );
}


