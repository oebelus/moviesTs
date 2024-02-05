var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import Human from '../database/models/Human.js';
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOfUsers = yield Human.findAll();
        res.json(listOfUsers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const usernameExists = yield Human.findOne({ where: { username: req.body.username } });
        const emailExists = yield Human.findOne({ where: { email: req.body.email } });
        if (usernameExists) {
            return res.status(400).json({ error: "Username already exists" });
        }
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists" });
        }
        if (!email) {
            return res.status(400).json({ error: "The Email Field is Important" });
        }
        if (!username) {
            return res.status(400).json({ error: "The Username Field is Important" });
        }
        if (!password) {
            return res.status(400).json({ error: "The Password Field is Important" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield Human.create({
            username: username,
            email: email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });
        res.status(200).json({ message: 'User created successfully', user: user });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
}));
router.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield Human.findOne({ where: { username: username } });
        if (!user)
            return res.status(401).json({ error: 'User not found' });
        const isPasswordValid = yield bcrypt.compare(password, user.password.toString());
        if (!isPasswordValid)
            return res.status(401).json({ error: 'Invalid Password' });
        const userId = user.id;
        return res.status(200).json({ userId, message: 'Login successful' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An Error Occured" });
    }
}));
export default router;
//# sourceMappingURL=Login.js.map