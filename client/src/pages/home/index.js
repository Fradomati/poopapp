import React, { useContext, useState, useEffect } from "react";
import { StartStopContext } from "../../contexts/StartStop/index"

export const Home = props => {

    const { start, time, currTime } = useContext(StartStopContext)
    const [timer, setTimer] = useState("Nothing")

    useEffect(() => {
        if (time != "") {
            setTimer(`Hour: ${time.hour}, Min: ${time.min}, Sec: ${time.sec}`)
        }
    }, [time])

    console.log(start)
    return (
        <>
            <div>Estás en la home</div>
            <div>Tiempos: {timer}</div>
            {currTime && < div > Tu tiempo ha sido: {currTime.hour}h: {currTime.min}m: {currTime.sec}s</div>}
        </>
    )
}