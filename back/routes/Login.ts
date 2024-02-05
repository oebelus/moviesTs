import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import Human from '../database/models/Human.js';
import { UUIDV4 } from 'sequelize';

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    try {
        const listOfUsers = await Human.findAll()
        res.json(listOfUsers)
    } catch (err) {
        res.status(500).json({ message: (err as Error).message })
    }
})

router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body
    try {
        const usernameExists = await Human.findOne({ where: { username: req.body.username}})
        const emailExists = await Human.findOne({ where: { email: req.body.email}})
        if (usernameExists) {
            return res.status(400).json ({ error: "Username already exists" })
        }
        if (emailExists) {
            return res.status(400).json ({ error: "Email already exists" })
        }
        if (!email) {
            return res.status(400).json ({ error: "The Email Field is Important" })
        }
        if (!username) {
            return res.status(400).json ({ error: "The Username Field is Important" })
        }
        if (!password) {
            return res.status(400).json ({ error: "The Password Field is Important" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Human.create({
            username: username,
            email: email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        })
        res.status(200).json({ message: 'User created successfully', user: user });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: (err as Error).message });
    }
})

router.post('/auth', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Human.findOne({ where: {username: username}})

        if (!user) 
            return res.status(401).json({ error: 'User not found' })
        const isPasswordValid = await bcrypt.compare(password, user.password.toString());
        if (!isPasswordValid)
            return res.status(401).json( { error: 'Invalid Password'})
        const userId = user.id
        return res.status(200).json({userId, message: 'Login successful'})
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "An Error Occured"})
    }
})

export default router