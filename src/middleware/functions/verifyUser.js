export const verifyUser = async (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (senha.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must contain at least 6 characters" });
  }

  next();
};
