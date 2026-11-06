import { Box } from "@mui/material";
import { Link } from "react-router-dom";

interface LandingLogoProps {
  height?: number;
}

export default function LandingLogo({ height = 40 }: LandingLogoProps) {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src="/logo-natura.png"
        alt="Natura App"
        sx={{
          display: "block",
          height,
          width: "auto",
        }}
      />
    </Box>
  );
}
