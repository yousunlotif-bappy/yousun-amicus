"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  /*
    At first, we do not know if the user is logged in or not.
    So we show a small checking screen before showing the protected page.
  */
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    /*
      This is a simple MVP auth check.
      Later, we will replace this with a real backend/JWT/session check.
    */
    const savedUser = localStorage.getItem("yousun_amicus_user");

    // If no user data is found, send the user back to the login page.
    if (!savedUser) {
      router.push("/login");
      return;
    }

    // User data exists, so the protected page can be shown.
    setIsCheckingSession(false);
  }, [router]);

  /*
    Small loading screen while the browser checks localStorage.
    This prevents the dashboard from flashing before auth is verified.
  */
  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
        <div className="rounded-2xl border border-[#E5EAF0] bg-white px-8 py-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-[#0B2341]">
            Checking secure session...
          </p>

          <p className="mt-2 text-xs text-[#667085]">
            Please wait while YOUSUN Amicus verifies your access.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}

