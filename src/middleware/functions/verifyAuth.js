import knex from "../../configs/conection.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS);
    const auth = await knex("usuarios").select("id").where({ id });

    if (auth.length !== 1) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.usuario = auth[0];
    next();
  } catch (error) {
    console.error("Error of authorization: ", error);
    return res.status(500).json({ error: error.message });
  }
};
