import React, { useContext, useState, useEffect } from "react";
import { StartStopContext } from "../../contexts/StartStop/index"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { Redirect } from "react-router-dom";
export const Home = props => {

    const { start, time, currTime } = useContext(StartStopContext)
    const { userOn } = useContext(UserInfoContext)
    const [timer, setTimer] = useState("Nothing")


    // Check session on
    const session = localStorage.getItem("sessionOn")

    useEffect(() => {
        if (time != "") {
            setTimer(`Hour: ${time.hour}, Min: ${time.min}, Sec: ${time.sec}`)
        }
    }, [time])

    console.log(start)
    if (session) {

        return (
            <>
                <div>Estás en la home</div>
                <div>Tiempos: {timer}</div>
                {currTime && < div > Tu tiempo ha sido: {currTime.hour}h: {currTime.min}m: {currTime.sec}s</div>}
            </>
        )
    } else {
        return <Redirect to="/login" />
    }
}