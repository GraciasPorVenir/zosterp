import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Contraseña requerida" }),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
  .extend({
    cuit: z.string().regex(/^\d{11}$/, { message: "CUIT inválido" }),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .refine((d) => /[A-Z]/.test(d.password), {
    message: "Debe contener al menos una letra mayúscula",
    path: ["password"],
  })
  .refine((d) => /[a-z]/.test(d.password), {
    message: "Debe contener al menos una letra minúscula",
    path: ["password"],
  })
  .refine((d) => /[0-9]/.test(d.password), {
    message: "Debe contener al menos un número",
    path: ["password"],
  })
  .refine((d) => /[^A-Za-z0-9]/.test(d.password), {
    message: "Debe contener al menos un carácter especial",
    path: ["password"],
  })
  .refine((d) => d.password.length < 12, {
    message: "La contraseña debe tener al menos 12 caracteres",
    path: ["password"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type DBRegisterInput = Omit<
  RegisterInput,
  "password" | "confirmPassword"
> & {
  passwordHash: string;
  legalName: string;
  legalType: string;
};
