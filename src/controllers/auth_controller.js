const db = require("../db/models");
const { compareSync } = require("bcryptjs");
const { createJwt } = require("../helpers/jwt");
class AuthController {
  async signUp(req, res) {
    const newUser = await db.user.create(req.body);
    res.json({
      message: "User created successfully.",
      data: newUser,
    });
  }

  async login(req, res) {
    const { email: emailProvided, password } = req.body;
    const user = await db.user.findOne({ email: emailProvided });
    const isPasswordCorrect = compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        message: "Invalid user credentials.",
      });
    }
    const { email, name, surname } = user;
    const token = createJwt({ email, name, surname });
    return res.json({ data: user.withoutPassword, token });
  }
}

module.exports = AuthController;
