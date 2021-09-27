const Todo = require("../modal/Todo.modal");

module.exports.index = async (req, res) => {
	try {
		const todos = await Todo.find().populate("userId").exec();
		res.send({ success: true, data: todos })
	} catch (err) {
		res.status(300).send({ success: false, error });
	}
}

module.exports.create = async (req, res) => {
	const { title, description, status } = req.body;
	if (!title) {
		res.send({ success: false, error: "Todo title is required" });
		return;
	}
	try {
		const todo = await Todo.create({ title, description, status, userId: req.userId });
		res.send({ success: true, todo });
	} catch (err) {
		res.status(300).send({ status: false, error: err.message });
	}
}

module.exports.update = async (req, res) => {
	const { todo_id } = req.params;
	const { title, description, status } = req.body;
	if (!title) {
		res.send({ success: false, error: "Todo title is required" });
		return;
	}
	try {
		const todo = await Todo.updateOne({ _id: todo_id }, { title, description, status, userId: req.userId });
		res.send({ success: true, todo });
	} catch (err) {
		res.status(300).send({ status: false, error: err });
	}
	res.end();
}

module.exports.delete = async (req, res) => {
	const { todo_id } = req.params;
	try {
		await Todo.deleteOne({ _id: todo_id });
		res.send({ success: true });
	} catch (err) {
		res.status(300).send({ status: false, error: err });
	}
}

module.exports.search = async (req, res) => {
	const { search_text } = req.params;
	let todos;
	try {
		if (!search_text) {
			todos = await Todo.find().populate("userId").exec();
		} else {
			todos = await Todo.find({ $or: [{ title: { $regex: search_text } }, { description: { $regex: search_text } }] }).populate("userId").exec();
		}
		res.json({ success: true, data: todos })
	} catch (err) {
		res.json({ success: false, error: err.message })
	}

}