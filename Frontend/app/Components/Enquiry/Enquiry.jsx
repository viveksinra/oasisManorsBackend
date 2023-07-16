"use client";
import { useEffect, useState, useRef } from "react";
import "./enquiryStyle.css";
import {Container, Grid, Typography,TextField,RadioGroup,FormControlLabel,Radio,Autocomplete ,Fab,MenuItem,InputAdornment,CircularProgress,Alert } from '@mui/material/';
import { allStates } from "../StaticData";
import MySnackbar from "../MySnackbar/MySnackbar";

import { FcFeedback,FcApproval } from "react-icons/fc";
import axios from "axios";


const Enquiry = () => {
  const [enquiryFor, setEnquiryFor]=useState("self");
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [mobile, setMobile]=useState("");
  const [address, setAddress]=useState("");
  const [zip, setZip]=useState("");
  const [city, setCity]=useState("");
  const [loadingCity, setLoadingCity]=useState(false);
  const [state, setStateName]=useState(null);
  const [marketing, setMarketing]=useState("");
  const [message,setMsg]=useState("");
  const snackRef = useRef();
  useEffect(() => {
    async function getZIPData() {
      if(zip.length===5){
        setLoadingCity(true)
        await axios.get(`/api/public/zipToLocation?zipCode=${zip}`).then(res=>{
          setCity(res.data.city)
          let obj = allStates.find(o=>o.id ===res.data.state)
          setStateName(obj)
          setLoadingCity(false)
        }).catch(err=>{
          console.log(err);
          alert("Plesae enter correct ZIP code.");
          setZip("");
          setCity("");
          setStateName(null)
          setLoadingCity(false)
        })
      }
    }
    getZIPData()
  }, [zip])
  
  const handleEnquiry= async (e)=>{
    e.preventDefault();
    let user = {enquiryFor,name,email,mobile,address,zip,city,state,marketing,message};
    try {
      await axios
			.post("http://localhost:2040/api/v1/public/enquiry", user)
			.then((res) => {
        snackRef.current.handleSnack(res.data);
       if(res.data.variant ==="success"){
        setEnquiryFor("self");
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setZip("");
        setCity("");
        setStateName(null);
        setMarketing("");
        setMsg("");
       }
			})
			.catch((err) => {
         console.log(err);
         snackRef.current.handleSnack({message: "Something went wrong. Please try again.", variant: "error" });
      }); 
    } catch (error) {
      snackRef.current.handleSnack({message: "Something went wrong. Please try again.", variant: "error" });
    }
  }

  const allMarketing = ["Web Search / Google", "Friend or colleague Recommendation", "Social Media","Direct Mailer","Family Member", "Email","Blog or Publication"];
  return (
    <section className="sectionMargin enquryBg" id="enquiry">
        <Container maxWidth="xl">
            <Grid container>
                <Grid item xs={12} lg={6} id="infoDesign">
                </Grid>
                <Grid item xs={12} lg={6}>
                  <form onSubmit={e=>handleEnquiry(e)} id="enquiryForm">
                  <Grid container spacing={2}>
                        <Grid item xs={12}>
                      <Alert icon={<FcApproval fontSize="inherit" />} severity="success">
                      Protecting your privacy: This website adheres to <a href="https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act" target="_blank"><strong>HIPAA compliance</strong> standards. </a>
                    </Alert>
                        </Grid>
                        <Grid item xs={12} id="self" className="center">
                        <Typography color="primary" variant="h5">Are you interest for &#x2192;</Typography>
                        <RadioGroup row style={{marginLeft:30}}
                            defaultValue="self"
                            value={enquiryFor}
                            onChange={e=>setEnquiryFor(e.target.value)}
                            name="radio-buttons-group"
                          >
                        <FormControlLabel value="self" control={<Radio />} label="Self" />
                        <FormControlLabel value="other" style={{marginLeft:20}} control={<Radio />} label="Other" />
                      </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField fullWidth value={name} required onChange={e=>setName(e.target.value)} label="Full Name" placeholder="Enter your Full Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                        <TextField fullWidth value={email} required type="email" onChange={e=>setEmail(e.target.value)} label="Email" placeholder="Enter your Email" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={6}> 
                        <TextField fullWidth value={mobile} required onChange={e=>setMobile(e.target.value)} label="Phone" type="number" placeholder="Enter your Mobile No" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={12}> 
                        <TextField fullWidth value={address} onChange={e=>setAddress(e.target.value)} label="Address" placeholder="Enter your Address" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={4}> 
                        <TextField fullWidth value={zip} onChange={e=> setZip(e.target.value)} disabled={loadingCity} InputProps= {{
          endAdornment: (
            <InputAdornment position="end">
                 {loadingCity && <CircularProgress size={25}/>}  
            </InputAdornment>
          ),
        }}  label="ZIP Code" type="number" placeholder="ZIP Code" variant="outlined" />
                        </Grid> 
                        <Grid item xs={12} md={4}> 
                        <TextField fullWidth value={city} onChange={e=>setCity(e.target.value)} label="City" helperText="Just type ZIP Code" disabled placeholder="City" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={4}> 
                          <Autocomplete
                          id="all-State"
                          disablePortal
                          disabled
                          options={allStates}
                          onChange={(e, v) => {
                            setStateName(v);
                          }}
                          value={state}
                          renderInput={(params) => <TextField {...params} fullWidth helperText="Just type ZIP Code" label="State"/>}
                          />
                        </Grid>
                                          <Grid item xs={12}> 
                                          <TextField fullWidth value={marketing} select onChange={e=>setMarketing(e.target.value)} label="How did you hear about us ?" placeholder="State" variant="outlined" >
                                          {allMarketing.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12}> 
                        <TextField fullWidth value={message} onChange={e=>setMsg(e.target.value)} label="Your Message"  multiline rows={4} placeholder="Please write your message..." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}> 
                        <Fab variant="extended" size="medium" color="primary" aria-label="add" type="submit">
                          <FcFeedback style={{fontSize:24,marginRight:10}} sx={{ mr: 1 }} />
                          Send Enquiry
                        </Fab>
                        </Grid>
                    </Grid>
                  </form>
                    
                </Grid>
            </Grid>
        </Container>
        <MySnackbar ref={snackRef} />
    </section>
  )
}

export default Enquiry