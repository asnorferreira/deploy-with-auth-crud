import knex from "../../configs/conection.js";

export const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await knex("usuarios")
      .select("email")
      .where({ email })
      .first();
    if (user) {
      return res.status(400).json({ error: "Email was used" });
    }
    next();
  } catch (error) {
    console.error("Error while verifying email");
    return res.status(500).json({ error: error.message });
  }
};
