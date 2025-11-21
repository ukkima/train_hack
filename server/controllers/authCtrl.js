import UserModel from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const toSafeUser = (user) => {
  const { password, ...safeUser } = user._doc;

  return safeUser;
};

const authCtrl = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, username, password } = req.body;

      const user = await UserModel.findOne({ username });

      if (user) {
        return res.status(400).json({ message: "Такой пользователь есть." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await UserModel.create({
        firstname,
        lastname,
        username,
        password: hashPassword,
      });

      // TODO разберись со spread оператором и деструктаризацией

      return res.status(200).send({
        message: "Вы успешно зарегестрированы",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Ошибка при регистрации." });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Неверный логин или пароль." });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(404).json({ message: "Неверный логин или пароль." });
    }

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refreshToken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Успешная авторизация",
    });
  },

  refreshToken: (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(400).json({ message: "Пожалуйста войдите!" });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        async (err, result) => {
          if (err) {
            return res.status(400).json({ message: "Пожалуйста войдите!" });
          }

          const user = await UserModel.findById(result._id);
          console.log(user);

          if (!user) {
            return res.json({ message: "Такого пользователя нет" });
          }

          const accessToken = jwt.sign(
            { _id: user._id },
            process.env.ACCESS_SECRET,
            {
              expiresIn: "15m",
            }
          );

          const safeUser = toSafeUser(user);

          return res.status(200).json({ user: safeUser, accessToken });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  update: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate({ _id: req.user._id }, { ...req.body });

      res.json({ message: "Данные успешно обновлены" });
    } catch (err) {
      console.log(err);
    }
  },

  logout: (req, res) => {
    res.clearCookie("refreshToken", { path: "/api/auth/refreshToken" });
    res.status(200).json({ message: "Успешный выход из системы" });
  },

  delete: async (req, res) => {
    try {
      await userModel.findByIdAndDelete({ _id: req.user._id });

      return res.json({ message: "Данные успешно удалены" });
    } catch (err) {
      console.log(err);
    }
  },
};

export default authCtrl;
