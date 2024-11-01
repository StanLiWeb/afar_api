import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { AppError } from "../middleware/errorHandler.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
        res
        .status(401)
        .json({ status: false, message: "No autorizado, token invalido" });
    }
  }
  if (!token) {
    res
      .status(401)
      .json({ status: false, message: "No autorizado, no hay token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        res
        .status(403)
        .json({ status: false, message: "No autorizado - sin permisos" });
    }
    next();
  };
};
