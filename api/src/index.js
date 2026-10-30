import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./user/index.js";
import {
  companyRouter,
  getAllCompanies,
  createCompany,
} from "./company/index.js";
import { isAuth } from "./shared/index.js";
import { sequelize } from "./database/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", userRouter);

app.get("/erp", isAuth, getAllCompanies);
app.post("/erp", isAuth, createCompany);
app.use("/erp/:companyId", isAuth, companyRouter);

await sequelize.sync();
app.listen();
