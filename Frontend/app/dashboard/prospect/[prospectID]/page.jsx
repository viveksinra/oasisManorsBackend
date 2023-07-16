'use client';
import React, { lazy,Suspense, useState } from 'react'
import "./prospectStyle.css";
import {Tabs,Tab} from '@mui/material/'; 
import { FcBusinessman,FcCallback,FcTodoList,FcInspection,FcSettings } from "react-icons/fc";
import ProfileTab from "./ProfileTab";
const ContactTab = lazy(() => import("./ContactTab"));
const TasksTab = lazy(() => import("./TasksTab"));
const NotesTab = lazy(() => import("./NotesTab"));
const Settings = lazy(() => import("./SettingsTab"));

const TabPanel = ({value, prospectId})=>{
    switch (value) {
        case 0:
          return <ProfileTab prospectId={prospectId}/>
        case 1:
          return <Suspense fallback={null}> <ContactTab prospectId={prospectId}/></Suspense> 
        case 2:
          return <Suspense fallback={null}><TasksTab prospectId={prospectId}/></Suspense>   
        case 3:
          return <Suspense fallback={null}> <NotesTab prospectId={prospectId}/> </Suspense>  
        case 4:
          return <Suspense fallback={null}> <Settings prospectId={prospectId}/> </Suspense>
        default:
          break;
    }
  }

const ProspectDetail = ({ params }) => {
    const [mainTab, setMainTab]=useState(0)
  return (
    <main> 
    <Tabs value={mainTab} onChange={(e,v)=>setMainTab(v)} aria-label="main_Tabs" sx={{height:60}}>
    <Tab icon={<FcBusinessman style={{fontSize:24}}/>} iconPosition="start" label="Profile"  />
    <Tab icon={<FcCallback style={{fontSize:24}}/>} iconPosition="start"  label="Contact"  />
    <Tab icon={<FcTodoList style={{fontSize:24}}/>} iconPosition="start"  label="Tasks" />
    <Tab icon={<FcInspection style={{fontSize:24}}/>} iconPosition="start" label="Notes"  />
    <Tab icon={<FcSettings style={{fontSize:24}}/>} iconPosition="start" label="Settings" />
  </Tabs>
     <TabPanel value={mainTab} prospectId={params?.prospectId}/>
    </main>
  )
}


export default ProspectDetail;