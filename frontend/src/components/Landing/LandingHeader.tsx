import AccessAccountIcon from "@/components/Landing/AccessAccountIcon";
import LandingLogo from "@/components/Landing/LandingLogo";
import { landingNavLinks } from "@/components/Landing/landingContent";
import {
  getGlassHeader,
  getHeaderScrollShadow,
  getLandingHeaderOffset,
  landingHeaderToolbarSx,
} from "@/components/Landing/landingStyles";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function scrollToSection(id: string, offset: number) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: "smooth" });
}

export default function LandingHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const headerScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 24,
  });

  if (isMobile) return null;

  const headerOffset = getLandingHeaderOffset(headerScrolled, false);

  const toolbarSx = headerScrolled
    ? landingHeaderToolbarSx.scrolled
    : landingHeaderToolbarSx.hero;

  const navItem = (link: (typeof landingNavLinks)[0]) => (
    <Button
      key={link.id}
      onClick={() => scrollToSection(link.id, headerOffset)}
      sx={{
        color: "text.primary",
        fontWeight: 500,
        fontSize: "1rem",
        py: 0,
        my: 0,
        minHeight: "unset",
        "&:hover": {
          color: "primary.main",
          bgcolor: "transparent",
        },
      }}
    >
      {link.label}
    </Button>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={(theme) => ({
        ...getGlassHeader(theme, headerScrolled),
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar,
        transition:
          "background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        boxShadow: getHeaderScrollShadow(theme, headerScrolled),
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: headerScrolled
            ? { xs: 2.5, sm: 4, md: 6, lg: 8 }
            : { xs: 3, sm: 5, md: 8, lg: 10 },
          transition: "padding 0.3s ease",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            ...toolbarSx,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { md: 15, lg: 15 },
            pb: "0 !important",
            mb: 2,
            minHeight: "unset",
            transition: "padding 0.3s ease, min-height 0.3s ease",
          }}
        >
          <LandingLogo height={40} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: -0.5 }}>
            {landingNavLinks.map(navItem)}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={RouterLink}
              to="/auth/login"
              startIcon={<AccessAccountIcon fontSize="small" />}
              variant="contained"
              color="primary"
              disableElevation
              sx={(theme) => ({
                borderRadius: 50,
                px: 3.2,
                minWidth: 120,
                fontSize: "0.9rem",
                fontWeight: 600,
                textTransform: "none",
                color: "#fff",
                letterSpacing: "0.01em",
                boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
                transition: "all 0.25s ease",
                "& .MuiButton-startIcon": {
                  mr: 1,
                },
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "translateY(-2px)",
                  boxShadow: `0 7px 18px ${theme.palette.primary.main}50`,
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              })}
            >
              Entrar
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {!headerScrolled && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 80px)",
            maxWidth: 1200,
            height: "0.5px",
            bgcolor: "primary.main",
            opacity: 0.08,
          }}
        />
      )}
    </AppBar>
  );
}
