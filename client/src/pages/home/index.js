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

    // CONTEXTS
    const { start, time, currTime } = useContext(StartStopContext)
    const { userOn } = useContext(UserInfoContext)
    const { userSession, noneSession } = useContext(UserSessionContext)

    // STATES OF USER
    const [session, setSession] = useState()
    const [closeSession, setCloseSession] = useState()

    // STATES OF DATA TIMERS

    const [timer, setTimer] = useState("Nothing")
    const [halfTime, setHalfTime] = useState({ hour: 0, min: 0, sec: 0 })
    const [lastTime, setLastTime] = useState({ hour: 0, min: 0, sec: 0 })
    const [totalTime, setTotalTime] = useState({ hour: 0, min: 0, sec: 0 })
    const [favDay, setFavDay] = useState("Ninguno")
    const [favHour, setFavHour] = useState("Ninguna")

    // Check session on ON "LOCAL STORAGE"
    //  const session = localStorage.getItem("sessionOn")


    // If there are session on, then it set "Session" to hide the "Loading" and show the data.
    useEffect(() => {
        if (userSession) setSession(true)
    }, [userSession])

    // If there aren't session on, then it set "Close Session" to redirect user to login
    useEffect(() => {
        if (noneSession) setCloseSession(true)
    }, [noneSession])

    // Check time

    useEffect(() => {
        if (time != "") {
            setTimer(`Hour: ${time.hour}, Min: ${time.min}, Sec: ${time.sec}`)
        }
    }, [time])

    // CHECK USER DATA
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


    if (session) {

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

    } else if (closeSession) {
        return <Redirect to="/login" />
    }
    else if (!session) {
        return (<p>Cargando...</p>)

    }
}