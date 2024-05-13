import React, { createContext, useContext, useEffect, useState } from "react";
import {  InitialContextType } from "../types";
import { useGetInitialAsset } from "../lib/tanstack/queries";

const InitialContext = createContext<InitialContextType | undefined>(undefined);

export const InitialProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialValue, setInitialValue] = useState<
    InitialContextType | undefined
  >(undefined);

  const { data, isPending } = useGetInitialAsset();

  useEffect(() => {
    if (!isPending) {
      setInitialValue({
        category: data,
      });
    }
  }, [isPending]);

  return (
    <InitialContext.Provider value={initialValue}>
      {children}
    </InitialContext.Provider>
  );
};

export const useInitialContext = () => useContext(InitialContext);
