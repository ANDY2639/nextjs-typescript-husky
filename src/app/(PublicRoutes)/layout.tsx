import OnboardingLayout from "@/presentation/components/Layouts/OnboardingLayout";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <OnboardingLayout>{children}</OnboardingLayout>
}
