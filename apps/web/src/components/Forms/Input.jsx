import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import Box from "@mui/material/Box";

// Diccionario de traducción de errores técnicos / Zod / backend a mensajes amigables en español
const ERROR_TRANSLATIONS = {
  // Errores específicos requeridos en el ticket
  NAME_REQUIRED: "Falta indicar el nombre",
  SURNAME_REQUIRED: "Falta indicar el apellido",
  EMAIL_REQUIRED: "Falta indicar el usuario",
  INVALID_EMAIL: "Nombre de usuario o formato de correo incorrecto",
  PW_TOO_SHORT: "La contraseña debe tener al menos 8 caracteres",
  PW_DONT_MATCH: "Falta corroborar nuevamente su contraseña",
  CONFIRM_PW_REQUIRED: "Falta corroborar nuevamente su contraseña",
  
  // Nombres de campo en español para "Required"
  REQUIRED_NAME: "Falta indicar el nombre",
  REQUIRED_SURNAME: "Falta indicar el apellido",
  REQUIRED_EMAIL: "Falta indicar el usuario",
  REQUIRED_PASSWORD: "Falta que indique su contraseña",
  REQUIRED_CONFIRMPASSWORD: "Falta corroborar nuevamente su contraseña",
  
  // Errores de login / credenciales
  invalid_credentials: "El nombre de usuario o contraseña es incorrecto",
  "Error de credenciales": "El nombre de usuario o contraseña es incorrecto",
  "Invalid credentials": "El nombre de usuario o contraseña es incorrecto",
};

export const translateErrorMessage = (name, error) => {
  if (!error) return "";
  const code = typeof error === "string" ? error : error.message || error.type;
  
  if (ERROR_TRANSLATIONS[code]) {
    return ERROR_TRANSLATIONS[code];
  }

  const lowerName = name.toLowerCase();
  if (code === "Required" || code === "required" || code === "invalid_type") {
    if (lowerName === "email") return "Falta indicar el usuario";
    if (lowerName === "password") return "Falta que indique su contraseña";
    if (lowerName.includes("confirm")) return "Falta corroborar nuevamente su contraseña";
    if (lowerName === "name") return "Falta indicar el nombre";
    if (lowerName === "surname") return "Falta indicar el apellido";
    return "Este campo es requerido";
  }

  if (lowerName === "email" && code?.includes("email")) {
    return "Nombre de usuario o correo incorrecto";
  }

  if (code?.includes("invalid_credentials") || code?.toLowerCase().includes("credencial")) {
    return "El nombre de usuario o contraseña es incorrecto";
  }

  return code;
};

export default function Input({ name, label, type = "text", externalError, ...rest }) {
  const lowerName = name.toLowerCase();
  const finalType = lowerName.includes("password")
    ? "password"
    : lowerName.includes("email")
      ? "email"
      : type;

  const formContext = useFormContext();
  const formError = formContext?.formState?.errors?.[name];
  const activeError = externalError || formError;
  const tooltipMessage = activeError ? translateErrorMessage(name, activeError) : "";

  const registerProps = formContext ? formContext.register(name) : {};

  return (
    <Box sx={{ position: "relative", width: "100%", my: 1 }}>
      <TextField
        {...rest}
        label={label || name}
        variant="outlined"
        id={name}
        type={finalType}
        error={Boolean(activeError)}
        {...registerProps}
        required={true}
        InputLabelProps={{ shrink: true }}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: activeError ? (
              <InputAdornment position="end">
                <Tooltip
                  title={tooltipMessage}
                  arrow
                  placement="right"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "error.main",
                        color: "white",
                        fontSize: "0.85rem",
                        boxShadow: 3,
                        p: 1,
                        "& .MuiTooltip-arrow": {
                          color: "error.main",
                        },
                      },
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "error.main",
                    }}
                  >
                    <ErrorOutlinedIcon color="error" />
                  </Box>
                </Tooltip>
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{
          width: "100%",
        }}
      />
    </Box>
  );
}
