import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";
import { AppError } from "../middleware/errorHandler.js";


//@desc Register new user
//@router /api/user/register
//@acces Public

export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //Primero encontramos si el usuario ya existe.

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError("El usuario ya existe", 400);
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    throw new AppError("Error al crear el usuario", 400);
  }
});

//@desc Login user
//@router /api/user/login
//@acces Public

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Primero encontramos si el usuario ya existe.
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    throw new AppError("Email o contraseña incorrecta");
  }
});

//@desc Get user profile
//@router /api/user/profile
//@acces Public
export const profile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;

  //Primero encontramos si el usuario ya existe.
  const user = await User.findById(_id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
    });
  } else {
    throw new AppError("Usuario no encontrado");
  }
});

//@desc Update user profile
//@router /api/user/profile
//@acces Public
export const updateProfile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  //Primero encontramos si el usuario ya existe.
  const user = await User.findById(_id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;

    const updateUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
      address: user.address,
    });
  } else {
    throw new AppError("Usuario no encontrado");
  }
});

//@desc get all user profiles
//@router /api/user/
//@acces Public
export const getAllProfile = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.json(users);
  } else {
    throw new AppError("Usuario no encontrado");
  }
});

//@desc delete user profile
//@router /api/user/:id
//@acces Public
export const deleteUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({message:"Usuario eliminado"})
  } catch (error) {
    throw new AppError("Usuario no encontrado");
  }
});
