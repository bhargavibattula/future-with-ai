"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Admin2FAGate from "@/components/admin/Admin2FAGate";

export default function AdminLoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    try {
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("future_ai_admin_session="));
      if (match) {
        router.push("/admin");
        return;
      }
    } catch (e) {
      // Cookie check fallback
    }

    if (isMounted) {
      setChecking(false);
    }

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FAFAFF] flex items-center justify-center text-xs font-bold text-[#8B7FE8]">
        Checking session...
      </div>
    );
  }

  return (
    <Admin2FAGate
      onAuthenticated={() => {
        router.push("/admin");
      }}
    />
  );
}
