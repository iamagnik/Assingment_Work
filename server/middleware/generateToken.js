const jwt = require('jsonwebtoken');

const generateAuthToken = async (req, res, next) => {
    try {
        const { user } = req;
        const token = jwt.sign(
            {
                id: user._id,
                name: user.username,
                email: user.email,
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        user.token = token;
        await user.save();

        req.token = token;
        next();
    } catch (error) {
        res.status(500).json({ msg: "Failed to generate auth token", error: error.message });
    }
};

module.exports = generateAuthToken;
