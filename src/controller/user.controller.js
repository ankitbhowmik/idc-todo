const jwt = require("jsonwebtoken");
const User = require("../modal/User.modal");

const twoDaysInMiliSecond = 1000 * 60 * 60 * 60 * 24 * 2;
module.exports.signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const newUser = await User.create({ fullname, email, password });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "2 days" });
        res.cookie("jwt", token, { maxAge: twoDaysInMiliSecond });
        res.status(200).json({ success: true, data: newUser })
    } catch (error) {
        if (error.code === 11000)
            res.status(300).json({ success: false, errors: { email: "Email already taken" } })
        else
            res.send({ success: false, errors: { database: "something went wrong" } });
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2 days" });
        res.cookie("jwt", token, { maxAge: twoDaysInMiliSecond })
        res.send({ success: true, data: user });
    } catch (error) {
        if (error.message.includes("email")) {
            res.status(300).send({ success: false, errors: { email: "No account found with this email" } })
        } else if (error.message.includes("Password")) {
            res.status(300).send({ success: false, errors: { password: "Incorrect password" } })
        } else {
            res.status(300).send({ success: false, errors: { database: "Cannot fetch data from database" } });
        }
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.send({ success: true });
}

module.exports.verifyToken = (req, res) => {
    const cookie = req.cookies;
    if (cookie.jwt) {
        jwt.verify(cookie.jwt, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.send({ success: false });
            } else {
                const newUser = await User.findOne({ _id: decodedToken.userId });
                res.send({ success: true, data: newUser })
            }
        })
    } else {
        res.send({ success: false });
    }
}

module.exports.updateInfo = async (req, res) => {
    const { fullname, email, image, _id } = req.body;
    try {
        const user = await User.findOne({ _id });
        user.fullname = fullname;
        user.email = email;
        user.image = image;
        await user.save();
        res.send({ success: true, data: user });
    } catch (err) {
        res.send({ success: false });
    }
}

module.exports.allUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        res.json({ success: false })
    }
}