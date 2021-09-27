import { USERS_SET_LOGIN_INFO, USER_LOGOUT, USER_SET_ALL_USERS } from "./user.type";

const INITIAL_STATE = {
    user_id: "",
    fullname: "",
    email: "",
    image: "",
    isOnline: false,
    users: [],
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERS_SET_LOGIN_INFO:
            return {
                ...state,
                user_id: action.data._id,
                fullname: action.data.fullname,
                email: action.data.email,
                isOnline: action.isOnline,
                image: action.data.image,
            };
        case USER_LOGOUT:
            return { ...INITIAL_STATE }
        case USER_SET_ALL_USERS:
            return { ...state, users: action.payload }
        default:
            return state;
    }
}

export default userReducer