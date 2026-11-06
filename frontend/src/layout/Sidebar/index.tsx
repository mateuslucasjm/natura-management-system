import { useLayout } from "@/contexts/layoutContext";
import { Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  drawerWidth: number;
  title?: string;
}

const COLLAPSED_WIDTH = 76;

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { mobileOpen, toggleMobileOpen, sidebarCollapsed } = useLayout();

  const currentWidth = sidebarCollapsed ? COLLAPSED_WIDTH : drawerWidth;

  const transition = theme.transitions.create("width", {
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 400,
  });

  const paperSx = {
    width: isMobile
      ? `min(${drawerWidth}px, calc(100vw - 48px))`
      : currentWidth,
    boxSizing: "border-box",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRight: "none",
    boxShadow: "none",
    transition,
  };

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobileOpen}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: paperSx }}
      >
        <SidebarContent title={title} />
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open
      PaperProps={{ sx: paperSx }}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition,
      }}
    >
      <SidebarContent title={title} collapsed={sidebarCollapsed} />
    </Drawer>
  );
};

export default Sidebar;
