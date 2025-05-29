'use client'

import { VerifyIcon } from "@/presentation/components/Icons"
import { useAppSelector } from "@/presentation/hooks/useStore"
import IconMessage from "@/presentation/components/Modals/IconMessage"
import LocalStorageHelper, { StorageKeys } from "@/presentation/helpers/LocalStorageHelper"
import Home from "./Home"

const HomeContainer = () => {
  const { name } = useAppSelector(state => state.user)
  const isFirstLoginCompleted = LocalStorageHelper.getItem(StorageKeys.FIRST_LOGIN)
  const openFirstLoginModal = isFirstLoginCompleted && isFirstLoginCompleted.isFirstLogin && !isFirstLoginCompleted.isCompleted

  const handleBeforeClose = () => {
    LocalStorageHelper.setItem(StorageKeys.FIRST_LOGIN, {
      ...isFirstLoginCompleted,
      isCompleted: true,
    })
  }

  return (
    <>
      <Home />
      <IconMessage
        open={openFirstLoginModal}
        icon={<VerifyIcon />}
        title={`¡Te damos la bienvenida ${name}!`}
        description="Nos alegra tenerte aquí, comienza la experiencia desde tu panel o explora lo nuevo que tenemos para ti."
        btnText="Empezar"
        onBeforeClose={handleBeforeClose}
      />
    </>
  )
}

export default HomeContainer
