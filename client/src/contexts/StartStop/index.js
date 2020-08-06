import React, { createContext, useContext, useState, useEffect } from "react";
import { fnGetDay, fnGetTime, fnCalTime } from "../../../lib/ApiFiles/Api_Timer"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { sendTimeFN } from "../../services/DataService"
import { whoameFN } from "../../services/AuthService"

// Styles
import { StartedButton, StoppedButton, MainContainer } from "./style"


export const StartStopContext = createContext();

export const StartStopButton = props => {
    const { userOn, setUserOn, setUserSession } = useContext(UserInfoContext)
    const { updateUser, setUpdateUser } = useState({ userOn })


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
    const [newTime, setNewTime] = useState(null)


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
            const hour = firstTime.hour // Hora de inicio
            setCurrTime(currTime.mount)

            //Send seconds, hour, day, lastTime to back
            sendTimeFN({ id: userOn._id, seconds: currTime.totalSec, day: day, hour: hour, lastTime: currTime })
                .then(update => {
                    setUserOn(update)
                })
            console.log("Segundos Totales:", currTime.totalSec)
            console.log("Primer time", firstTime, "Segundo time", secondTime, "Diferencia", currTime)
            //Reseteo la Data en el Local.Storage
            localStorage.setItem("timeOne", "")
            localStorage.setItem("timeStatus", "")

        }
    }

    // useEffect(() => {
    //     async function up() {
    //         const update = await whoameFN()
    //         setUserOn(update)
    //         console.log(userOn)
    //     }
    //     up()
    // }, [currTime])


    return (


        <StartStopContext.Provider value={{ start, time, currTime }}>

            {userOn && (
                <MainContainer>
                    {start == false && <StartedButton onClick={() => { push(true) }}>Start</StartedButton>}
                    {start == true && <StoppedButton onClick={() => { push(false) }}>Stop</StoppedButton>}
                    <div><p>Welcome!</p><p>{userOn.username}</p></div>
                </MainContainer>
            )}

            {props.children}
        </StartStopContext.Provider>

    )

}