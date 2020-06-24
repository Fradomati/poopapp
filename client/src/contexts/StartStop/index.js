import React, { createContext, useState, useEffect } from "react";
import { StartedButton, StoppedButton } from "./style"

export const StartStop = createContext();

export const StartStopButton = props => {

    const [start, setStart] = useState(false)

    const push = x => {
        setStart(x)
    }


    return (


        <StartStop.Provider>

            <div>
                {start == false && <StartedButton onClick={() => { push(true) }}>Start</StartedButton>}
                {start == true && <StoppedButton onClick={() => { push(false) }}>Stop</StoppedButton>}
            </div>

            {props.children}
        </StartStop.Provider>

    )

}