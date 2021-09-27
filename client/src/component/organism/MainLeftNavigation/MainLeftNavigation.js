import React from 'react'
import { NavLink } from 'react-router-dom'

import "./mainLeftNavigation.css";

import { AiOutlineHome, AiOutlineFolderOpen, AiOutlineCalendar } from "react-icons/ai";
import { IoStatsChartOutline, IoChatboxEllipsesOutline } from "react-icons/io5"
import { BsGear } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../reducer/user/user.action';

const leftTopNav = [
    { Icon: AiOutlineHome, title: "Overview", url: "/overview" },
    { Icon: IoStatsChartOutline, title: "Stats", url: "/stats" },
    { Icon: AiOutlineFolderOpen, title: "Projects", url: "/projects" },
    { Icon: IoChatboxEllipsesOutline, title: "Chat", url: "/chat" },
    { Icon: AiOutlineCalendar, title: "Calendar", url: "/calendar" },
]

const MainLeftNavigation = () => {
    const dispatch = useDispatch();
    const logout = ()=> dispatch(userLogout());

    return (
        <div className="main-left-navigation-container">
            <div className="main-left-navigation">
                <div className="nav-link-group">
                    <p className="nav-logo">.taskez</p>
                    {
                        leftTopNav.map(({ Icon, title, url }) => (
                            <NavLink key={title} to={"/main" + url} activeClassName="nav-active">
                                <div className="nav-link">
                                    <Icon className="nav-icon" />
                                    <span className="nav-title">{title}</span>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
                <div className="nav-link-group nav-bottom-link">
                    <NavLink to="/main/settings" activeClassName="nav-active">
                        <div className="nav-link">
                            <BsGear className="nav-icon" />
                            <span className="nav-title">Settings</span>
                        </div>
                    </NavLink>
                    <div>
                        <div className="nav-link" onClick={logout}>
                            <FiLogOut className="nav-icon" />
                            <span className="nav-title">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLeftNavigation
