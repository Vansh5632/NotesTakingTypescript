"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', authRoutes_1.default);
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => console.log('connected to MongoDb')).catch(err => console.error('mongodb connection error', err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
