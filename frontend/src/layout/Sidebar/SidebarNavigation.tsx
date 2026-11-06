import { routes } from "@/routes/routes";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SidebarNavigationProps {
  pathname: string;
  onNavigate: (path: string) => void;
  collapsed?: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  pathname,
  onNavigate,
  collapsed = false,
}) => {
  const theme = useTheme();

  return (
    <List sx={{ flexGrow: 1, px: collapsed ? 0.5 : 0 }}>
      {routes
        .filter((route) => route.sidebar !== false)
        .map((route) => {
          const selected =
            pathname === route.path ||
            (route.path !== "/painel" && pathname.startsWith(route.path));

          return (
            <Tooltip
              key={route.path}
              title={collapsed ? route.name : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                onClick={() => onNavigate(route.path)}
                selected={selected}
                sx={{
                  borderRadius: 3,
                  mx: collapsed ? 1 : 1.25,
                  my: 1,
                  minHeight: 48,
                  justifyContent: collapsed ? "center" : "initial",
                  px: collapsed ? 1 : 2,
                  "&.Mui-selected": {
                    bgcolor: theme.palette.action.hover,
                  },
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : 40,
                    ml: collapsed ? 0 : 1,
                    justifyContent: "center",
                    color: selected
                      ? "primary.main"
                      : theme.palette.text.secondary,
                    transform: selected ? "scale(1.2)" : "scale(1)",
                    transition: "color 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {route.icon}
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary={route.name}
                    sx={{
                      ml: 0.5,
                      color: selected
                        ? "text.primary"
                        : theme.palette.text.secondary,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
    </List>
  );
};

export default SidebarNavigation;
