const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
	fullname: {
		type: String,
		required: [true, "Full name is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	image: {
		type: String,
		default: "",
	}
})

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const match = await bcrypt.compare(password, user.password);
		if (match) return user;
		else throw new Error("Incorrect Password");
	} else {
		throw new Error("Incorrect email")
	}
}

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
})

const User = mongoose.model("user", userSchema);
module.exports = User;