import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const JWT_SECRET = "vansh";

if (!JWT_SECRET) {
    console.log("JWT_SECRET environment variable is not set");
}

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Signup request received with body:", req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Missing email or password in signup request");
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists with email:", email);
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Create a new user
        const user = new User({ email, password });
        await user.save();
        console.log("User created successfully with ID:", user._id);

        // Generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });

        console.log("Token generated for user ID:", user._id);

        // Send success response
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Signin request received with body:", req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Missing email or password in signin request");
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid credentials: user not found with email:", email);
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log("Invalid credentials: incorrect password for user ID:", user._id);
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });

        console.log("User signed in successfully with ID:", user._id);

        // Send success response
        res.json({ message: "User signed in successfully", token });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Error signing in", error });
    }
};
