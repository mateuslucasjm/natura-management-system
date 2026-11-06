import LandingLogo from "@/components/Landing/LandingLogo";
import { getHeroGradientBg } from "@/components/Landing/landingStyles";
import { AuthContext } from "@/contexts/authContext";
import { getAuthErrorMessage } from "@/errors/auth/messages";
import type { LoginFields } from "@/types/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState<LoginFields>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext not found");

  const { handleLogin } = authContext;

  const handleChange =
    (field: keyof LoginFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await handleLogin(form);
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err.response?.status));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        ...getHeroGradientBg(theme),
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        px: { xs: 0, sm: 2 },
      })}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: 20, sm: 24 },
          left: { xs: 20, sm: 32 },
        }}
      >
        <LandingLogo height={38} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", sm: "90%" },
          maxWidth: { xs: "none", sm: 450 },
          minHeight: { xs: "100dvh", sm: "auto" },
          justifyContent: "center",
          padding: { xs: 3, sm: 5 },
          borderRadius: { xs: 0, sm: 5 },
          boxShadow: { xs: 0, sm: 3 },
          backgroundColor: "background.paper",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" align="center" mb={2}>
          Login
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <TextField
          label="E-mail"
          value={form.email}
          onChange={handleChange("email")}
          fullWidth
        />

        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange("password")}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mt: 1 }}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Typography variant="body2" align="center" color="text.secondary">
          Não tem conta?{" "}
          <Link component={RouterLink} to="/auth/register" color="primary">
            Criar conta
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
