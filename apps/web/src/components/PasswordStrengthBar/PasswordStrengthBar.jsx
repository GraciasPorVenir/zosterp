import { Box, Typography } from "@mui/material";

export const getPasswordStrength = (password = "") => {
  if (!password) {
    return { score: 0, label: "", color: "transparent" };
  }

  let points = 0;
  if (password.length >= 8) points++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++;
  if (/\d/.test(password)) points++;
  if (/[^A-Za-z0-9]/.test(password)) points++;

  if (password.length < 8 || points <= 1) {
    return { score: 1, label: "Débil", color: "#f44336" }; // Rojo
  }
  if (points === 2 || points === 3) {
    return { score: 2, label: "Normal", color: "#ff9800" }; // Amarillo/Naranja
  }
  return { score: 3, label: "Fuerte", color: "#4caf50" }; // Verde
};

export default function PasswordStrengthBar({ password = "" }) {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);

  return (
    <Box sx={{ mt: 0.5, mb: 1.5, px: 1 }}>
      <Box sx={{ display: "flex", gap: 1, height: 6, mb: 0.5 }}>
        {/* Barra 1 - Débil (Rojo si score >= 1) */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 1,
            bgcolor: score >= 1 ? (score === 1 ? "#f44336" : score === 2 ? "#ff9800" : "#4caf50") : "grey.300",
            transition: "background-color 0.3s",
          }}
        />
        {/* Barra 2 - Normal (Amarillo si score >= 2) */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 1,
            bgcolor: score >= 2 ? (score === 2 ? "#ff9800" : "#4caf50") : "grey.300",
            transition: "background-color 0.3s",
          }}
        />
        {/* Barra 3 - Fuerte (Verde si score >= 3) */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 1,
            bgcolor: score >= 3 ? "#4caf50" : "grey.300",
            transition: "background-color 0.3s",
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{
          color,
          fontWeight: "bold",
          display: "block",
          textAlign: "right",
          fontSize: "0.75rem",
        }}
      >
        Seguridad de la contraseña: {label}
      </Typography>
    </Box>
  );
}

