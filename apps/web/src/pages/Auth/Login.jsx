import { useState } from "react";
import { Form, Input, Footer } from "../../components";
import { loginSchema } from "@repo/schemas";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Paper } from "@mui/material";
import { useAuth } from "../../providers";

export default function Login() {
  const { login } = useAuth();
  const { t } = useTranslation("web");
  const navigate = useNavigate();
  const [credentialError, setCredentialError] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setCredentialError(false);
      await login(data);
      navigate("/erp");
    } catch (error) {
      setCredentialError(true);
      throw error;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            ZostERP
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 2 }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Login
          </Typography>

          <Form 
            schema={loginSchema} 
            handler={handleSubmit}
            onValuesChange={() => {
              if (credentialError) setCredentialError(false);
            }}
          >
            <Input 
              name={"email"} 
              label="Usuario / Correo electrónico"
              externalError={credentialError ? "invalid_credentials" : null} 
            />
            <Input 
              name={"password"} 
              label="Contraseña"
              type="password" 
              externalError={credentialError ? "invalid_credentials" : null} 
            />
          </Form>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              mt: 2,
            }}
          >
            <Link
              to={"/auth/register"}
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontSize: "1.05rem",
              }}
            >
              Registro de usuario
            </Link>
            <Link
              to={"/auth/password"}
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontSize: "1.05rem",
              }}
            >
              Recuperación de contraseña
            </Link>
          </Box>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
}
