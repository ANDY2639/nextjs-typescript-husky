"use client";

import { Avatar } from "@heroui/react";
import { clsx } from "clsx";

interface NavbarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  pathname: string;
  user: {
    name: string;
    avatar: string | null;
  };
}

const Navbar: React.FC<NavbarProps> = ({ isMobile, isSidebarOpen, pathname, user }) => {
  return (
    <nav
      className={clsx("fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b border-gray-300 bg-white px-4", {
        "top-14": isMobile,
        "ml-64": !isMobile && isSidebarOpen,
        "ml-0": isMobile || !isSidebarOpen,
      })}
    >
      <span className="ml-0 text-sm font-medium md:ml-10">{pathname}</span>

      <div className="flex items-center space-x-3">
        <Avatar name="U" />
        {!isMobile && <span className="text-sm font-medium">{user.name}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
