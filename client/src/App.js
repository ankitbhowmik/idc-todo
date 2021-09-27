import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import Main from "./component/pages/Main/Main";
import Login from "./component/pages/Login/Login";
import ProtectedRoute from "./component/utils/ProtectedRoute";
import { userVerifyToken } from "./reducer/user/user.action";

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(userVerifyToken()).then(jwtSuccess => {
            if (jwtSuccess) history.push("/main/projects")
        })
    }, [dispatch, history])

    return (
        <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/main" component={Main} />
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
        </Switch>
    )
}

export default App;
