"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLoggedUser from "@/presentation/hooks/useLoggedUser";
import DashboardLayout from "./DashboardLayout";

const DashboardLayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLogged } = useLoggedUser();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    } else {
      setCheckingSession(false);
    }
  }, [isLogged, router]);

  if (checkingSession) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-primary-500 font-bold">Cargando...</span>
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutContainer;
