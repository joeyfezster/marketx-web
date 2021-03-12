import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import routePaths from 'shared/routePaths'
import { RegisterUserAction } from './state/authActions'
import SignupForm from './forms/SignupForm'
import { RegisterUserPayload } from './state/types'
import { authStyles } from './styles'


const SignupPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = authStyles();

    const onSignupSubmit = (payload: RegisterUserPayload) => {
        dispatch(RegisterUserAction(payload))
    }
    const onSignupSuccess = () => {
        history.push(routePaths.ROOT)
    }

    return (
        <div className={classes.root}>
            <SignupForm onSubmit={onSignupSubmit} onSuccess={onSignupSuccess} />
        </div>
    );
}

export default SignupPage;
