import HttpError from "http-errors";
import jwt from "jsonwebtoken";

const tokenHelper = (req) => {
  const token = req.headers["authorization"];
  if (!token || !token.startsWith("Bearer "))
    throw HttpError(401, "Sesión inválida.");
  req.token = token;
};

export const getToken = (req, _res, next) => {
  try {
    tokenHelper(req);
    next();
  } catch (error) {
    next(error);
  }
};

export const isAuth = async (req, _res, next) => {
  try {
    tokenHelper(req);
    let { userId } = jwt.verify(req.token, process.env.JWT);
    req.user = { id: userId };
    next();
  } catch (error) {
    next(HttpError(401, "Token inválido o expirado."));
  }
};
