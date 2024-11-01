import express from "express";
import { loginUser, profile, registerUser, updateProfile, getAllProfile, deleteUserProfile } from "../controllers/userController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Registro y Login
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Perfil de usuario
userRouter.get("/profile", protect, profile);
userRouter.put("/profile", protect, updateProfile);

userRouter.get("/profiles", protect, authorize("admin"), getAllProfile);
userRouter.delete("/:id", protect, deleteUserProfile);


export default userRouter;