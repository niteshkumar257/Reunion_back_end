import jwt from "jsonwebtoken";
import { User } from "../Models/user.models.js";

// Login user
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "No User exits" });
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { userId: user._id, isOwner: user.isOwner },
      process.env.JWT_SCERECT,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Register User
const Register = async (req, res) => {
  try {
    const { email, password, isOwner } = req.body;

    const userExit = await User.findOne({ email });

   
    if (!userExit) {
      const user = new User({ email, password});

      await user.save();

      const token = jwt.sign(
        { userId: user._id, isOwner: user.isOwner },
        process.env.JWT_SCERECT,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({ token });
    } else {
      return res.status(400).json({ message: "User already exit" });
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};
export { Login, Register };
