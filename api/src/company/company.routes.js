import express from "express";
import { getAccess } from "./company.middleware.js";
import { get } from "./company.controller.js";

const router = express.Router();

router.get("/", getAccess("RCOM"), get)
router.patch("/", getAccess("UCOM"))
router.delete("/", getAccess("DCOM"))

router.get("/tasks", getAccess("RTAS"))
router.post("/tasks", getAccess("CTAS"))

router.get("/tasks/:taskId", getAccess("RTAS"))
router.patch("/tasks/:taskId", getAccess("UTAS"))
router.delete("/tasks/:taskId", getAccess("DTAS"))

router.get("/associates", getAccess("RASS"))
router.post("/associates", getAccess("CASS"))

router.get("/associates/:associateId", getAccess("RASS"))
router.patch("/associates/:associateId", getAccess("UASS"))
router.delete("/associates/:associateId", getAccess("DASS"))

export default router;
