'use client'

import { 
  ArrowLeftIcon, 
  ArrowRighttIcon, 
  CloseIcon, 
  MenuIcon, 
  SearchIcon 
} from "@/presentation/components/Icons";
import { clsx } from "clsx"
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

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  isSidebarOpen,
  isEcommerceOpen,
  pathname,
  toggleSidebar,
  toggleEcommerce,
  menuItems
}) => {

  return (
    <div className="">
      {isMobile ? (
        <div
          onClick={ toggleSidebar }
          className="fixed top-0 left-0 w-full bg-black p-3 z-50"
        >
          <MenuIcon />
        </div>
      ) : (
        <button
          onClick={ toggleSidebar }
          className={
            clsx(
              "fixed top-2 z-50 p-2 bg-[#B8C0FB] text-white rounded-r-md border-r border-t border-b border-white left-0 w-8 h-12",
              {
                "left-[16rem]": isSidebarOpen
              }
            )
          }
          title={ isSidebarOpen ? "Ocultar Sidebar" : "Mostrar Sidebar"}
        >
          { isSidebarOpen ? (
            <ArrowLeftIcon className="w-5 h-5" />
          ) : (
            <ArrowRighttIcon className="w-5 h-5" />
          )}
        </button>
      )}

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={ toggleSidebar } 
        />
      )}

      {isSidebarOpen && (
        <aside
          className={
            clsx(
              "bg-black text-white h-screen fixed p-4 flex flex-col z-50 left-0 w-64 top-0", 
              {
                "left-16rem w-3/4": !isMobile && isSidebarOpen
              }
            )
          }
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm">Módulos</h2>
            { isMobile && (
              <button
                onClick={ toggleSidebar }
                className="text-white hover:text-gray-300 focus:outline-none"
                aria-label="Close sidebar"
              >
                <CloseIcon className="w-6 h-6" fill="#FFFFFF" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-4 hidden">
              <div className="relative">
                <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full pl-10 pr-3 py-2 bg-black border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#6475F7]"
                />
              </div>
            </div>
            <Menu 
              isEcommerceOpen={ isEcommerceOpen }
              pathname={ pathname ?? "" }
              toggleSidebar={ toggleSidebar }
              toggleEcommerce={ toggleEcommerce }
              menuItems={ menuItems }
            />
          </div>
          <Footer />
        </aside>
      )}
    </div>
  );
};

export default Sidebar;