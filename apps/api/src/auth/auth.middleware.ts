import { NextFunction, Request } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import HttpError from "../error.js";
import { getUserByToken } from "@repo/db";

export const access = async (req: Request, next: NextFunction) => {
  let token;
  try {
    token = jwt.verify(req.headers.authorization!, process.env.JWT_ACCESS) as {
      userId: string;
    };
  } catch (error) {
    if (error === TokenExpiredError) throw new HttpError(400, "Token vencido.");
    throw new HttpError(400, "Error con el token.");
  }
  req.userId = token.userId;
  next();
};

export const refresh = async (req: Request, next: NextFunction) => {
  let token;
  try {
    token = jwt.verify(req.cookies.refreshToken, process.env.JWT_REFRESH) as {
      tokenId: string;
    };
  } catch (error) {
    if (error === TokenExpiredError) throw new HttpError(400, "Token vencido.");
    throw new HttpError(400, "Error con el token.");
  }
  const exisToken = await getUserByToken(token.tokenId);
  if (exisToken === undefined)
    throw new HttpError(404, "Credenciales inválidas");
  req.userId = exisToken.id;
  next();
};
