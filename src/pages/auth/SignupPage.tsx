import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import routePaths from 'shared/routePaths'
import { RegisterUserAction } from './state/authActions'
import SignupForm from './forms/SignupForm'
import { RegisterUserPayload } from './state/types'
import { authStyles } from './styles'


const SignupPage: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = authStyles();
    const location = useLocation<{ referrer?: string }>()
    
    const onSignupSubmit = (payload: RegisterUserPayload) => {
        dispatch(RegisterUserAction(payload))
    }
    const onSignupSuccess = () => {
        history.replace(location?.state?.referrer || routePaths.ROOT)
    }

    return (
        <div className={classes.root}>
            <SignupForm onSubmit={onSignupSubmit} onSuccess={onSignupSuccess} />
        </div>
    );
}

export default SignupPage;
