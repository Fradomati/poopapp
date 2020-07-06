import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { charactersValidation } from '../../../../lib/Validation/Signup_Validation'

export const Signup = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    const [passChecked, setPassChecked] = useState({
        count: 0,
        upperCase: false,
        number: false
    })

    useEffect(() => {
        console.log(passChecked)
    }, [status])
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Usuario" name="username" onKeyPress={(e) => {
                console.log(e.key)
                const t = charactersValidation(e.key);
                t == "Upper" ? setPassChecked({ count: passChecked.count + 1, upperCase: true, number: passChecked.number }) : setPassChecked({ count: passChecked.count + 1, upperCase: passChecked.upperCase, number: passChecked.number })
            }} ref={register({ min: 2 })} />
            <input type="text" placeholder="Email" name="email" ref={register({
                required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
            })} />
            <input type="text" placeholder="Contraseña" name="password" ref={register({
                required: true, min: 8,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
            })} />

            <input type="submit" />
        </form>
    )
}