import React,{useEffect,useState} from 'react'
import './Sidebar.css'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from './SidebarOption/SidebarOption';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { db, storage } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectuser } from '../../features/userSlice';

const Sidebar = () => {
  const [channels,setChannels] = useState([])
  const user = useSelector(selectuser)
  
  useEffect(() => {
    const collectionRef = collection(db,"rooms") 
    onSnapshot(collectionRef, (snapshot) => {
      setChannels(snapshot.docs.map(doc => ({
        id:doc.id,
        name:doc.data().name
      })))
    }) 
  },[])


  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Streets 17 HQ</h2>
          <h3><FiberManualRecordIcon/>
            {user.username}
          </h3>
        </div>
        <CreateIcon/>
    </div>
    <SidebarOption Icon={InsertCommentIcon} title="threads"/>
    <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
    <SidebarOption Icon={DraftsIcon} title="Saved Items"/>
    <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser"/>
    <SidebarOption Icon={PeopleAltIcon} title="People & user groups"/>
    <SidebarOption Icon={AppsIcon} title="Apps"/>
    <SidebarOption Icon={FileCopyIcon} title="File browser"/>
    <SidebarOption Icon={ExpandLessIcon} title="Show less"/>
    <hr />
    <SidebarOption Icon={ExpandMoreIcon} title="Channels"/>
    <hr />
    <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption/>
    
    {/* Connect to db and list all the channels */}
    {/* SidebarOption... */}
    {channels.map(channel => (
      <SidebarOption key={channel.id} title={channel.name} id={channel.id}/>
    ))}
    </div>
  )
}

export default Sidebar