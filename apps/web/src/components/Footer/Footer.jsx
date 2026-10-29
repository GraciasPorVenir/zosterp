import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../providers";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        py: 4,
        textAlign: "center",
        mt: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Contact
      </Typography>
      <Typography>zost.erp.support@gmail.com</Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        &copy; {CURRENT_YEAR} Fiscella&Asociados. All rights reserved.
      </Typography>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {mode === "light" ? "Modo claro" : "Modo oscuro"}
        </Typography>
        <Tooltip title={mode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}>
          <IconButton onClick={toggleTheme} sx={{ color: "white" }} size="small">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

