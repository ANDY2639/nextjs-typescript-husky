'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useLoggedUser from "@/presentation/hooks/useLoggedUser"
import OnboardingLayout from "./OnboardingLayout"

const OnboardingLayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { isLogged } = useLoggedUser()
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    if (isLogged) {
      router.push("/")
    } else {
      setCheckingSession(false)
    }
  }, [isLogged, router])

  if (checkingSession) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-primary-500 font-bold">Cargando...</span>
      </div>
    )
  }

  return (
    <OnboardingLayout>{children}</OnboardingLayout>
  )
}

export default OnboardingLayoutContainer
