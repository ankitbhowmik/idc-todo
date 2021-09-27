import { TODO_APPEND_TODO, TODO_DELETE_TODO, TODO_ERROR, TODO_GET_TODOS } from "./todo.type";

const INITIAL_STATE = {
    todos: [],
    error: "",
}

const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TODO_GET_TODOS:
            return { ...state, error: "", todos: action.payload }
        case TODO_ERROR:
            return { ...state, error: action.payload }
        case TODO_APPEND_TODO:
            return { ...state, todos: [action.payload, ...state.todos] }
        case TODO_DELETE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== action.todo_id) }

        default:
            return state;
    }
}

export default todoReducer;
