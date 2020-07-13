import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "../src/interface/layout/index";
import { Home } from "../src/pages/home/index";
import { Signup } from "../src/pages/auth/signup/index";
import { Login } from "../src/pages/auth/login/index"

import { UserInfoContext } from "./contexts/UserContext/index"
import { StartStopButton } from "./contexts/StartStop/index"


export const App = () => {
    return (
        <Router>
            <UserInfoContext>
                <Layout>
                    <StartStopButton>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/signup" exact component={Signup} />
                            <Route path="/login" exact component={Login} />
                        </Switch>
                    </StartStopButton>
                </Layout>
            </UserInfoContext>
        </Router>

    )
}