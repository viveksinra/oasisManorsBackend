'use client';
import React,{useState,useRef,useEffect} from 'react'
import {Grid, Divider, Typography,TextField, InputAdornment, Button,Alert,AlertTitle} from '@mui/material/';
import {MdVisibility, MdVisibilityOff, MdSend } from "react-icons/md";
import Autocomplete from '@mui/material/Autocomplete';
import { prospectService } from "../../../services";
import { useRouter } from 'next/navigation'
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";


function SettingsTab({prospectId}) {
    const router = useRouter();
    const snackRef = useRef();
    const [password, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [showCPas, setShowCPass] = useState(false);
    const [match, setMatch] = useState(true);
    const [deactPass, setDeact] = useState(true);
    const [deactMoveBtn, setDeactMoveBtn] = useState(false);
    const [err, setErr] = useState([]);
    const [building, setBuilding] = useState(null);
    const [floor, setFloor] = useState(null);
    const [room, setRoom] = useState(null);
    const [seat, setSeat] = useState(null);
    const [allBuildings, setAllBulding] = useState([]);
    const [allFloors, setAllFloor] = useState([]);
    const [allRooms, setAllRoom] = useState([]);
    const [allSeats, setAllSeat] = useState([])

    const checkMatch =()=>{
        if(password === confirmPass){
          setMatch(true)
        }else {
          setMatch(false)
        }
      }
    const handlePass = async ()=>{
        if(password === confirmPass){
            setShowPass(false);
            setShowCPass(false);
            setDeact(!deactPass);
            if(password !== ""){
              try {
                let res = await prospectService.setPassword(prospectId, {password});
                 if(res.variant === "success"){
                   snackRef.current.handleSnack(res);
                 }else {
                  setDeactMoveBtn(true)
                  snackRef.current.handleSnack(res);
                    }      
                } catch (error) {
                 console.log(error);
                 snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
                } 
            }
        }
    }
    const handleMove = async ()=>{
      let y = confirm("Are you sure to move it as Resident ?")
      if(y===true){
        try {
          let res = await prospectService.moveToResident("api/v1/enquiry/prospect/moveToResidence", prospectId, {building,floor,room,seat});
          if(res?.variant === "success"){
            snackRef.current.handleSnack(res); 
            router.push("/dashboard/residents")
          }else if(res?.variant === "missing"){
            setErr(res?.data)
          }else {
            setDeactMoveBtn(true)
            snackRef.current.handleSnack(res); 
            }      
        } catch (error) {
         console.log(error);
         snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
        } 
      }
    }

    useEffect(() => {
      async function getData(){
        if(building===null){
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/building", "",);
          setAllBulding(res.data)
        }else if (floor === null){
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/floor", "", {building});
          setAllFloor(res.data)
        } else if (room === null){
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/room", "", {building, floor});
          setAllRoom(res.data)
        } else if (seat ===null){
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/seat", "", {building, floor, room});
          setAllSeat(res.data)
        }
     }
     if(prospectId){getData()}
    }, [prospectId,building,floor,room, seat])

  return (
    <main> 
        <Grid container spacing={2} sx={{background: "radial-gradient(circle, rgba(227,232,255,1) 0%, rgba(252,255,249,1) 100%)", borderRadius:5, margin:"10px 0px", paddingBottom:"20px"}}>
            <Grid item xs={12}>
            <Divider> <Typography>Set Password</Typography></Divider>
            <Typography variant='body2' align="center">User Name is your Email or Mobile No.</Typography> 
            </Grid>
            <Grid item xs={0} md={1}/>
            <Grid item xs={12} md={4}>
                <TextField fullWidth value={password} name="password" required disabled={deactPass} type={showPass ? "text" : "password"} InputProps={{ endAdornment: (
                <InputAdornment onClick={()=>setShowPass(!showPass)} position="end">
                {showPass ? <MdVisibilityOff style={{fontSize:24}}/> : <MdVisibility style={{fontSize:24}} />}
                </InputAdornment>),}} onChange={e=>setPass(e.target.value)} label="Set Password" helperText="Follow Strong Password rules" placeholder="Password" variant="outlined" />
            </Grid>
    
            <Grid item xs={12} md={4}> 
                <TextField fullWidth value={confirmPass} name="password" required error={!match} disabled={deactPass} onBlur={checkMatch} type={showCPas ? "text" : "password"} InputProps={{ endAdornment: (
                <InputAdornment onClick={()=>setShowCPass(!showCPas)} position="end">
                {showCPas ? <MdVisibilityOff style={{fontSize:24}}/> : <MdVisibility style={{fontSize:24}} />}
                </InputAdornment>),}} onChange={e=>setConfirmPass(e.target.value)} label="Confirm Password" helperText={match ? "Enter the same Password" :"Password Not Matched"} placeholder="Confirm Password" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={3}>
                <Button variant="outlined" color='secondary' onClick={handlePass} sx={{marginTop:1}} >{deactPass ? "Edit Password" : "Save Password"}</Button>
            </Grid>
            <br/>
        </Grid>

            <Grid container spacing={2} sx={{background: "linear-gradient(56deg, rgba(248,248,255,1) 0%, rgba(240,240,255,1) 58%, rgba(0,212,255,0.17) 100%);", borderRadius:5, margin:"20px 0px"}}>
              <Grid item xs={12}>
              <Divider > <Typography>Move to Residents</Typography></Divider>
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?.id === value?.id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.label}
                      </li>
                    );
                  }}
                  options={allBuildings}
                  onChange={(e, v) => {
                    setBuilding(v);
                    setFloor(null);
                    setRoom(null);
                    setSeat(null);
                    setAllFloor([]);
                    setAllRoom([]);
                    setAllSeat([]);
                  }}
                  value={building}
                  renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Building Name"/>}
                  /> 
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?.id === value?.id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.label}
                      </li>
                    );
                  }}
                  options={allFloors}
                  noOptionsText="Select Building Name"
                  onChange={(e, v) => {
                    setFloor(v);
                    setRoom(null);
                    setSeat(null);
                    setAllRoom([]);
                    setAllSeat([]);
                  }}
                  value={floor}
                  renderInput={(params) => <TextField {...params} variant="standard" helperText="Associated to Building" fullWidth label="Floor Name"/>}
                  /> 
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?.id === value?.id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.label}
                      </li>
                    );
                  }}
                  options={allRooms}
                  noOptionsText="Select Floor Name"
                  onChange={(e, v) => {
                    setRoom(v);
                    setSeat(null);
                    setAllSeat([]);
                  }}
                  value={room}
                  renderInput={(params) => <TextField {...params} variant="standard" helperText="Associated to Room" fullWidth label="Room Number"/>}
                  /> 
              </Grid>
              <Grid item xs={12} md={3}>
              <Autocomplete
                  isOptionEqualToValue={(option, value) => option?.id === value?.id}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.label}
                      </li>
                    );
                  }}
                  options={allSeats}
                  onChange={(e, v) => {
                    setSeat(v);
                  }}
                  value={seat}
                  renderInput={(params) => <TextField {...params} variant="standard" helperText="Optional"  fullWidth label="Seat No / Bed No."/>}
                  /> 
              </Grid>
              <Grid item xs={12}>
              <center> <Button variant="contained" endIcon={<MdSend/>} disabled={deactMoveBtn} onClick={handleMove} sx={{marginTop:1, color:"#fff"}}>Move to Resident </Button></center>   
                  <div style={{margin:"20px"}}>
                      {err.length !==0  && <Alert severity="error">
                        <AlertTitle>Can't move to Resident.</AlertTitle>
                        The list of error are given below — <strong>Check it out and Resolve it first!</strong>
                        </Alert> }  
                    <ul style={{listStyleType: "decimal"}}>
                    {err && err.map((e,i)=><li key={i} style={{margin:"20px", color:"#dc00ff"}}>{e?.message} </li>)}
                    </ul>
                  </div>
              </Grid>
              <br/>
          
         
            </Grid>
            <MySnackbar ref={snackRef} />
    </main>
 
 )
}

export default SettingsTab