import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import Joi from "joi";

export const updateUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const login = async (req, res) => {
  try {
    const { error } = loginValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: "Email or password is wrong" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({ message: "Email or password is wrong" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: "Not authorized" });

    user.token = null;
    await user.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
