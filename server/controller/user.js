const bcrypt = require('bcryptjs');
const User = require('../model/users');
const generateAuthToken = require('../middleware/generateToken');

const signupHandler = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.json({ msg: "Please provide a username, email, and password to continue" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ msg: 'User already exists', status: 'error' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        req.user = newUser;

        await generateAuthToken(req, res, async () => {
            res.cookie('token', req.token, { httpOnly: true });
            return res.json({ msg: 'User created successfully', status: 'success', user: newUser, token: req.token });
        });
    } catch (error) {
        return res.json({ msg: "Signup failed", error: error.message });
    }
};

const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({ msg: 'User not found', status: 'error' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            req.user = existingUser;
            await generateAuthToken(req, res, async () => {
                res.cookie('token', req.token, { httpOnly: true });
                return res.json({ msg: "Login successful", status: 'success', user: existingUser, token: req.token });
            });
        } else {
            return res.json({ msg: 'Invalid credentials', status: 'error' });
        }
    } catch (error) {
        return res.json({ msg: "Login failed", error: error.message });
    }
};

const logoutHandler = async (req, res) => {
    try {
        const { token } = req.cookies;

        const user = await User.findOneAndUpdate({ token }, { token: null });

        if (user) {
            res.clearCookie('token');
            return res.json({ msg: "Logout successful", status: 'success' });
        } else {
            return res.json({ msg: "Logout failed: User not found", status: 'error' });
        }
    } catch (error) {
        return res.json({ msg: "Logout failed", error: error.message });
    }
};

module.exports = { signupHandler, loginHandler, logoutHandler };
