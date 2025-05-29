import { useEffect, useState } from "react"
import { NavbarContainer } from "./components/Navbar";
import { SidebarContainer } from "./components/Sidebar";
import useDeviceSize from "@/presentation/hooks/useIsMobile";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isLargeScreen } = useDeviceSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setIsSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);
  

  return (
    <div className={`${isMobile} ? '' :'flex min-h-screen'`}>
      <SidebarContainer
        setIsSidebarOpen={ setIsSidebarOpen } 
      />
      <NavbarContainer 
        isSidebarOpen={isSidebarOpen} 
      />
      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout