import { useState } from "react";
import { Container } from '@mui/material';
import { Formik } from 'formik'

import * as yup from 'yup'


function Auth({ setParent }) {
    const [signup, setSignUp] = useState(true)
    
    const signupSchema=  yup.object().shape({
        username: yup.string().min(5, 'Username too short!').max(15, 'Username too long!'),
        password: yup.string().min(5, 'Username too short!').max(15, 'Username too long!'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Password must match')
    })
    const loginSchema=  yup.object().shape({
        username: yup.string().required('username required'),
        password: yup.string().required('username required')
    })

    function toggleSignup() {
        setSignUp((currentSignup) => !currentSignup)
    }

    const handleSubmit = (values) => {
        const endpoint = signup ? '/parent' : '/login'
        fetch(endpoint, {
            method: 'POST',
            headers: {
                "Content-type" : 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((parent) => {
                    setParent(parent) 
                })
                
            } else {
                console.log('errors? handle them')
            }
            })
        }
    
    return (
        <Container maxWidth='sm'>
            <button onClick={toggleSignup}>{signup ? 'Login instead!': 'Register for an account'}</button>
            <Formik
            initialValues={{
                username: '',
                password: '',
                passwordConfirmation: ''
            }}
            validationSchema= {signup ? signupSchema : loginSchema}
            onSubmit={handleSubmit}
            >
                {({handleSubmit, values, handleChange}) => (
                    <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username:</label>
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        required
                        value={values.username}
                        onChange={handleChange}
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        required
                        value={values.username}
                        onChange={handleChange}
                    />
                    {signup && <>
                    <label htmlFor='passwordConfirmation'>Password Confirmation:</label>
                    <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        placeholder="Password Confirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                    />
                    </> }
                    <button type='submit' >Submit</button>
                    </form>
                )}
            </Formik>
            
        </Container>
    )

}