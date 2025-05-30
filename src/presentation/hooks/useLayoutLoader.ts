"use client";

import { useCallback, useState } from "react";
import { useAppDispatch } from "./useStore";
import container from "@/presentation/config/inversify.config";
import UseCaseTypes from "@/domain/entity/Types/UseCaseTypes";
import { startSession } from "@/presentation/redux/features/user/userSlice";
import InitialLoadUseCase from "@/domain/interactors/InitialLoad/InitialLoadUseCase";

const useLayoutLoader = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const initialLoadUC = container.get<InitialLoadUseCase>(UseCaseTypes.InitialLoadUseCase);

  const loadLayout = useCallback(async () => {
    setIsLoading(true);
    try {
      const userState = await initialLoadUC.startSession();
      dispatch(startSession(userState));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, loadLayout };
};

export default useLayoutLoader;
