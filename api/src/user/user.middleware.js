import { User, Token } from "../database/index.js";
import jwt from "jsonwebtoken";
import HttpError from "http-errors";

export const MFA = async (req, _res, next) => {
  const { userId } = jwt.verify(req.token, process.env.JWT);
  req.token = { userId };
  next();
};

export const refresh = async (req, _res, next) => {
  const { refreshToken } = req.cookies;
  const { tokenId } = jwt.verify(refreshToken, process.env.JWT);
  const token = await Token.findByPk(tokenId);
  if (!token) throw HttpError(404, "Sesión terminada.");
  const user = await User.count({ where: { id: token.userId } });
  if (user < 1) throw HttpError(404, "Credenciales inválidas.");
  req.token = { userId: token.userId };
  next();
};
