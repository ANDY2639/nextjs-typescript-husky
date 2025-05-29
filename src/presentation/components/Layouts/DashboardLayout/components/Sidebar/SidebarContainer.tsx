'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import {
  EcommerceIcon,
  HouseIcon,
  OrdersIcon,
  ProductsIcon,
  UsersIcon
} from "@/presentation/components/Icons";
import useIsMobile from "@/presentation/hooks/useIsMobile";

interface SidebarContainerProps {
  setIsSidebarOpen: ( open: boolean ) => void;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ setIsSidebarOpen }) => {
  const pathname = usePathname();
  const [ isEcommerceOpen, setIsEcommerceOpen ] = useState<boolean>(false);
  const [ isSidebarOpen, setIsSidebarOpenLocal ] = useState<boolean>(true);
  const { isMobile } = useIsMobile();
  
  useEffect(() => {
    if (window.innerWidth < 768){
      setIsSidebarOpenLocal(false);
    }
    else{
      setIsSidebarOpenLocal(true);
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpenLocal( !isSidebarOpen );
    setIsSidebarOpen( !isSidebarOpen );
  };

  const toggleEcommerce = () => {
    setIsEcommerceOpen( !isEcommerceOpen );
  };

  const menuItems = [
    { name: "Inicio", path: "/", icon: HouseIcon },
    { name: "Usuarios", path: "/users", icon: UsersIcon },
    {
      name: "Ecommerce",
      path: "/ecommerce",
      icon: EcommerceIcon,
      submenu: [
        { name: "Productos", path: "/ecommerce/products", icon: ProductsIcon }
      ]
    },
    { name: "Órdenes", path: "/orders", icon: OrdersIcon }
  ];

  return (
    <Sidebar
      isMobile={ isMobile }
      isSidebarOpen={ isSidebarOpen }
      isEcommerceOpen={ isEcommerceOpen }
      pathname={ pathname ?? "" }
      toggleSidebar={ toggleSidebar }
      toggleEcommerce={ toggleEcommerce }
      menuItems={ menuItems }
    />
  );
};

export default SidebarContainer;
