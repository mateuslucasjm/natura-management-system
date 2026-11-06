import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface LayoutContextType {
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
  sidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  mobileOpen: false,
  toggleMobileOpen: () => {},
  sidebarCollapsed: false,
  toggleSidebarCollapsed: () => {},
});

export const useLayout = () => useContext(LayoutContext);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleMobileOpen = () => setMobileOpen((prev) => !prev);
  const toggleSidebarCollapsed = () => setSidebarCollapsed((prev) => !prev);

  return (
    <LayoutContext.Provider
      value={{
        mobileOpen,
        toggleMobileOpen,
        sidebarCollapsed,
        toggleSidebarCollapsed,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
