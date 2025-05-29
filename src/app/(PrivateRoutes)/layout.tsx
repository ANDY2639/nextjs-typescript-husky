import DashboardLayout from "@/presentation/components/Layouts/DashboardLayout"

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DashboardLayout>{children}</DashboardLayout>
}
