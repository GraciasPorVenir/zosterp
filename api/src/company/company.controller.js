import { Associate, Company, Permission, Role } from "../database/index.js";
import HttpError from "http-errors";

export const getAll = async (req, res) => {
  const companies = await Company.findAll({
    include: {
      model: Role,
      attributes: [],
      required: true,
      include: [
        {
          model: Associate,
          required: true,
          attributes: [],
          where: { userId: req.user.id },
        },
        {
          model: Permission,
          required: true,
          attributes: [],
          where: { code: "RCOM" },
        },
      ],
    },
  });
  return res.status(200).json({ companies, success: true });
};

export const get = async (req, res) => {
  const company = await Company.findByPk(req.params.companyId);
  return res.status(200).json({ company, success: true });
};

export const create = async (req, res) => {
  const company = await Company.create(req.body);
  const role = await Role.create({
    companyId: company.id,
    name: "propietario",
  });
  const action = ["C", "R", "U", "D"];
  const resource = ["ASS", "PER", "ROL", "TAS", "COM"];
  let permissions = [];
  for (const a of action) {
    for (const r of resource)
      permissions.push({ code: `${a}${r}`, roleId: role.id });
  }
  await Permission.bulkCreate(permissions);
  await Associate.create({ userId: req.user.id, roleId: role.id });
  return res.status(201).json({ success: true });
};
