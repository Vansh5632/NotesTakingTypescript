import { Request, Response } from "express";
import { User } from "../models/User.model";
import { UserZodSchema } from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate request body using Zod schema
        const userData = UserZodSchema.parse(req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            res.status(400).json({ message: "Email is already in use" });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user in the database
        const newUser = new User({
            email: userData.email,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET);

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Send success response
        res.status(201).json({
            message: "User created successfully",
            user: { email: newUser.email, id: newUser._id },
        });
    } catch (err) {
        if (err instanceof Error && 'errors' in err) {
            res.status(400).json({ errors: err.errors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default signup;
