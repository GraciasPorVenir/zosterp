import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box 
} from "@mui/material";
import { Footer } from "../../components";

export default function ERP() {
  const { t } = useTranslation("web");

  return (
    // Contenedor principal que abarca toda la pantalla
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* --- HEADER --- */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}
          >
            ZostERP
          </Typography>
          
          {/* Navegación transformada en botones de MUI */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/erp/profile"
              variant="text" 
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {"perfil"}
            </Button>
            <Button
              component={Link}
              to="/erp"
              variant="text"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {"ERP"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* --- MAIN CONTENT (Outlet) --- */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, // Esto obliga al contenedor a empujar el footer hacia abajo
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Todo lo que las rutas hijas rendericen aparecerá aquí adentro */}
        <Outlet />
      </Box>

      {/* --- FOOTER COMPARTIDO CON TOGGLE CLARO/OSCURO --- */}
      <Footer />
    </Box>
  );
}
