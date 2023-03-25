const { Router } = require("express");
const AuthController = require("../../controllers/auth_controller");
const { isEmailTaken, isEmail } = require("../middlewares/dbValidator");

module.exports = (mainRouter = Router()) => {
  const authRouter = Router();
  const controller = new AuthController();
  authRouter.post("/sign_up", [isEmailTaken], controller.signUp);
  authRouter.post("/login", [isEmail], controller.login);
  // Assign user router to the path /users
  mainRouter.use("/auth", authRouter);
};
