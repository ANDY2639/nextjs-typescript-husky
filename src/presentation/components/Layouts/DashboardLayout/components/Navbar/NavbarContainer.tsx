'use client'

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import useIsMobile from "@/presentation/hooks/useIsMobile";

interface NavbarContainerProps {
  isSidebarOpen: boolean;
}

const NavbarContainer: React.FC<NavbarContainerProps> = ({ isSidebarOpen }) => {
  const pathname = usePathname();
  const { isMobile } = useIsMobile();

  const formatPath = ( path: string ): string => {
    if ( path === "/" ) return isMobile ? "Inicio" : " Inicio";
    const segments = path
      .split("/")
      .filter(segment => segment)
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
    if (isMobile) {
      return segments[segments.length - 1] || ""
    }else{
      return segments.join(" | ");
    }
  };

  const user = {
    name: "User",
    avatar: null
  };

  return (
    <Navbar
      isMobile={ isMobile }
      isSidebarOpen={ isSidebarOpen }
      pathname={ formatPath(pathname ?? "") }
      user={ user }
    />
  );
};

export default NavbarContainer;
