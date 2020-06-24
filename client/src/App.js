import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "../src/interface/layout/index";
import { Home } from "../src/pages/home/index";
import { StartStopButton } from "./contexts/StartStop/index"


export const App = () => {
    return (
        <Router>
            <Layout>
                <StartStopButton>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </StartStopButton>
            </Layout>
        </Router>

    )
}