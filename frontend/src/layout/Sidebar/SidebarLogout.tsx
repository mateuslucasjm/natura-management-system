import { AuthContext } from "@/contexts/authContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useContext } from "react";

interface SidebarLogoutProps {
  collapsed?: boolean;
}

const SidebarLogout: React.FC<SidebarLogoutProps> = ({ collapsed = false }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext not found");
  }

  const { handleLogout } = authContext;

  return (
    <Tooltip title={collapsed ? "Sair" : ""} placement="right" arrow>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          borderRadius: 3,
          mx: 1,
          mb: 1.5,
          minHeight: 48,
          justifyContent: collapsed ? "center" : "initial",
          px: collapsed ? 1 : 3,
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed ? 0 : 40,
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          <ExitToAppIcon />
        </ListItemIcon>

        {!collapsed && (
          <ListItemText
            primary="Log-out"
            sx={{ textAlign: "center", flex: 1 }}
          />
        )}
      </ListItemButton>
    </Tooltip>
  );
};

export default SidebarLogout;
