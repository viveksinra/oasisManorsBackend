'use client';
import React, { forwardRef,useImperativeHandle } from 'react'
import { useState,useEffect,useRef} from 'react';
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import {Typography, Grid,TextField,FormControlLabel,Switch,Checkbox,Accordion,AccordionSummary,Rating, AccordionDetails,InputAdornment,CircularProgress,IconButton} from '@mui/material/';
import Autocomplete from '@mui/material/Autocomplete';
import {allStates,allGenders} from "../../Components/StaticData";
import { FcLikePlaceholder, FcLike,FcExpand } from "react-icons/fc";
import { prospectService } from "../../services";

import axios from 'axios';


const EntryArea = forwardRef((props, ref) => {
    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    const [id, setId] = useState(props?.id);
    const snackRef = useRef();
    const [important, setImp] = useState(false);
    const [inquiryDate, setInquiryDate] = useState("");
    const [financialMoveInDate, setFinancialDate] = useState("");
    const [physicalMoveInDate, setPhysicalDate] = useState("");
    const [salesAgent, setSalesAgent] = useState(null);
    const [prospectStage, setProspectStage] = useState(null);
    const [prospectScore, setProspectScore] = useState(null);
    const [prospectSource, setProspectSource]  = useState(null);
    const [subscribed, setSubscribe] = useState(true);
    const [message, setMsg]=useState("");
    const [firstName, setFN]=useState("");
    const [lastName, setLN] = useState("");
    const [DOB, setDOB] = useState("");
    const [street, setStreet] = useState("");
    const [unit, setUnit] = useState("");
    const [gender, setGender] = useState(null);
    const [home, setHome] = useState("")
    const [office, setOffice] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [zip, setZip] = useState("");
    const [loadingCity, setLoadingCity] = useState(false);
    const [city, setCity] =useState("");
    const [state, setState]=useState(null);
  
    const [PAccordion, setPAccordion]=useState(true);
    
    const allSalesAgent=[{label:"Agent Vinod",id:"124sSDSD5sd1"},{label:"Raman Raghav",id:"12545SDFSDFsd1"},{label:"Vivek Oberoi", id:'asdSDFDSFSDFSDFEWER4'}];
    const allProspectStage=[{label:"Unqualified",id:"dsfsDSFGGFNdsdadsf"}, {label:"Waiting List",id:"dsEREfadsf"},{label:"Qualified",id:"dsfsWERWdsdadsf"},{label:"Cold",id:"dssGFDDffdsddadsf"},{label:"Warm",id:"dssdsfHYFDBFDBsdsdadsf"},{label:"Hot",id:"dssdsfsdSFDNJJRTsdadsf"},{label:"Sold",id:"SEGHBHDFGD"},{label:"Dead",id:"SDEHYTYJYHGJG"},{label:"Lost to Competitor",id:"SDFSDFEHGBCBDFFG"},{label:"Deposit Received",id:"5F5DGSFGFDG"},{label:"Needs Assessment",id:"VGFDRGRG"}]
    const allProspectSource = [{label:"A place for Mom", id:"adsfjklVDDajsdf"},{label:"ElderLife Financial", id:"adsdVVSEssfdfdf"}];
   
    useEffect(() => {
      async function getOneData(){
      let res = await prospectService.getOne(id);
      if(res.variant === "success"){
      setId(res.data._id);
      setImp(res.data.important);
      setInquiryDate(res.data.inquiryDate);
      setFinancialDate(res.data.financialMoveInDate);
      setPhysicalDate(res.data.physicalMoveInDate);
      setSalesAgent(res.data.salesAgent);
      setProspectStage(res.data.prospectStage);
      setProspectScore(res.data.prospectScore);
      setProspectSource(res.data.prospectSource);
      setSubscribe(res.data.marketingStatus);
      setMsg(res.data.message);
      setFN(res.data.firstName);
      setLN(res.data.lastName);
      setDOB(res.data.dateOfBirth);
      setStreet(res.data.streetAddress);
      setUnit(res.data.unit);
      setGender(res.data.gender);
      setHome(res.data.home);
      setOffice(res.data.office);
      setMobile(res.data.phone);
      setEmail(res.data.email);
      setZip(res.data.zipCode);
      setCity(res.data.city);
      setState(res.data.state);
      setPAccordion(true);
      snackRef.current.handleSnack(res);
      }else snackRef.current.handleSnack(res);    
     }

     if(id){getOneData()}
     
    }, [id])
    
    useEffect(() => {
      async function getZIPData() {
        if(zip.length === 5){
          setLoadingCity(true)
          await axios.get(`/api/public/zipToLocation?zipCode=${zip}`).then(res=>{
            setCity(res.data.city)
            let obj = allStates.find(o=>o.id ===res.data.state)
            setState(obj)
            setLoadingCity(false)
          }).catch(err=>{
            console.log(err);
            snackRef.current.handleSnack({message:"Plesae enter correct ZIP code.", variant:"error"});
            setZip("");
            setCity("");
            setState(null)
            setLoadingCity(false)
          })
        }
      }
      getZIPData()
    }, [zip])
    
    const handleClear =()=>{
      setId("");
      setImp(false);
      setInquiryDate("");
      setFinancialDate("");
      setPhysicalDate("");
      setSalesAgent(null);
      setProspectStage(null);
      setProspectScore(null);
      setProspectSource(null);
      setSubscribe(true);
      setMsg("");
      setFN("");
      setLN("");
      setDOB("");
      setStreet("");
      setUnit("");
      setGender("");
      setHome("");
      setOffice("");
      setMobile("");
      setEmail("");
      setZip("");
      setCity("");
      setState(null);
      setPAccordion(true);
    }
    useImperativeHandle(ref, () => ({
         handleSubmit: async () => {
           try {
          let prospectData = { _id: id,inquiryDate, financialMoveInDate,physicalMoveInDate,salesAgent,prospectStage,prospectScore, marketingStatus:subscribed,prospectSource,message,firstName,lastName,dateOfBirth:DOB,gender,phone:mobile,email,streetAddress:street,unit,home, office, city,state,zipCode:zip,important };
          let response;
            response = await prospectService.add(id, prospectData);
            if(response.variant === "success"){
              snackRef.current.handleSnack(response);
              handleClear();
            }else snackRef.current.handleSnack(response?.response?.data);            
           } catch (error) {
            console.log(error);
            snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
           } 
        },
        handleClear: () => handleClear() 
    }));


    return <main style={{background:"#fff", borderRadius:"10px",padding:20}}> 
    <Grid sx={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
    <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6'>Create Prospect</Typography>
      <FormControlLabel control={<Checkbox icon={<FcLikePlaceholder style={{fontSize:24}}/>} checkedIcon={<FcLike style={{fontSize:24}}/>} checked={important} onChange={()=>setImp(!important)} />} label={important ? "Important" : "General"} />
    </Grid>
    <Grid container spacing={2} >
    <Grid item xs={12} md={3}>
    <TextField disabled fullWidth label="Assisted Living Retirement Homes" variant="standard" />
    </Grid>
    <Grid item xs={12} md={2}>
    <TextField focused  type='date' value={inquiryDate} onChange={(e)=>setInquiryDate(e.target.value)} fullWidth label="Inquiry Date :" variant="standard" />
    </Grid>
    <Grid item xs={12} md={2}>
    <TextField focused type='date' value={financialMoveInDate} onChange={(e)=>setFinancialDate(e.target.value)} fullWidth label="Financial Move-In Date" variant="standard" />
    </Grid>
    <Grid item xs={12} md={2}>
    <TextField focused type='date' value={physicalMoveInDate} onChange={(e)=>setPhysicalDate(e.target.value)}  fullWidth label="Physical Move-In Date" variant="standard" />
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        options={allSalesAgent}
        value={salesAgent}
        onChange={(e, v) => {
          setSalesAgent(v);
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Sales Agent" variant="standard" />}
      />
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        options={allProspectStage}
        value={prospectStage}
        onChange={(e, v) => {
          setProspectStage(v);
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Prospect Stage" variant="standard" />}
      />
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
       isOptionEqualToValue={(option, value) => option?.id === value?.id}
      value={prospectSource}
      onChange={(e, v) => {
        setProspectSource(v);
      }}
        options={allProspectSource}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Prospect Source" variant="standard" />}
      />
    </Grid>
    <Grid item xs={12} md={3} className='center'>
    <FormControlLabel control={<Rating name="Prospect-Score" sx={{marginRight:"10px"}} value={prospectScore} onChange={(event, newValue) => {setProspectScore(newValue)}}/>} label="Prospect Score" />
    </Grid>
    <Grid item xs={12} md={3}>
    <FormControlLabel control={<Switch defaultChecked value={subscribed} onChange={e=>setSubscribe(!subscribed)}/>} label="Subscribe Marketing" />
    </Grid>
    <Grid item xs={12}>
    <TextField label="Story" value={message} onChange={e=>setMsg(e.target.value)} placeholder="Type something about the prospect. (If you wish)" fullWidth multiline rows={4} variant="outlined"  />
    </Grid>
  </Grid>
  <Accordion expanded={PAccordion}>
  <AccordionSummary
      expandIcon={<IconButton onClick={()=>setPAccordion(!PAccordion)}> <FcExpand /> </IconButton> }
      aria-controls="ProspectInformation"
      id="ProspectInformation"
    >
      <Typography>Prospect Information</Typography>
    
    </AccordionSummary>
    <AccordionDetails>
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="First Name" value={firstName} onChange={e=>setFN(e.target.value)} placeholder='First Name' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Last Name" value={lastName} onChange={e=>setLN(e.target.value)} placeholder='Last Name' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
      <Autocomplete
        id="allGenders"
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        options={allGenders}
        onChange={(e, v) => {
          setGender(v);
        }}
        value={gender}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Gender"/>}
        />
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth focused label="Date of Birth" value={DOB} onChange={e=>setDOB(e.target.value)} type='date' placeholder='DOB' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField fullWidth label="Street Address" value={street} onChange={e=>setStreet(e.target.value)} placeholder='Type Street Address' variant="standard" />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField fullWidth label="Unit" value={unit} onChange={e=>setUnit(e.target.value)} placeholder='Unit' variant="standard" />
      </Grid>
      
        <Grid item xs={12} md={3}>
            <TextField fullWidth value={home} onChange={e=>setHome(e.target.value)} label="Home #" placeholder='Home' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
        <TextField fullWidth label="Office #" value={office} onChange={e=>setOffice(e.target.value)} placeholder='Office' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
        <TextField fullWidth label="Mobile No." value={mobile} onChange={e=>setMobile(e.target.value)} type='number' placeholder='Phone Number' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
        <TextField fullWidth label="Email" value={email} onChange={e=>setEmail(e.target.value)} type='email' placeholder='Email' variant="standard" />
        </Grid>
        <Grid item xs={12} md={3}> 
          <TextField fullWidth value={zip} onChange={e=> setZip(e.target.value)} disabled={loadingCity} InputProps= {{
            endAdornment: (
            <InputAdornment position="end">
            {loadingCity && <CircularProgress size={25}/>}  
            </InputAdornment>
            ),
            }}  label="ZIP Code" type="number"  placeholder="ZIP Code" variant="standard" />
        </Grid> 
            <Grid item xs={12} md={3}> 
            <TextField fullWidth value={city} onChange={e=>setCity(e.target.value)} label="City" helperText="Just type ZIP Code" disabled placeholder="City" variant="standard" />
            </Grid>
                    <Grid item xs={12} md={3}> 
                      <Autocomplete
                      id="allStates"
                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
                      options={allStates}
                      onChange={(e, v) => {
                        setState(v);
                      }}
                      value={state}
                      disabled
                      renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="State"/>}
                      />
                    </Grid>
    </Grid>
    </AccordionDetails>
  </Accordion>
  <MySnackbar ref={snackRef} />
  </main>;
  });
  
  
export default EntryArea; 