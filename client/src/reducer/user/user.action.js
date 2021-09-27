import { USERS_SET_LOGIN_INFO, USER_LOGOUT, USER_SET_ALL_USERS } from "./user.type";

export const userSignUp = (fullname, email, password) => async (dispatch) => {
    try {
        const res = await fetch("/user/signup", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, password })
        });
        const data = await res.json();
        if (data.success) dispatch({ type: USERS_SET_LOGIN_INFO, data: data.data, isOnline: true })
        return data;
    } catch (err) {
        return { success: false, error: { server: "cannot fetch data" } };
    }
}

export const userLogin = (email, password) => async (dispatch) => {
    try {
        const res = await fetch("/user/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        if (data.success) dispatch({ type: USERS_SET_LOGIN_INFO, data: data.data, isOnline: true })
        return data;
    } catch {
        return { success: false, errors: { data: "something went wrong" } }
    }
}

export const userLogout = () => async (dispatch) => {
    await fetch("/user/logout");
    dispatch({ type: USER_LOGOUT })
}

export const userVerifyToken = () => async (dispatch) => {
    try {
        const res = await fetch("/user/verify-token");
        const data = await res.json();
        if (data.success) dispatch({ type: USERS_SET_LOGIN_INFO, data: data.data, isOnline: true })
        return true;
    } catch (err) {
        return false;
    }
}

export const userUpdateUserInfo = (fullname, email, image) => async (dispatch, getState) => {
    const userId = getState().user.user_id;
    try {
        const res = await fetch("/user/update-info", {
            method: "put",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, image, _id: userId })
        });
        const data = await res.json();
        if (data.success) dispatch({ type: USERS_SET_LOGIN_INFO, data: data.data, isOnline: true })
        return data;
    } catch (err) {
        console.log(err.message);
        return { success: false, error: err.message }
    }
}

export const userGetAllUser = () => async (dispatch) => {
    try {
        const res = await fetch("/user/all-user");
        const data = await res.json();
        if (data.success) dispatch({ type: USER_SET_ALL_USERS, payload: data.data })
        return data;
    } catch (err) {
        console.log(err.message);
        return { success: false, error: err.message }
    }
}