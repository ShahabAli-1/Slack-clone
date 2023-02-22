import React from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import {auth,provider} from './firebase'
import { signInWithPopup } from 'firebase/auth';
import {useDispatch} from 'react-redux'
import {login} from './features/userSlice'

const Login = () => {
    const dispatch = useDispatch()

    const signIn = (e) => {
        e.preventDefault()
        signInWithPopup(auth,provider)
        .then(authUser => {
            dispatch(login({
                id:authUser.user.uid,
                username:authUser.user.displayName,
                userImage:authUser.user.photoURL
            }))
        })
        .catch(err => alert(err.message))
    }


  return (
    <div className='login'>
        <div className="login__container">
            <img src="https://1000logos.net/wp-content/uploads/2021/06/Slack-logo-500x281.png" alt="" />
            <h1>Sign In to the Streets 17 Chat Room</h1>
            <p>streets17.converse.com</p>
            <Button onClick={signIn}>Sign In with Google</Button>
        </div>
    </div>
  )
}

export default Login