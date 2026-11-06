import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface SidebarHeaderProps {
  title?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  collapsed = false,
  onToggle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        minHeight: 80,
        px: collapsed ? 1 : 2,
        mt: 1,
      }}
    >
      {!collapsed && title && (
        <Box
          component="img"
          src="/logo-natura.png"
          alt="Logo Natura"
          sx={{
            height: 45,
            width: "auto",
            ml: 1,
            mt: 1,
          }}
        />
      )}

      {!isMobile && (
        <Tooltip title={collapsed ? "Expandir menu" : "Recolher menu"}>
          <IconButton
            onClick={onToggle}
            size="small"
            sx={{
              ml: collapsed ? 0 : "auto",
              color: "text.secondary",
              borderRadius: 2,
              "&:hover": {
                color: "primary.main",
                bgcolor: "action.hover",
              },
            }}
          >
            {collapsed ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowLeftIcon />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default SidebarHeader;
