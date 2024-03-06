import knex from "../../configs/conection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const postLogin = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await knex("usuarios")
      .select("email", "senha", "id")
      .where({ email })
      .first();

    if (!user) {
      return res.status(400).json({ error: "Usuário ou senha inválidos" });
    }

    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(400).json({ error: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, {
      expiresIn: 86400,
    });

    const { senha: _, ...usuariologado } = user;
    return res.status(200).json({ usuario: usuariologado, token });
  } catch (error) {
    console.error("Error while verifying email");
    return res.status(500).json({ error: error.message });
  }
};
