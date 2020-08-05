import React, { useContext, useState, useEffect } from "react";
import { StartStopContext } from "../../contexts/StartStop/index"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { Redirect } from "react-router-dom";
import { fnHalfTime, fnSumTime, fnDayWeek, fnHourDay, fnMountTime } from "../../../lib/ApiFiles/Api_Timer"

// Styles

import { MainSection, Section, HightData, TitleData, Data, TimeDetails } from "./style"
import { Container } from "../globalStyles"

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
            <Container>
                <MainSection>
                    <Section>
                        <HightData><TitleData>Tiempos:</TitleData> <Data>{timer}</Data></HightData>
                        {currTime && < HightData > <TitleData>Tu tiempo ha sido:</TitleData> <Data>{currTime.hour}<TimeDetails>h</TimeDetails> {currTime.min}<TimeDetails>m</TimeDetails> {currTime.sec}<TimeDetails>s</TimeDetails></Data></HightData>}
                    </Section>
                    <Section>
                        <HightData><TitleData>Última vez</TitleData> <Data>{lastTime.hour}<TimeDetails>h</TimeDetails> {lastTime.min}<TimeDetails>m</TimeDetails> {lastTime.sec}<TimeDetails>s</TimeDetails></Data></HightData>
                        <HightData><TitleData>Tiempo Medio</TitleData> <Data>{halfTime.hour}<TimeDetails>h</TimeDetails> {halfTime.min}<TimeDetails>m</TimeDetails> {halfTime.sec}<TimeDetails>s</TimeDetails></Data></HightData>
                        <HightData><TitleData>Tiempo Total</TitleData> <Data>{totalTime.hour}<TimeDetails>h</TimeDetails> {totalTime.min}<TimeDetails>m</TimeDetails> {totalTime.sec}<TimeDetails>s</TimeDetails></Data></HightData>
                    </Section>
                    <Section>
                        <HightData><TitleData>Día Favorito</TitleData> <Data>{favDay}</Data></HightData>
                        <HightData><TitleData>Hora Favorita</TitleData> <Data>{favHour}</Data></HightData>
                    </Section>
                </MainSection>
            </Container>
        )
    } else {
        return <Redirect to="/login" />
    }
}