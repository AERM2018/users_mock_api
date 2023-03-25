"use strict";
const { Model } = require("sequelize");
const { genSaltSync, hashSync } = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
    get withoutPassword() {
      const { password, ...rest } = this.toJSON();
      return rest;
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  User.beforeCreate(async (user, options) => {
    const rawPassword = user.password;
    const salt = genSaltSync();
    const hashedPassword = hashSync(rawPassword, salt);
    user.password = hashedPassword;
  });
  return User;
};
