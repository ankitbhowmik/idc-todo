const emailValidator = /\S+@\S+\.\S+/
module.exports.signupValidation = (req, res, next) => {
    const { fullname, email, password } = req.body;
    const errors = {};

    if (!fullname.trim()) errors.fullname = "Full Name is required";

    if (!email.trim()) errors.email = "Email is required";
    else if (!emailValidator.test(email.trim())) errors.email = "Please enter a valid email";

    if (!password.trim()) errors.password = "Please enter password";

    if (Object.keys(errors).length !== 0)
        res.json({ success: false, errors })
    else
        next();
}

module.exports.loginValidation = (req, res, next) => {
    const errors = {};
    const { email, password } = req.body;

    if (!email.trim()) errors.email = "Email is required";
    else if (!emailValidator.test(email.trim())) errors.email = "Please enter valid email address";

    if (!password.trim()) errors.password = "Password is required";

    if (Object.keys(errors).length !== 0)
        res.json({ success: false, errors })
    else
        next();
}