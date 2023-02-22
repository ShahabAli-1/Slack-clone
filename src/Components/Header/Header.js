import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectuser } from '../../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectuser)


    const sign_out = () => {
        dispatch(logout)
        signOut(auth)
    }

  return (
    <div className='header'>
        <div className="header__left">
            {/* Avatar */}
            <Avatar
                className='header__avatar'
                alt={user.username}
                src={user.userImage}
                onClick={sign_out}
            />
            {/* Time Icon */}
            <AccessTimeIcon/>
        </div>
        <div className="header__search">
            {/* Search Icon */}
            <SearchIcon/>
            {/* Input */}
            <input type="text" placeholder='Search'/>
        </div>
        <div className="header__right">
            {/* Help Icon */}
            <HelpOutlineIcon/>
        </div>
    </div>
  )
}

export default Header