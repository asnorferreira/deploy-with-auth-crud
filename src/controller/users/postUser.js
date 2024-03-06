import knex from "../../configs/conection.js";
import bcrypt from "bcrypt";

export const postUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);

    const user = await knex("usuarios")
      .insert({ nome, email, senha: hash })
      .returning(["email", "senha"]);

    return res.status(201).json(user[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: error.message });
  }
};
