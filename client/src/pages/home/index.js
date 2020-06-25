import React, { useContext } from "react";
import { StartStopContext } from "../../contexts/StartStop/index"

export const Home = props => {

    const { start } = useContext(StartStopContext)

    console.log(start)
    return (
        <div>Estás en la home</div>
    )
}