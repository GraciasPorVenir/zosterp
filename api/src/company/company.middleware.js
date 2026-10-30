import { Associate, Permission, Role } from "../database/index.js";
import HttpError from "http-errors";

export const getAccess = (code) => {
  return async (req, _res, next) => {
    const taskId = req.params?.taskId || req.query?.taskId;
    const whereAssoc = { userId: req.user.id };
    if (taskId) whereAssoc.taskId = taskId;

    const canAccess = await Associate.findOne({
      where: whereAssoc,
      attributes: ["id"],
      include: [
        {
          model: Role,
          required: true,
          where: { companyId: req.params.companyId },
          attributes: [],
          include: [
            {
              model: Permission,
              required: true,
              where: { code },
              attributes: [],
            },
          ],
        },
      ],
    });

    if (!canAccess) throw HttpError(401, "Acceso no autorizado.");
    req.code = code;
    next();
  };
};
