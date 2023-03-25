const db = require("../../db/models");
const isEmailTaken = async (req, res, next) => {
  const { email } = req.body;
  const userWithEmail = await db.user.findOne({
    where: { email },
  });
  if (userWithEmail) {
    return res.status(400).json({
      error: "Email is already used.",
    });
  }
  next();
};

const isEmail = async (req, res, next) => {
  const { email } = req.body;
  const userWithEmail = await db.user.findOne({
    where: { email },
  });
  if (!userWithEmail) {
    return res.status(400).json({
      error: `Email: ${email} was not found.`,
    });
  }
  next();
};

module.exports = {
  isEmailTaken,
  isEmail,
};
