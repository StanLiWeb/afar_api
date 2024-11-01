import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const dbConnect = () =>
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => { console.error("Error al conectar a MongoDB:", error)
  });
