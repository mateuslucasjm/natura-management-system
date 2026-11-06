import { landingFooter } from "@/components/Landing/landingContent";
import { Box, Container, Divider, Grid, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function FooterAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document
        .getElementById(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      underline="hover"
      sx={{
        display: "block",
        py: 0.5,
        fontSize: "0.85rem",
        fontWeight: 400,
        color: "text.secondary",
        transition: "color 0.2s",
        "&:hover": { color: "primary.main" },
      }}
    >
      {children}
    </Link>
  );
}

export default function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        pt: { xs: 2, sm:8 },
        pb: 5,
        bgcolor: "background",
        color: "text.primary",
        borderTop: 1,
        borderColor: "divider",
        transition: "background-color 0.2s, color 0.2s",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          my: { xs: 2, md: 0 },
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src="/logo-natura.png"
              alt="Natura App"
              sx={{ height: 44, mb: 2 }}
            />

            <Typography
              variant="body2"
              sx={{
                fontSize: "0.85rem",
                fontWeight: 400,
                lineHeight: 1.7,
                maxWidth: 400,
                color: "text.secondary",
              }}
            >
              {landingFooter.tagline}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ fontSize: "0.85rem", mb: 1 }}
            >
              {landingFooter.product.title}
            </Typography>

            {landingFooter.product.links.map((link) => (
              <FooterAnchor key={link.label} href={link.href}>
                {link.label}
              </FooterAnchor>
            ))}
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ fontSize: "0.85rem", mb: 1 }}
            >
              {landingFooter.account.title}
            </Typography>

            {landingFooter.account.links.map((link) => (
              <Link
                key={link.label}
                component={RouterLink}
                to={link.to}
                underline="hover"
                sx={{
                  display: "block",
                  py: 0.5,
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ fontSize: "0.85rem", mb: 1 }}
            >
              {landingFooter.modules.title}
            </Typography>

            {landingFooter.modules.items.map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{
                  py: 0.5,
                  fontSize: "0.85rem",
                  fontWeight: 400,
                  color: "text.secondary",
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "divider" }} />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              fontWeight: 400,
              color: "text.secondary",
            }}
          >
            © {year} Natura App. Todos os direitos reservados.
          </Typography>

          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "text.secondary",
            }}
          >
            Controle de vendas, estoque e clientes para pequenos consultores.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
