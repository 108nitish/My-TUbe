import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
  console.log("signupcaleed");
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hash = await bcrypt.hash(req.body.password, salt); 
        const newUser = new User({ ...req.body, password: hash });  
        await newUser.save();
        res.status(200).send("User has been created successfully!!");
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User Not Found!!"));

        const isCorrect =  bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials."));

        const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "30d" });  
        const { password, ...others } = user._doc;  

        res.cookie("access-token", token, { httpOnly: true })
            .status(200)
            .json({ ...others, token }); // Sending token in response
    } catch (err) {
        next(err);
    }
};
