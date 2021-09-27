const jsonwebtoken = require("jsonwebtoken");

module.exports.verifyJwt = (req, res, next) => {
	const { jwt } = req.cookies;
	if (jwt) {
		jsonwebtoken.verify(jwt, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.json({ success: false });
			} else {
				req.userId = decodedToken.userId;
				next();
			}
		})

	} else {
		res.json({ success: false });
	}
}