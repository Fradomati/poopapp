import React, { createContext, useState, useEffect } from "react";
import { StartedButton, StoppedButton } from "./style"
import { fnGetDay, fnGetTime, fnCalTime } from "../../../lib/ApiFiles/Api_Timer"

export const StartStopContext = createContext();

export const StartStopButton = props => {

    const [start, setStart] = useState(() => {
        const status = localStorage.getItem("timeStatus")
        if (localStorage.getItem("timeStatus") == "true") {
            return true
        } else {
            return false
        }
    })
    const [time, setTime] = useState("");
    const [currTime, setCurrTime] = useState("")




    const push = x => {
        setStart(x)
        let day = fnGetDay()
        let time = fnGetTime()
        setTime(time)

        if (x == true) {
            // Send first Time to LocalStorage
            localStorage.setItem("timeOne", JSON.stringify(time))
            localStorage.setItem("timeStatus", true)
        } else {
            const firstTime = JSON.parse(localStorage.getItem("timeOne"))
            const secondTime = time
            const currTime = fnCalTime({ firstTime, secondTime })
            setCurrTime(currTime)
            console.log("Primer time", firstTime, "Segundo time", secondTime, "Diferencia", currTime)


            //Reseteo la Data en el Local.Storage
            localStorage.setItem("timeOne", "")
            localStorage.setItem("timeStatus", "")
        }

    }


    return (


        <StartStopContext.Provider value={{ start, time, currTime }}>

            <div>
                {start == false && <StartedButton onClick={() => { push(true) }}>Start</StartedButton>}
                {start == true && <StoppedButton onClick={() => { push(false) }}>Stop</StoppedButton>}
            </div>

            {props.children}
        </StartStopContext.Provider>

    )

}