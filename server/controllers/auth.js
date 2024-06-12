import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "cloudinary";

// Register User
export const register = async (req, res) => {
  try {
    console.log("Inside register");
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
      bio,
      relationshipStatus,
      dob,
    } = req.body;

    console.log("Request Body: ", req.body);
    console.log("Request File: ", req.file);

    // Check if req.file is present
    if (!req.file) {
      return res.status(400).json({ message: "Picture is required" });
    }

    // A random salt will be generated to encrypt the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "SocioVerse_Images",
      public_id: `${Date.now()}-${req.file.originalname}`,
    });

    console.log("Cloudinary upload result:", result);

    // Use the secure_url directly from Cloudinary
    const imageUrl = result.secure_url;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: imageUrl, // Store the direct URL
      friends,
      location,
      occupation,
      viewedProfile: 0,
      impressions: 0,
      profileLock: false,
      bio,
      relationshipStatus,
      dob,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};


// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials. " });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
