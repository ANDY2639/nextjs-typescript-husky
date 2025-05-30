"use client";

import { ArrowLeftIcon, ArrowRighttIcon, CloseIcon, MenuIcon, SearchIcon } from "@/presentation/components/Icons";
import { clsx } from "clsx";
import { Footer } from "../Footer";
import { Menu } from "./components";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
  submenu?: MenuItem[];
}

interface SidebarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  isEcommerceOpen: boolean;
  pathname: string;
  toggleSidebar: () => void;
  toggleEcommerce: () => void;
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isSidebarOpen, isEcommerceOpen, pathname, toggleSidebar, toggleEcommerce, menuItems }) => {
  return (
    <div className="">
      {isMobile ? (
        <div onClick={toggleSidebar} className="fixed top-0 left-0 z-50 w-full bg-black p-3">
          <MenuIcon />
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className={clsx("fixed top-2 left-0 z-50 h-12 w-8 rounded-r-md border-t border-r border-b border-white bg-[#B8C0FB] p-2 text-white", {
            "left-[16rem]": isSidebarOpen,
          })}
          title={isSidebarOpen ? "Ocultar Sidebar" : "Mostrar Sidebar"}
        >
          {isSidebarOpen ? <ArrowLeftIcon className="h-5 w-5" /> : <ArrowRighttIcon className="h-5 w-5" />}
        </button>
      )}

      {isMobile && isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={toggleSidebar} />}

      {isSidebarOpen && (
        <aside
          className={clsx("fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-black p-4 text-white", {
            "left-16rem w-3/4": !isMobile && isSidebarOpen,
          })}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm">Módulos</h2>
            {isMobile && (
              <button onClick={toggleSidebar} className="text-white hover:text-gray-300 focus:outline-none" aria-label="Close sidebar">
                <CloseIcon className="h-6 w-6" fill="#FFFFFF" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-4 hidden">
              <div className="relative">
                <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full rounded-md border border-white bg-black py-2 pr-3 pl-10 text-white placeholder-gray-400 focus:border-[#6475F7] focus:outline-none"
                />
              </div>
            </div>
            <Menu
              isEcommerceOpen={isEcommerceOpen}
              pathname={pathname ?? ""}
              toggleSidebar={toggleSidebar}
              toggleEcommerce={toggleEcommerce}
              menuItems={menuItems}
            />
          </div>
          <Footer />
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
