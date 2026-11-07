import { Request, Response } from "express";
import {
  generateToken,
  getUserByEmail,
  InsertToken,
  registerUser,
} from "@repo/db";
import {
  type RegisterInput,
  loginSchema,
  registerSchema,
  testSchema,
} from "@repo/schemas";
import HttpError from "../error.js";
import { hash, genSalt, compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { sendMail } from "@repo/mailer";
import { usersInAFIP } from "./hardcoded.js";

export const requestAccess = async (req: Request, res: Response) => {
  const isRegister: boolean = Boolean(req.query?.register);
  const data = testSchema(isRegister ? registerSchema : loginSchema, req.body);
  let user = await getUserByEmail(data.email);
  if (user === undefined) {
    if (!isRegister) throw new HttpError(404, "Credenciales inválidas.");
    const { cuit, email, password } = data as RegisterInput;
    const userInAfip = usersInAFIP[cuit];

    if (userInAfip === undefined)
      throw new HttpError(404, "Persona no hallada en AFIP.");
    if (userInAfip.legalType !== "PERSONA FISICA")
      throw new HttpError(403, "Entidad inválida para usuario.");

    const passwordHash = await hash(password, await genSalt());
    user = await registerUser({ cuit, email, passwordHash, ...userInAfip });
  } else if (!(await compare(data.password, user.passwordHash)))
    throw new HttpError(402, "Credenciales inválidas.");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS!, {
    expiresIn: "10m",
  });
  const html = `<a href="${process.env.WEB_URL}/access?token=${token}" target="_blank">Acceder</a>`;

  await sendMail({ email: data.email, html });
  return res.status(200).json({ success: true as const });
};

export const getAFIPData = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true as const,
    entity: usersInAFIP[req.params.cuit! as string],
  });
};

export const generateTokens = async (req: Request, res: Response) => {
  const token = await generateToken({
    userAgent: req.headers["user-agent"] || "NULL",
    userId: req.userId!,
  });
  const DAYS: number = 30;
  const refreshToken = jwt.sign(
    { tokenId: token.id },
    process.env.JWT_REFRESH!,
    { expiresIn: `${DAYS}d` },
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DAYS * 24 * 3600,
    path: "/",
  });

  const accessToken = jwt.sign({ tokenId: token.id }, process.env.JWT_ACCESS, {
    expiresIn: "15m",
  });

  return res.status(200).json({ accessToken, success: true as const });
};
