import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import routePaths from 'shared/routePaths'
import { LoginUserAction } from './state/authActions'
import SigninForm from './forms/SigninForm'
import { LoginUserPayload } from './state/types'
import { authStyles } from './styles'

const SigninPage: React.FunctionComponent = () => {
    const classes = authStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const onSigninSubmit = (payload: LoginUserPayload) => {
        dispatch(LoginUserAction(payload))
    }
    const onSigninSuccess = () => {
        history.push(routePaths.ROOT)
    }

    return (
        <div className={classes.root}>
            <SigninForm onSubmit={onSigninSubmit} onSuccess={onSigninSuccess} />
        </div>
    );
}

export default SigninPage;
