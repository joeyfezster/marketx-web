import React from "react";
import {
    Redirect,
    Route,
    useLocation
} from "react-router-dom";

import { doesJWTExist } from 'shared/utils/loginUtils'
import Header from './Header'

type AppRouteProps = {
    component: any
    restricted?: boolean
    path: string
}

const AppRoute = ({
    component: Component,
    restricted = false,
    path
}: AppRouteProps) => {
    const location = useLocation()
    return (
        <Route
            path={path}
            render={props => {
                if (restricted) {
                    if (doesJWTExist()) {
                        return (
                            <div>
                                <Header />
                                <Component {...props} />
                            </div>
                        )
                    } else {
                        return <Redirect
                            to={{
                                pathname: "/signin",
                                state: { referrer: location.pathname }
                            }}
                        />
                    }
                } else {
                    return <Component {...props} />
                }
            }}
        />
    );
};

export default AppRoute
