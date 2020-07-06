import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "../src/interface/layout/index";
import { Home } from "../src/pages/home/index";
import { Signup } from "../src/pages/auth/signup/index"
import { StartStopButton } from "./contexts/StartStop/index"


export const App = () => {
    return (
        <Router>
            <Layout>
                <StartStopButton>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/signup" exact component={Signup} />
                    </Switch>
                </StartStopButton>
            </Layout>
        </Router>

    )
}