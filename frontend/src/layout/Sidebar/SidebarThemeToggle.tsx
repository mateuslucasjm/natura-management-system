import { useThemeContext } from "@/contexts/themeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Tooltip,
} from "@mui/material";

interface SidebarThemeToggleProps {
  collapsed?: boolean;
}

const SidebarThemeToggle: React.FC<SidebarThemeToggleProps> = ({
  collapsed = false,
}) => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <Tooltip
      title={collapsed ? (darkMode ? "Modo escuro" : "Modo claro") : ""}
      placement="right"
      arrow
    >
      <ListItemButton
        onClick={toggleDarkMode}
        sx={{
          borderRadius: 3,
          my: 0.5,
          mx: 1,
          minHeight: 48,
          justifyContent: collapsed ? "center" : "initial",
          px: collapsed ? 1 : 2,
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed ? 0 : 40,
            ml: collapsed ? 0 : 1.5,
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </ListItemIcon>

        {!collapsed && (
          <>
            <ListItemText
              primary={darkMode ? "Modo Escuro" : "Modo Claro"}
              sx={{ ml: 0.5 }}
            />

            <Switch
              checked={darkMode}
              onClick={(event) => event.stopPropagation()}
              onChange={toggleDarkMode}
            />
          </>
        )}
      </ListItemButton>
    </Tooltip>
  );
};

export default SidebarThemeToggle;
