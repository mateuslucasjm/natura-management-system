import { useLayout } from "@/contexts/layoutContext";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import SidebarLogout from "./SidebarLogout";
import SidebarNavigation from "./SidebarNavigation";
import SidebarThemeToggle from "./SidebarThemeToggle";

interface SidebarContentProps {
  title?: string;
  collapsed?: boolean;
  collapsible?: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  title,
  collapsed = false,
  collapsible = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mobileOpen, toggleMobileOpen, toggleSidebarCollapsed } = useLayout();

  const handleNavigate = (path: string) => {
    navigate(path);

    if (mobileOpen) {
      toggleMobileOpen();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <SidebarHeader
        title={title}
        collapsed={collapsed}
        onToggle={collapsible ? toggleSidebarCollapsed : undefined}
      />
      <SidebarNavigation
        pathname={location.pathname}
        onNavigate={handleNavigate}
        collapsed={collapsed}
      />

      <Box sx={{ mt: "auto" }}>
        <SidebarThemeToggle collapsed={collapsed} />
        <SidebarLogout collapsed={collapsed} />
      </Box>
    </Box>
  );
};

export default SidebarContent;
