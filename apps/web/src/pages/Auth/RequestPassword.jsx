import { useForm } from "react-hook-form";
import { Form, Input, Footer } from "../../components";
import { recoverPasswordSchema } from "@repo/schemas";
import { useTranslation } from "react-i18next";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";

export default function RequestPassword() {
  const { t } = useTranslation("web");
  const handleSubmit = (data) => {
    // Manejo de solicitud de nueva contraseña
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
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
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
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Recuperar Contraseña
          </Typography>

          <Form schema={recoverPasswordSchema} handler={handleSubmit}>
            <Input name={"email"} label="Correo electrónico" />
          </Form>

          <Box sx={{ mt: 2 }}>
            <Link
              to="/auth/login"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontSize: "1rem",
              }}
            >
              Volver al inicio de sesión
            </Link>
          </Box>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
}
