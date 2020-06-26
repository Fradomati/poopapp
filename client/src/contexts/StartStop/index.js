import React, { createContext, useState, useEffect } from "react";
import { StartedButton, StoppedButton } from "./style"
import { fnGetDay, fnGetTime } from "../../../lib/ApiFiles/Api_Timer"

export const StartStopContext = createContext();

export const StartStopButton = props => {

    const [start, setStart] = useState(false)
    const [time, setTime] = useState("")

    const push = x => {
        setStart(x)
        let day = fnGetDay()
        let time = fnGetTime()
        setTime(time)

    }


    return (


        <StartStopContext.Provider value={{ start, time }}>

            <div>
                {start == false && <StartedButton onClick={() => { push(true) }}>Start</StartedButton>}
                {start == true && <StoppedButton onClick={() => { push(false) }}>Stop</StoppedButton>}
            </div>

            {props.children}
        </StartStopContext.Provider>

    )

}