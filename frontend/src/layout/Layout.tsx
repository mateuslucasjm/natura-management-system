import { AuthProvider } from "@/contexts/authContext";
import { useLayout } from "@/contexts/layoutContext";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const drawerWidth = 270;

const Layout: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { sidebarCollapsed } = useLayout();

  const location = useLocation();
  const hideSidebarRoutes = ["/auth/login", "/auth/register"];

  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <CssBaseline />

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {showSidebar && <Sidebar drawerWidth={drawerWidth} title=" " />}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            minHeight: "100vh",
            p: showSidebar
              ? {
                  xs: 2.5,
                  sm: 2.5,
                  md: "25px 30px 15px 15px",
                }
              : 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </AuthProvider>
  );
};

export default Layout;
