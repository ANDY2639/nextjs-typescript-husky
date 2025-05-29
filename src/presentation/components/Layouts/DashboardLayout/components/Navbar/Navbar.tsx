'use client'

import { Avatar } from "@heroui/react";
import { clsx } from "clsx"

interface NavbarProps {
  isMobile: boolean
  isSidebarOpen: boolean;
  pathname: string;
  user: {
    name: string;
    avatar: string | null;
  };
}

const Navbar: React.FC<NavbarProps> = ({isMobile, isSidebarOpen, pathname, user }) => {  

  return (
    <nav 
      className={
        clsx(
        "fixed left-0 right-0 h-16 flex items-center justify-between px-4 border-b border-gray-300 z-30 bg-white top-0",
        {
          "top-14": isMobile,
          "ml-64": !isMobile && isSidebarOpen,
          "ml-0": isMobile || !isSidebarOpen,
        }
      )}
    >
      <span className="text-sm font-medium ml-0 md:ml-10">{pathname}</span>

      <div className="flex items-center space-x-3">
        <Avatar name="U" />        
        {!isMobile && (
          <span className="text-sm font-medium">{user.name}</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;