import { landingPageFontSx } from "@/components/Landing/landingStyles";
import { Box } from "@mui/material";
import type { ReactNode } from "react";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        ...landingPageFontSx,
      }}
    >
      <LandingHeader />

      <Box component="main">{children}</Box>

      <Box component="footer">
        <LandingFooter />
      </Box>
    </Box>
  );
}
