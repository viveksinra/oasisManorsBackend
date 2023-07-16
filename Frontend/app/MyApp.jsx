"use client";
import MainContext from './Components/Context/MainContext';
import React, { Fragment } from 'react'
import "./pageStyle.css";
import Amenities from "./Components/Amenities/Amenities";
import { useState,Suspense,useContext  } from "react";
// import {DARKMODE} from "./Components/Context/types"
import Header from "./Components/Header/Header";
import Enquiry from "./Components/Enquiry/Enquiry";
import Footer from "./Components/Footer/Footer";
import {Grid, TextField, Typography,Box,Button,IconButton,InputAdornment} from '@mui/material';
import { FcBusinessman,FcBusinesswoman } from "react-icons/fc";
import Loading from "./Components/Loading/Loading";

function MyApp() {  
  const {state, dispatch} = useContext(MainContext)
    const [male, setSex] = useState(true);
    const [name, setName]=useState("");
    const [mobile, setMobile] =useState("")
    const handleAvailability = ()=>{
      // console.log({name,mobile,male});
      console.log(state)
    }
    return (
      <Fragment>
        <Header/>
        <Suspense fallback={<Loading />}>
        <TopAbstract/>
        <div id="heroBack">
        <Suspense fallback={<Loading />}>
        <div id="availability">
          <Typography align="center" variant="h6" color="primary" style={{fontFamily: 'Courgette', fontWeight:600}}>Grab the Early Bird Discount</Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton color="primary" component="label" onClick={()=>setSex(!male)}>
          {male ? <FcBusinessman sx={{ color: 'action.active', mr: 1, my: 0.5 }} fontSize={30} /> :   <FcBusinesswoman sx={{ color: 'action.active', mr: 1, my: 0.5 }} fontSize={30} /> }
          </IconButton>
          <TextField id="standard-basic" fullWidth size="small" value={name} onChange={e=>setName(e.target.value)} label="Enter your Full Name" variant="standard" /> 
        </Box>
         </Grid>
         <Grid item xs={12} md={6}>
         <TextField id="standard-basic" fullWidth size="small" InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                +1
              </InputAdornment>
            ),
          }}value={mobile} onChange={e=>setMobile(e.target.value)} label="Mobile Number" type="number" variant="standard" />  
         </Grid>
         <Grid item xs={12} className="center">
         <Button variant="contained" color="success" onClick={handleAvailability}>Check Availability </Button>
         </Grid>
          </Grid>
          </div>
          </Suspense>
        </div>
        
        <Amenities/>
        <Suspense fallback={<Loading />}>
        <Enquiry/>
        <Suspense fallback={<Loading />}>
        <Footer/>
          </Suspense>
          </Suspense>
        </Suspense>
     </Fragment>
    )
  }


  
export function TopAbstract() {
    return (
      <div id="topAbstract"/>
    )
  }

export default MyApp