import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = (props) => {
    const { isOnline } = useSelector(state => state.user);

    if (isOnline) {
        return <Route {...props} />
    }
    return <Redirect to="/login" />
}

export default ProtectedRoute
