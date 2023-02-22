import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chat from './Components/Chat/Chat'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectuser } from './features/userSlice'
import { login,logout } from './features/userSlice'

const App = () => {
  const user = useSelector(selectuser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        dispatch(login({
          id:user.uid,
          username:user.displayName,
          userImage:user.photoURL
        }))
      } else {
        dispatch(logout())
      }
    })
  },[])

  return (
    <BrowserRouter>
    {user ? (
    <div className='app'>
        <Header/>
          <div className="app__body">
            <Sidebar/>
              <Routes>
                <Route exact path='/rooms/:roomId' element={<Chat/>}/>  
              </Routes>
          </div>
        {/* React-Router -> Chat Screen */}
      </div>
      ):(
        <Login/>
      )}
      
      </BrowserRouter>
  )
}

export default App