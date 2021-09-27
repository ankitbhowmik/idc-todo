import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../atom/Input/Input';
import Avatar from '../../atom/Avatar/Avatar';
import GroupAvatar from '../../atom/GroupAvatar/GroupAvatar';

import "./topBar.css";
import { todoSearchTodo } from '../../../reducer/todo/todo.action';

const TopBar = () => {
    const dispatch = useDispatch();
    const { fullname, users } = useSelector(state => state.user);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const onSearch = async (e) => {
        if (e.key === "Enter") {
            setLoading(true);
            await dispatch(todoSearchTodo(search))
            setLoading(false);
        }
    }

    return (
        <div className="top-bar">
            <div className="search-baar">
                {
                    loading
                        ? (<p style={{ marginLeft: 25 }}>loading...</p>)
                        : <Input
                            type="text"
                            value={search}
                            placeholder="Search"
                            StartIcon={FiSearch}
                            onKeyPress={onSearch}
                            onChange={(e) => setSearch(e.target.value)}
                            containerStyle={{ border: "none", padding: 0 }}
                        />
                }
            </div>
            <GroupAvatar avatars={users.map(user => user.image || "/user.jpg")} />
            <Avatar title={`Hi ${fullname}`} imageSrc="/user.jpg" />
        </div>
    )
}

export default TopBar
