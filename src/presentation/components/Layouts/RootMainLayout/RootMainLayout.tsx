'use client'

import { useEffect } from "react"
import useLayoutLoader from "@/presentation/hooks/useLayoutLoader"

const RootMainLayout = ({ children }: { children: React.ReactNode }) => {
  const { loadLayout, isLoading } = useLayoutLoader()

  useEffect(() => {
    loadLayout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}

export default RootMainLayout
