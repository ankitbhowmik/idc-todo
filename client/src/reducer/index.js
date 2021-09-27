import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk"

import todoReducer from "./todo/todo.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
    todo: todoReducer,
    user: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
