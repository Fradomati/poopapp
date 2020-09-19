import React, { useContext, useState, useEffect } from "react";
import { StartStopContext } from "../../contexts/StartStop/index"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { withProtected } from "../../../lib/Protect/index"

// Styles

import { MainSection, Section, HightData, TitleData, Data, DataDivs, TimeDetails } from "./style"
import { Container } from "../globalStyles"

// Api & Services

import { fnHalfTime, fnSumTime, fnDayWeek, fnHourDay, fnMountTime } from "../../../lib/ApiFiles/Api_Timer"
import { rmLastSessionFN } from "../../services/DataService"

// Components

import { RemoveButton } from "../../components/remove_last_session_button/index"

// Images 

import remove from "../../../public/images/icons/remove.png"
import not from "../../../public/images/icons/not.png"



export const Home = withProtected(() => {

    // CONTEXTS
    const { start, time, currTime } = useContext(StartStopContext)
    const [userOn, setUserOn] = useContext(UserInfoContext)


    // STATES OF DATA TIMERS 

    const initialTimer = { hour: 0, min: 0, sec: 0 }
    const [timer, setTimer] = useState("Nothing")
    const [halfTime, setHalfTime] = useState(initialTimer)
    const [lastTime, setLastTime] = useState(initialTimer)
    const [totalTime, setTotalTime] = useState(initialTimer)
    const [favDay, setFavDay] = useState("Ninguno")
    const [favHour, setFavHour] = useState("Ninguna")



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

            console.log(halfTimeCal.hour, !halfTimeCal.hour, halfTimeCal?.hour)
            isNaN(halfTimeCal.hour) != true ? setHalfTime(halfTimeCal) : setHalfTime(initialTimer)
            isNaN(lastTimeCal.hour) != true ? setLastTime(lastTimeCal) : setLastTime(initialTimer)
            setTotalTime(totalTimeCal)
            setFavDay(dayFavCal)
            setFavHour(hourFavCal)
        }
    }, [userOn])






    const removeSession = () => {
        console.log("Remove last session")
        if (lastTime.hour == 0 && lastTime.min == 0 && lastTime.sec == 0) {
            console.log("There are not session")
        } else {
            console.log("Let go remove")
            const id = userOn?._id
            rmLastSessionFN({ id }).then(response => {
                console.log("Update user", response)
                setUserOn(response)
            })
        }
    }

    return (
        <Container>
            <MainSection>
                <Section>

                    <HightData>
                        <Data>
                            <DataDivs>
                                {lastTime.hour}
                                <TimeDetails>hr</TimeDetails>
                            </DataDivs>
                            <DataDivs>
                                {lastTime.min}
                                <TimeDetails>mn</TimeDetails>
                            </DataDivs>
                            <DataDivs>
                                {lastTime.sec}
                                <TimeDetails>sc</TimeDetails>
                            </DataDivs>
                        </Data>
                        <RemoveButton value={{ lastTime }} />
                    </HightData>
                </Section>
                <Section>
                    <HightData>
                        <Data>
                            <DataDivs>
                                {halfTime.hour}
                                <TimeDetails>hr</TimeDetails>
                            </DataDivs>
                            <DataDivs>
                                {halfTime.min}
                                <TimeDetails>mn</TimeDetails>
                            </DataDivs>
                            <DataDivs>
                                {halfTime.sec}
                                <TimeDetails>sc</TimeDetails>
                            </DataDivs>
                        </Data>
                        <TitleData>Tiempo Medio</TitleData>
                    </HightData>
                    <HightData>
                        <Data>
                            <DataDivs>
                                {totalTime.hour}
                                <TimeDetails>hr</TimeDetails>
                            </DataDivs>
                            <DataDivs>
                                {totalTime.min}
                                <TimeDetails>mn</TimeDetails>
                            </DataDivs>
                            <DataDivs>
                                {totalTime.sec}
                                <TimeDetails>sc</TimeDetails>
                            </DataDivs>
                        </Data>
                        <TitleData>Tiempo Total</TitleData>
                    </HightData>
                </Section>
                <Section>
                    <HightData>
                        <Data>{favDay}</Data>
                        <TitleData>Día Favorito</TitleData>
                    </HightData>
                    <HightData>
                        <Data>{favHour}:00h</Data>
                        <TitleData>Hora Favorita</TitleData>
                    </HightData>
                </Section>
            </MainSection>
        </Container>
    )


})