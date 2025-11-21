import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Ошибка авторизации" });

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Ошибка авторизации" });

    const user = await userModel.findById(decoded._id);

    req.user = user;

    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      return res.status(401).json({ message: err.message });
    }
    console.log(err);
  }
};
