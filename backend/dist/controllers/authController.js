"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET || "";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'user already exists' });
            return;
        }
        const user = new user_1.User({
            email, password
        });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid Credentials' });
            return;
        }
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid Credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    }
});
exports.signin = signin;
