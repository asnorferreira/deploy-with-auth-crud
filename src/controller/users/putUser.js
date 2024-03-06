import knex from "../../configs/conection.js";
import bcrypt from "bcrypt";

export const putUser = async (req, res) => {
  const userId = req.usuario.id;
  const { nome, email, senha } = req.body;
  try {
    const emailCheck = await knex("usuarios")
      .where({ email, id: userId })
      .select("*");

    if (emailCheck.length > 0) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    const updateUser = await knex("usuarios")
      .where({ id: userId })
      .update({ nome, email, senha: encryptedPassword });

    if (!updateUser) {
      return res.status(404).json({ message: "ID não encontrado" });
    }

    return res.status(201).json({ message: "Updated User!" });
  } catch (error) {
    console.error("Erro ao atualizar dados: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
