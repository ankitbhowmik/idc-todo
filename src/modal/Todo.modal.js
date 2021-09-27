const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	title: String,
	description: String,
	status: {
		type:String,
		default:"To do"
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
})

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;