import { TODO_APPEND_TODO, TODO_DELETE_TODO, TODO_ERROR, TODO_GET_TODOS } from "./todo.type";

export const todoGetTodos = () => async (dispatch) => {
    try {
        const request = await fetch("/api/index", {
            method: "get",
            credentials: "include"
        });
        const data = request.ok ? await request.json() : Promise.reject();
        if (data.success) {
            dispatch({ type: TODO_GET_TODOS, payload: data.data })
        } else {
            dispatch({ type: TODO_ERROR, payload: "Not sign in" })
        }
    } catch (err) {
        dispatch({ type: TODO_ERROR, payload: "something went wrong" })
    }
}

export const todoCreateTodo = (title, description, status) => async (dispatch) => {
    try {
        const res = await fetch("/api/create", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ title, description, status })
        });
        const data = await res.json();
        if (data.success) dispatch({ type: TODO_APPEND_TODO, payload: data.todo })
        return data;
    } catch (err) {
        return { success: false, error: "server error" }
    }
}

export const todoOnDropItem = (dragItemId, todoSectionName) => (dispatch, getState) => {
    const { todo: { todos } } = getState();
    const selectedTodo = todos.find(data => data._id === dragItemId);
    //if todo is dropped into same todoSection then do nothing
    if (selectedTodo.status === todoSectionName) {
        return;
    }
    const newTodos = todos.map(todo => {
        if (todo._id === dragItemId) {
            todo.status = todoSectionName
        }
        return todo;
    })
    dispatch({ type: TODO_GET_TODOS, payload: newTodos });
    fetch(`/api/update/${dragItemId}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: selectedTodo.title,
            description: selectedTodo.description,
            status: todoSectionName
        })
    })
        .then(() => { })
        .catch(() => { })
}

export const todoSearchTodo = (search) => async (dispatch) => {
    try {
        const request = await fetch("/api/search/" + search, {
            method: "get",
            credentials: "include"
        });
        const data = request.ok ? await request.json() : Promise.reject();
        if (data.success) {
            dispatch({ type: TODO_GET_TODOS, payload: data.data })
        }
    } catch (err) {
        alert("something went wrong");
    }
    return true;
}

export const todoDeleteTodo = (todo_id) => async (dispatch) => {
    try {
        const request = await fetch("/api/delete/" + todo_id, {
            method: "delete",
            credentials: "include"
        });
        const data = request.ok ? await request.json() : Promise.reject();
        if (data.success) {
            dispatch({ type: TODO_DELETE_TODO, todo_id })
        }
        return data.success;
    } catch (err) {
        alert("something went wrong");
    }
    return false;
}
