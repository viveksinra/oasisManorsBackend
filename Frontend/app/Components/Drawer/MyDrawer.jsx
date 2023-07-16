'use client';
import "./drawerStyle.css";
import {Typography,Avatar,List,ListSubheader,ListItemButton,ListItemIcon,ListItemText, Divider  } from '@mui/material/';
import { useState } from "react";
import Link from 'next/link';
import { FcPicture,FcHome, FcKindle,FcStackOfPhotos,FcCurrencyExchange,FcInvite} from "react-icons/fc";


const MyDrawer = ({handleDrawer}) => {
const list1 = [{title:"Home",icon:<FcHome/>, link:"/"},{title:"About Us",icon:<FcKindle/>, link:"/about"},{title:"Our Amenities",icon:<FcStackOfPhotos/>, link:"/amenities"},{title:"Gallery",icon:<FcPicture/>, link:"/gallery"},{title:"Pricing",icon:<FcCurrencyExchange/>, link:"/pricing"},{title:"Contact",icon:<FcInvite/>, link:"/contact"}]
  return (
    <div>
      <div id="topDrawer" style={{width:260}}>
       <span className="center"><Typography variant="caption" style={{paddingTop:10}} color="primary">Welcome Raghav</Typography></span>
       <div id="DrawerAvatar">
       <Avatar alt="Travis Howard" sx={{ width: 60, height: 60,border:"3px solid #fff" }} style={{marginLeft:"auto",marginRight:"auto"}} src="https://mui.com/static/images/avatar/2.jpg" />
       </div>
      </div>
      <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      dense
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Navigate to :- 
        </ListSubheader>
      }
    >
      {list1.map(l=> <Link href={l.link} key={l.title} onClick={()=>handleDrawer()}>
        <ListItemButton>
        <ListItemIcon style={{fontSize:24}}>
          {l.icon}
        </ListItemIcon>
        <ListItemText primary={l.title} />
      </ListItemButton>
      </Link> )}
      <br/>
      <Divider/>
      <br/>

    </List>
     
<br/>
<button onClick={()=>handleDrawer()}>Close Me</button>
   </div>
  )
}

export default MyDrawer