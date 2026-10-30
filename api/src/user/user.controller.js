import { User, Token } from "../database/index.js";
import jwt from "jsonwebtoken";
import HttpError from "http-errors";
import { sendMail } from "../services/index.js";

export const generateTokens = async (req, res) => {
  req.token["userAgent"] = req.headers["user-agent"] || "demo";
  const newToken = await Token.create(req.token);
  const DAYS = 30;
  const refreshToken = jwt.sign({ tokenId: newToken.id }, process.env.JWT, {
    expiresIn: `${DAYS}d`,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DAYS * 24 * 3600000,
    path: "/",
  });
  const accessToken = jwt.sign({ tokenId: newToken.id }, process.env.JWT, {
    expiresIn: "15m",
  });

  return res.status(200).json({ accessToken, success: true });
};

export const auth = async (req, res) => {
  const { auth } = req.params;
  const { email, password } = req.body;
  let user;
  if (auth === "register") {
    let created = false;
    [user, created] = await User.findOrCreate({
      where: { email },
      defaults: req.body,
    });
    if (!created && !(await User.checkPw(password)))
      throw HttpError(401, "Credenciales inválidas.");
  } else user = await User.login(email, password);

  if (user === null) throw HttpError(404, "Credenciales inválidas.");
  const token = jwt.sign({ userId: user.id }, process.env.JWT, {
    expiresIn: "10m",
  });
  const html = `<a href='${process.env.FRONTEND_URL}/auth?token=${token}' target='_blank'>Acceda aquí</a><p>Este enlace de acceso vencerá en 10 minutos. <br/>Si no pidió este inicio de sesión, ignore este correo.</p>`;
  await sendMail({ email, html });
  return res.status(200).json({ success: true });
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const decoded = jwt.verify(refreshToken, process.env.JWT);
    await Token.destroy({ where: { id: decoded.tokenId } });
  } catch {}
  res.clearCookie("refreshToken");
  return res.status(200).json({ success: true });
};

export const requestPw = async (req, res) => {
  const { email } = req.body;
  const userId = await User.findOne({ where: { email }, attributes: ["id"] });
  if (!userId) throw HttpError(404, "Credenciales inválidas.");
  const token = jwt.sign({ userId }, process.env.JWT, { expiresIn: "10m" });
  const html = `<a target='_blank' href="${process.env.FRONTEND_URL}/auth/password/${token}">Renovar contraseña</a><p>Esta solicitud vencerá en 20 minutos.</p>`;
  await sendMail({ email, html });
  return res.status(200).json({ success: true });
};

export const renewPw = async (req, res) => {
  const { password } = req.body;
  const { userId } = jwt.verify(req.token, process.env.JWT);
  await User.update({ password }, { where: { userId } });
  return res.status(200).json({ success: true });
};
