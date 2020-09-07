import React, { useContext, useState, useEffect } from "react";
import { StartStopContext } from "../../contexts/StartStop/index"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { UserSessionContext } from "../../../lib/Authentication/withAuthentication"
import { Redirect } from "react-router-dom";
import { fnHalfTime, fnSumTime, fnDayWeek, fnHourDay, fnMountTime } from "../../../lib/ApiFiles/Api_Timer"

// Styles

import { MainSection, Section, HightData, TitleData, Data, DataDivs, TimeDetails } from "./style"
import { Container } from "../globalStyles"

export const Home = ({ value }) => {

    const { start, time, currTime } = useContext(StartStopContext)
    const { userOn } = useContext(UserInfoContext)
    const { userSession } = useContext(UserSessionContext)
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

            // Evito error en producción: 
            const [...arrTotalTimes] = userOn?.totalTimes
            const last = arrTotalTimes[arrTotalTimes.length - 1]


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


    if (userSession) {

        return (
            <Container>
                <MainSection>
                    <Section>
                        <HightData> {currTime && <Data><DataDivs>{currTime.hour}<TimeDetails>hr</TimeDetails></DataDivs><DataDivs> {currTime.min}<TimeDetails>mn</TimeDetails> </DataDivs><DataDivs>{currTime.sec}<TimeDetails>sc</TimeDetails></DataDivs></Data>}<TitleData>Actual</TitleData></HightData>
                    </Section>
                    <Section>
                        <HightData><Data><DataDivs>{lastTime.hour}<TimeDetails>hr</TimeDetails></DataDivs><DataDivs>{lastTime.min}<TimeDetails>mn</TimeDetails></DataDivs><DataDivs>{lastTime.sec}<TimeDetails>sc</TimeDetails></DataDivs></Data><TitleData>Última vez</TitleData> </HightData>
                        <HightData><Data><DataDivs>{halfTime.hour}<TimeDetails>hr</TimeDetails> </DataDivs><DataDivs>{halfTime.min}<TimeDetails>mn</TimeDetails> </DataDivs><DataDivs>{halfTime.sec}<TimeDetails>sc</TimeDetails></DataDivs></Data><TitleData>Tiempo Medio</TitleData></HightData>
                        <HightData><Data><DataDivs>{totalTime.hour}<TimeDetails>hr</TimeDetails> </DataDivs><DataDivs>{totalTime.min}<TimeDetails>mn</TimeDetails> </DataDivs><DataDivs>{totalTime.sec}<TimeDetails>sc</TimeDetails></DataDivs></Data><TitleData>Tiempo Total</TitleData></HightData>
                    </Section>
                    <Section>
                        <HightData><Data>{favDay}</Data><TitleData>Día Favorito</TitleData></HightData>
                        <HightData><Data>{favHour}</Data><TitleData>Hora Favorita</TitleData></HightData>
                    </Section>
                </MainSection>
            </Container>
        )
    } else {
        return <Redirect to="/login" />
    }
}