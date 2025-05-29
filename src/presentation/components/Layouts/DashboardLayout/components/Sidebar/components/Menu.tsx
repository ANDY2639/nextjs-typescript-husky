'use client'

import { ArrowDownIcon } from "@/presentation/components/Icons"
import Link from "next/link"

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

const Menu: React.FC<SidebarProps> = ({
  isEcommerceOpen,
  pathname,
  toggleSidebar,
  toggleEcommerce,
  menuItems
}) => {
    return (
        <nav>
            <ul>
            {menuItems.map((item) => (
                <li key={ item.path } className="mb-2">
                {item.submenu ? (
                    <>
                    <button
                        onClick={ toggleEcommerce }
                        className={`flex items-center w-full p-2 rounded text-left ${
                        pathname === item.path || item.submenu.some(sub => pathname === sub.path)
                            ? "bg-[#6475F7]"
                            : "hover:bg-[#6475F7]"
                        }`}
                    >
                        <item.icon className="w-5 h-5 mr-2" />
                        { item.name }
                        <ArrowDownIcon
                        className={`w-4 h-4 ml-auto transform ${ isEcommerceOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    { isEcommerceOpen && (
                        <ul className="pl-8 mt-1">
                        {item.submenu.map((subItem) => (
                            <li key={ subItem.path } className="mb-1">
                            <Link
                                href={ subItem.path }
                                onClick={ toggleSidebar }
                                className={`flex items-center p-2 rounded text-sm ${
                                pathname === subItem.path ? "bg-[#6475F74D]" : "hover:bg-[#6475F74D]"
                                }`}
                            >
                                { subItem.icon && <subItem.icon className="w-4 h-4 mr-2" />}
                                { subItem.name }
                            </Link>
                            </li>
                        ))}
                        </ul>
                    )}
                    </>
                ) : (
                    <Link
                    href={ item.path }
                    onClick={ toggleSidebar }
                    className={`flex items-center p-2 rounded ${
                        pathname === item.path ? "bg-[#6475F7]" : "hover:bg-[#6475F7]"
                    }`}
                    >
                    <item.icon className="w-5 h-5 mr-2" />
                    { item.name }
                    </Link>
                )}
                </li>
            ))}
            </ul>
        </nav>
    )
}
export default Menu;