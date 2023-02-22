import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { db } from '../../firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import Message from './Message/Message';
import ChatInput from './ChatInput/ChatInput';


const Chat = () => {
    const {roomId} = useParams();
    const [roomDetails,setRoomDetails] = useState('')
    const [roomMessages,setRoomMessages] = useState([])

    useEffect(() => {
        const docRef = doc(db,`rooms/${roomId}`)
        getDoc(docRef).then(doc => {
            setRoomDetails(doc.data())
        })

        const msgCollRef = collection(db,"rooms",roomId,"messages") 
        const q = query(msgCollRef,orderBy("timestamp","asc"))

        onSnapshot(q,(snapshot) => {
            setRoomMessages(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            })))
        })
    },[roomId])


  return (
    <div className='chat'>
        <div className="chat__header">
            <div className="chat__headerLeft">
                <h4 className="chat__channelName">
                    <strong>#{roomDetails?.name}</strong>
                    <StarBorderOutlinedIcon/>
                </h4>
            </div>
            <div className="chat__headerRight">
                <p>
                   <InfoOutlinedIcon/> Details
                </p>
            </div>
        </div>

        <div className="chat__messages">
            {roomMessages.map(({id,data:{message,timestamp,user,userimage}}) => (
                <Message 
                    key={id}
                    message={message}
                    user={user}
                    userImage={userimage}
                    timestamp={timestamp}
                />
            ))}
        </div>
        
        <ChatInput channelName={roomDetails?.name} channelId={roomId}/>


    </div>
  )
}

export default Chat