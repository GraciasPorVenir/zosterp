import express from "express";
import {
  auth,
  generateTokens,
  logout,
  renewPw,
  requestPw,
} from "./user.controller.js";
import { getToken } from "../shared/index.js"
import { MFA, refresh } from "./user.middleware.js";

const router = express.Router();

router.post(":auth", auth);
router.post("mfa", getToken, MFA, generateTokens);
router.get("refresh", refresh, generateTokens);
router.delete("logout", logout);
router.post("password", requestPw);
router.patch("password", getToken, renewPw);

export default router;
