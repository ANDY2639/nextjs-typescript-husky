"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/presentation/hooks/useStore";

const privateRoutes = [/^\/$/, /^\/users$/, /^\/orders$/, /^\/ecommerce\/products$/];

const useLoggedUser = () => {
  const user = useAppSelector((state) => state.user);
  const pathname = usePathname();

  const isPrivateRouteAndNotLoggedIn = useMemo(() => {
    const isPrivate = privateRoutes.some((regex) => regex.test(pathname));
    return isPrivate && !user.isLoggedIn;
  }, [user.isLoggedIn, pathname]);

  return {
    isPrivateRouteAndNotLoggedIn,
    isLogged: user.isLoggedIn,
  };
};

export default useLoggedUser;
