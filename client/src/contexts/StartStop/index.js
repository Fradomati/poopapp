import React, { createContext, useState, useEffect } from "react";
import { StartedButton, StoppedButton } from "./style"
import { fnGetDay, fnGetTime } from "../../../lib/ApiFiles/Api_Timer"

export const StartStopContext = createContext();

export const StartStopButton = props => {

    const [start, setStart] = useState(() => {
        const status = localStorage.getItem("timeStatus")
        if (localStorage.getItem("timeStatus") == "true") {
            console.log("Bla")
            return true
        } else {
            console.log("Blue")
            return false
        }
    })
    const [time, setTime] = useState("")




    const push = x => {
        setStart(x)
        let day = fnGetDay()
        let time = fnGetTime()
        setTime(time)

        if (x == true) {
            localStorage.setItem("timeOne", JSON.stringify(time))
            localStorage.setItem("timeStatus", true)
        } else {
            let test = JSON.parse(localStorage.getItem("timeOne"))
            console.log("Primer time", test, "Segundo time", time)
            localStorage.setItem("timeOne", "")
            localStorage.setItem("timeStatus", "")
        }

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