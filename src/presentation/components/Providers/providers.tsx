"use client";

import { MswProvider } from "@/mocks/MswProvider";
import { store } from "@/presentation/config/store";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Suspense } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <Suspense>
        <Provider store={store}>
          <MswProvider>
            <ToastProvider
              placement="top-right"
              toastProps={{
                shouldShowTimeoutProgress: true,
                classNames: {
                  description: "text-small pr-4",
                  closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
                  closeIcon: "bg-transparent border-0 border-none p-0",
                },
              }}
            />
            {children}
          </MswProvider>
        </Provider>
      </Suspense>
    </HeroUIProvider>
  );
};

export default Providers;
