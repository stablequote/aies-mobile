// context/AppContext.tsx
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  lastSync?: Date | null;
  setLastSync: (d: Date | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastSync, setLastSync] = useState<Date | null>(null);

  return <AppContext.Provider value={{ lastSync, setLastSync }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};
