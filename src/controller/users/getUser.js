import knex from "../../configs/conection.js";

export const getUser = async (req, res) => {
  try {
    const user = await knex("usuarios").select("id", "nome", "email");
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error while getting user");
  }
};
