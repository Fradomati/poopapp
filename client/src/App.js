import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "../src/interface/layout/index";
import { Home } from "../src/pages/home/index";
import { Signup } from "../src/pages/auth/signup/index";
import { Login } from "../src/pages/auth/login/index"
import { ForgotPassword } from "../src/pages/auth/forgotPW/index"
import { ModifyProfile } from "../src/pages/auth/modifyProfile/index"

import { UserInfoProvider } from "./contexts/UserContext/index"
import { StartStopButton } from "./contexts/StartStop/index"


export const App = () => {
    return (
        <Router>
            <UserInfoProvider>
                <Layout>
                    <StartStopButton>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/signup" exact component={Signup} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/forgot-password" exact component={ForgotPassword} />
                            <Route path="/profile" exact component={ModifyProfile} />
                        </Switch>
                    </StartStopButton>
                </Layout>
            </UserInfoProvider>
        </Router>

    )
}