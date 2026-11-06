import CreateButton from "@/components/Button/CreateButton";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useLayout } from "@/contexts/layoutContext";
import MenuIcon from "@mui/icons-material/Menu";
import type { TypographyProps } from "@mui/material";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  onCreate?: () => void;
  variant?: TypographyProps["variant"];
  rightContent?: ReactNode;
  sx?: object;
}

export default function Header({
  title,
  buttonLabel,
  onCreate,
  variant,
  rightContent,
  sx,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleMobileOpen } = useLayout();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        mt: 1,
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
        {isMobile && (
          <IconButton
            onClick={toggleMobileOpen}
            aria-label="Abrir menu"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        )}

        <PageTitle title={title} variant={variant} />
      </Box>

      <Box
        sx={{
          flexShrink: 0,
          ml: 1,
        }}
      >
        {rightContent ??
          (onCreate && (
            <CreateButton
              label={buttonLabel ?? "Criar"}
              onClick={onCreate}
              size={isMobile ? "small" : "medium"}
            />
          ))}
      </Box>
    </Box>
  );
}
