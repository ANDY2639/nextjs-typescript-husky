"use client";

import { ArrowDownIcon } from "@/presentation/components/Icons";
import Link from "next/link";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
  submenu?: MenuItem[];
}

interface SidebarProps {
  isEcommerceOpen: boolean;
  pathname: string;
  toggleSidebar: () => void;
  toggleEcommerce: () => void;
  menuItems: MenuItem[];
}

const Menu: React.FC<SidebarProps> = ({ isEcommerceOpen, pathname, toggleSidebar, toggleEcommerce, menuItems }) => {
  return (
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            {item.submenu ? (
              <>
                <button
                  onClick={toggleEcommerce}
                  className={`flex w-full items-center rounded p-2 text-left ${
                    pathname === item.path || item.submenu.some((sub) => pathname === sub.path) ? "bg-[#6475F7]" : "hover:bg-[#6475F7]"
                  }`}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                  <ArrowDownIcon className={`ml-auto h-4 w-4 transform ${isEcommerceOpen ? "rotate-180" : ""}`} />
                </button>
                {isEcommerceOpen && (
                  <ul className="mt-1 pl-8">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.path} className="mb-1">
                        <Link
                          href={subItem.path}
                          onClick={toggleSidebar}
                          className={`flex items-center rounded p-2 text-sm ${pathname === subItem.path ? "bg-[#6475F74D]" : "hover:bg-[#6475F74D]"}`}
                        >
                          {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={item.path}
                onClick={toggleSidebar}
                className={`flex items-center rounded p-2 ${pathname === item.path ? "bg-[#6475F7]" : "hover:bg-[#6475F7]"}`}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Menu;
