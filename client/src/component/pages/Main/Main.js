import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useRouteMatch, Switch, Route } from "react-router-dom";

import TopBar from "../../molecule/TopBar/TopBar";
import Setting from "../../molecule/Setting/Setting";
import EditTodo from "../../molecule/EditTodo/EditTodo";
import CommingSoon from "../../molecule/CommingSoon/CommingSoon";

import MainProject from "../../organism/MainProject/MainProject";
import MainLeftNavigation from "../../organism/MainLeftNavigation/MainLeftNavigation";

import { userGetAllUser } from "../../../reducer/user/user.action";
import "./main.css";

const Main = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userGetAllUser());
    }, [dispatch])

    return (
        <div className="main-container">
            <MainLeftNavigation />
            <div className="main-content">
                <TopBar />
                <Switch>
                    <Route path={path + "/projects"} component={MainProject} />
                    <Route path={path + "/edit-todo"} component={EditTodo} />
                    <Route path={path + "/settings"} component={Setting} />
                    <Route path={path + "/overview"} component={CommingSoon} />
                    <Route path={path + "/stats"} component={CommingSoon} />
                    <Route path={path + "/chat"} component={CommingSoon} />
                    <Route path={path + "/calendar"} component={CommingSoon} />
                    <Route exact path={path}>
                        <Redirect to={path + "/projects"} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Main
