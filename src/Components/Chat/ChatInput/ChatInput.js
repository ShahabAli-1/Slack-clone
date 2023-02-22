import React, { useState } from 'react'
import './ChatInput.css'
import Button from '@mui/material/Button';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import {useSelector} from 'react-redux'
import { selectuser } from '../../../features/userSlice'

const ChatInput = ({channelName,channelId}) => {
    const user = useSelector(selectuser)
    const [message,setMessage] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        const channelRef = collection(db,"rooms",channelId,"messages")
        addDoc(channelRef,{
            message:message,
            user: user.username,
            userimage: user.userImage,
            timestamp:serverTimestamp()
        })
    }

  return (
    <div className='chatInput'>
        <form>
            <input placeholder="Type Message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
            <Button type='submit' onClick={sendMessage}>SEND</Button>
        </form>
    </div>
  )
}

export default ChatInput