import React from "react";
import {
    Redirect,
    Route
} from "react-router-dom";

import { doesJWTExist } from 'shared/utils/loginUtils'

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
    return (
        <Route
            path={path}
            render={props => {
                if (restricted) {
                    if (doesJWTExist()) {
                        return <Component {...props} />
                    } else {
                        return <Redirect
                        to={{
                            pathname: "/signin",
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
