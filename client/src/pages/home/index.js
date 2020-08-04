import React, { useContext, useState, useEffect } from "react";
import { StartStopContext } from "../../contexts/StartStop/index"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { Redirect } from "react-router-dom";
import { fnHalfTime, fnSumTime, fnDayWeek, fnHourDay, fnMountTime } from "../../../lib/ApiFiles/Api_Timer"

export const Home = props => {

    const { start, time, currTime } = useContext(StartStopContext)
    const { userOn } = useContext(UserInfoContext)
    const [timer, setTimer] = useState("Nothing")

    // Data Times

    const [halfTime, setHalfTime] = useState({ hour: 0, min: 0, sec: 0 })
    const [lastTime, setLastTime] = useState({ hour: 0, min: 0, sec: 0 })
    const [totalTime, setTotalTime] = useState({ hour: 0, min: 0, sec: 0 })
    const [favDay, setFavDay] = useState("Ninguno")
    const [favHour, setFavHour] = useState("Ninguna")

    // Check session on
    const session = localStorage.getItem("sessionOn")

    useEffect(() => {
        if (time != "") {
            setTimer(`Hour: ${time.hour}, Min: ${time.min}, Sec: ${time.sec}`)
        }
    }, [time])




    useEffect(() => {
        if (userOn) {
            const allTimes = userOn?.totalTimes
            const allDays = userOn?.days
            const allHours = userOn?.hours
            const last = userOn?.totalTimes[userOn?.totalTimes.length - 1]

            const halfTimeCal = fnHalfTime(allTimes)
            const totalTimeCal = fnSumTime(allTimes)
            const lastTimeCal = fnMountTime(last)
            const dayFavCal = fnDayWeek(allDays)
            const hourFavCal = fnHourDay(allHours)


            setHalfTime(halfTimeCal)
            setTotalTime(totalTimeCal)
            setLastTime(lastTimeCal)
            setFavDay(dayFavCal)
            setFavHour(hourFavCal)
        }
    }, [userOn])


    console.log(start)
    if (session) {

        return (
            <>
                <div>Estás en la home</div>
                <div>Tiempos: {timer}</div>
                {currTime && < div > Tu tiempo ha sido: {currTime.hour}h: {currTime.min}m: {currTime.sec}s</div>}
                <div>Última vez: {lastTime.hour}h - {lastTime.min}m - {lastTime.sec}s</div>
                <div>Tiempo Medio: {halfTime.hour}h - {halfTime.min}m - {halfTime.sec}s</div>
                <div>Tiempo Total: {totalTime.hour}h - {totalTime.min}m - {totalTime.sec}s</div>
                <div>Día Favorito: {favDay}</div>
                <div>Hora Favorita: {favHour}</div>
            </>
        )
    } else {
        return <Redirect to="/login" />
    }
}