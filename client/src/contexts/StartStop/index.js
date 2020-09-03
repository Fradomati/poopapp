import React, { createContext, useContext, useState, useEffect } from "react";
import { fnGetDay, fnGetTime, fnCalTime } from "../../../lib/ApiFiles/Api_Timer"
import { UserInfoContext } from "../../contexts/UserContext/index"
import { sendTimeFN } from "../../services/DataService"
import { whoameFN } from "../../services/AuthService"
import { ON_user, OFF_user, ASK_user } from "../../services/OnlineUserService"

// Styles
import { StartedButton, StoppedButton, MainContainer, Img, LogoImg, InfoDiv } from "./style"

// Icons 
import bano from "../../../public/images/icons/bano.png"
import openBano from "../../../public/images/icons/bano-abierto.png"
import logo from "../../../public/images/icons/Pooptime-Logo2.png"
import logoAnimated from "../../../public/images/icons/Poop-Time-gif.gif"

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

    // ID USUARIO
    const user_id = userOn?._id

    // Number of online user
    const [onlineUsers, setOnlineUsers] = useState("0")
    const [welcomeMsg, setWelcomeMsg] = useState(false)

    // Timer of Welcome Message

    // const timer = setInterval(() => {
    //     console.log(welcomeMsg, "------- Hello Msg -------")
    //     setWelcomeMsg(null)
    // }, 3500)


    useEffect(() => {
        // if (welcomeMsg == true) {
        //     timer()
        // } else {
        //     clearInterval(timer)
        // }
        ASK_user().then(data => {
            const arr = data?.TotalUserOnline
            const num = arr.length
            console.log("Nº:", num)
            setOnlineUsers(num)
        })
    }, [])


    const push = x => {
        setStart(x)
        let day = fnGetDay()
        let time = fnGetTime()
        setTime(time)
        if (x == true) {
            // Send first Time to LocalStorage
            localStorage.setItem("timeOne", JSON.stringify(time))
            localStorage.setItem("timeStatus", true)

            // User Online declaration
            ON_user(user_id).then(update => {
                console.log("Usuarios Online", update)
                const arr = update?.TotalUserOnline
                const num = arr.length
                console.log("Nº:", num)
                setOnlineUsers(num)
            })

            console.log("hols")


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
            //Reseteo la Data en el Local.Storage
            localStorage.setItem("timeOne", "")
            localStorage.setItem("timeStatus", "")

            // User Offline declaration
            OFF_user(user_id).then(update => {
                console.log("Usuarios Offline", update)
                const arr = update?.TotalUserOnline
                const num = arr.length
                console.log("Nº:", num)
                setOnlineUsers(num)
            })

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
                    {start == false && <StartedButton onClick={() => { push(true) }}><Img src={bano}></Img></StartedButton>}
                    {start == true && <StoppedButton onClick={() => { push(false) }}><Img src={openBano} ></Img></StoppedButton>}
                    <LogoImg src={start ? logoAnimated : logo}></LogoImg>

                    <InfoDiv>{welcomeMsg == true ? `Welcome ${userOn.username}` : onlineUsers}</InfoDiv>
                </MainContainer>
            )
            }

            {props.children}
        </StartStopContext.Provider >

    )

}