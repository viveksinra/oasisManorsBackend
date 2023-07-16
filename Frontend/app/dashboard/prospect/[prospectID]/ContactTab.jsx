'use client';
import React,{useState,useEffect,forwardRef,useRef,useImperativeHandle} from 'react'
import {Grid, AppBar,Toolbar,Box,Typography,TextField, Button,Tooltip,Avatar,ButtonGroup,InputAdornment,CircularProgress} from '@mui/material/';
import {FaUserPlus } from "react-icons/fa";
import {FiFileMinus,FiCheck } from "react-icons/fi";
import {BsTable } from "react-icons/bs";
import {ToggleFab} from "../page"
import { DataGrid } from '@mui/x-data-grid';
import { useImgUpload } from '@/app/hooks/auth/useImgUpload';
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";
import {allStates,allRelation,allGenders} from "../../../Components/StaticData";
import { prospectService } from "../../../services";
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';


function ContactTab({prospectId}) {
  const [viewTabular,toggleView] = useState(true);
  const [contactId, setContactId] =useState("")
  const entryRef = useRef();
  return (
    <main style={{marginTop:20}}> 
      {viewTabular ? <SearchContact prospectId={prospectId}  handleEdit={(id)=>{toggleView(false); setContactId(id)}} />  : <EntryContact contactId={contactId} setContactId={e=>setContactId(e)} prospectId={prospectId} ref={entryRef} />}
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0,background:"#d6f9f7"}}>
      <Toolbar variant="dense">
        <span style={{flexGrow:0.2}}/>
        {!viewTabular &&  <Button variant="contained" onClick={() => entryRef.current.handleClear()} startIcon={<FiFileMinus />} size='small' color="info" >
            Clear
          </Button> }
        <span style={{flexGrow:0.3}}/>
        <Tooltip arrow title={viewTabular ? "Add Contact" : "Show All"}>
        <ToggleFab onClick={()=>toggleView(!viewTabular)} color="secondary" size="medium">
        {viewTabular ?   <FaUserPlus style={{fontSize:24}}/> : <BsTable style={{fontSize:24}}/>}
        </ToggleFab>
        </Tooltip>
          <span style={{flexGrow:0.3}}/>
          {!viewTabular && <Button variant="contained" onClick={() => entryRef.current.handleSubmit()} startIcon={<FiCheck />} size='small' color="success" >
            {contactId ? "Update" : "Save"}
          </Button>}
          
      </Toolbar>         
      </AppBar>
       </main>
  )
}



function SearchContact({prospectId, handleEdit}) {
  const [rows, setRow] = useState([])
  useEffect(() => {
    async function fetchAllData() {
      let response = await prospectService.getContact(prospectId, "");
      if(response.variant === "success"){
        setRow(response?.data)
      }else console.log(response)
    }
    fetchAllData()
  }, [])

  const columns = [
    {
      field: 'contactImage',
      headerName: '',
      width: 80,
      sortable: false,
      editable: false,
      renderCell: props=> <Avatar alt={props?.row?.firstName} src={props?.row?.contactImage} /> ,
    },
      {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: false,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: false,
      },
      {
        field: 'mobile',
        headerName: 'Mobile No.',
        type: 'text',
        width: 150,
        editable: false,
      },
      {
        field: 'relation',
        headerName: 'Relation',
        description: 'Relation with the Prospect',
        sortable: true,
        editable: false,
        width: 160,
      },
      {
        field: 'streetAddress',
        headerName: 'Street Address',
        sortable: false,
        editable: false,
        width: 160,
      },
      {
        field: 'city',
        headerName: 'City',
        sortable: true,
        editable: false,
        width: 160,
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 120,
        sortable: false,
        renderCell: props=> <Button onClick={()=>handleEdit(props?.row?._id)} variant="text">Edit</Button>,
      },
    ];
  return (
    <main>
      <Box sx={{background:"#fff", borderRadius:"10px", width: '100%' }}>
      <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>All Contacts</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />
    </Box>
    </main>
  )
}

const EntryContact = forwardRef((props, ref) => {
  const snackRef = useRef();
     const [contactImage, setImgUrl] = useState("")
     const [loadingImg, setLoadingImg]= useState(false)
     const [firstName, setFN] = useState("");
     const [lastName, setLN] = useState("");
     const [organization, setOrg] = useState("");
     const [gender, setGender] = useState(null);
     const [streetAddress, setStreet]= useState("");
     const [unit, setUnit] = useState("");
     const [mobile, setMobile] = useState("");
     const [email, setEmail] = useState("");
     const [zip, setZip] = useState("")
     const [loadingCity, setLoadingCity] = useState(false);
     const [city, setCity] = useState("");
     const [state, setState] = useState(null);
     const [relation, setRelation] = useState(null);
     const [notes, setNotes]=useState("");
    useEffect(() => {
      async function getData() {
        try {
          let res = await prospectService.getContact(props.prospectId, props.contactId);
         if(res.variant === "success"){
          props.setContactId(res.data._id);
          setImgUrl(res.data.contactImage);
          setLoadingImg(res.data.loadingImg);
          setFN(res.data.firstName);
          setLN(res.data.lastName);
          setOrg(res.data.organization);
          setGender(res.data.gender);
          setStreet(res.data.streetAddress);
          setUnit(res.data.unit);
          setMobile(res.data.mobile);
          setEmail(res.data.emailAddress);
          setZip(res.data.zipCode);
          setCity(res.data.city);
          setState(res.data.state);
          setRelation(res.data.relation);
          setNotes(res.data.notes)
           snackRef.current.handleSnack(res);
         }else snackRef.current.handleSnack(res);            
        } catch (error) {
         console.log(error);
         snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
        } 
        
      }
      if(props.contactId){getData()}
      
    }, [props.contactId])
    
    useEffect(() => {
        async function getZIPData() {
          if(zip.length===5){
            setLoadingCity(true)
            await axios.get(`/api/public/zipToLocation?zipCode=${zip}`).then(res=>{
              setCity(res.data.city)
              let obj = allStates.find(o=>o.id ===res.data.state)
              setState(obj)
              setLoadingCity(false)
            }).catch(err=>{
              console.log(err);
              alert("Please Enter Correct ZIP Code")
              setZip("");
              setCity("");
              setState(null)
              setLoadingCity(false)
            })
          }
        }
        getZIPData()
      }, [zip])
      
      const handleClear=()=>{
        props.setContactId("");
        setImgUrl("")
        setFN("");
        setLN("");
        setOrg("");
        setGender(null);
        setStreet("");
        setUnit("");
        setMobile("");
        setEmail("");
        setZip("");
        setLoadingCity(false);
        setCity("");
        setState(null);
        setRelation(null);
        setNotes("");
      }
    
    useImperativeHandle(ref, () => ({
        handleSubmit: async () => {
          try {
            let contactData = {prospectId:props.prospectId, contactImage, firstName,lastName,relation,organization,gender,streetAddress,unit,mobile,emailAddress:email,zipCode:zip,city,state,notes  };
            let response = await prospectService.saveContact(props.contactId, contactData);
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
    const imgUpload= async (e)=>{
      setLoadingImg(true)
      let url = await useImgUpload(e);
      if(url){
        setImgUrl(url);
        setLoadingImg(false)
      } else {
        snackRef.current.handleSnack({message:"Image Not Selected", info:"warning"}); 
        setLoadingImg(false)}
    }
  return (
   <main style={{backgroundColor:"#fff", borderRadius:8,marginBottom:2, padding:"10px"}}>
    <Grid container spacing={2}>
    <Grid item xs={12} className='center'>
    <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Add New Contact</Typography>
    </Grid>
    <br />
    <Grid item xs={12} className='center'>
      {
        loadingImg ?  <CircularProgress /> :  <label htmlFor="contactImg">
        <input type="file" id="contactImg" style={{display:"none"}} onChange={(e) => imgUpload(e.target.files[0])}  accept="image/*"  />
        <Tooltip title="Upload Contact Photo" arrow>
         <Avatar alt={firstName} sx={{cursor: "pointer",width: 112, height: 112, border:"4px solid #d9fdd3"}} src={contactImage}/>
        </Tooltip>
      </label>
      } 
    </Grid>
    <Grid item xs={12} md={3}>
    <TextField fullWidth value={firstName} onChange={e=>setFN(e.target.value)} label="First Name" placeholder='Contact First Name' variant="standard" />   
    </Grid>
    <Grid item xs={12} md={3}>
    <TextField fullWidth value={lastName} onChange={e=>setLN(e.target.value)} label="Last Name" placeholder='Contact Last Name' variant="standard" />   
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
            id="allRelations"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={allRelation}
            onChange={(e, v) => {
            setRelation(v);
            }}
            value={relation}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth label="Relationship"/>}
            />
    </Grid>
    <Grid item xs={12} md={3}>
    <TextField fullWidth label="Organization" value={organization} onChange={e=>setOrg(e.target.value)} variant="standard" />   
    </Grid>
    <Grid item xs={12} md={3}>
    <Autocomplete
        id="allGenders"
        isOptionEqualToValue={(option, value) => option.id === value.id}
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
    <TextField label="Street Address" value={streetAddress} onChange={e=>setStreet(e.target.value)} fullWidth variant="standard" />   
    </Grid>
    <Grid item xs={12} md={3}>
    <TextField label="Unit" value={unit} onChange={e=>setUnit(e.target.value)} fullWidth variant="standard" />   
    </Grid>
    <Grid item xs={12} md={3}>
    <TextField label="Mobile Phone" type="number" value={mobile} onChange={e=>setMobile(e.target.value)} fullWidth variant="standard" />   
    </Grid>
    <Grid item xs={12} md={3}>
    <TextField label="Email Id" value={email} onChange={e=>setEmail(e.target.value)} fullWidth variant="standard" />   
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
        <TextField fullWidth value={city} label="City" helperText="Just type ZIP Code" disabled placeholder="City" variant="standard" />
    </Grid>
        <Grid item xs={12} md={3}> 
            <Autocomplete
            id="allStates"
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={allStates}
            onChange={(e, v) => {
            setState(v);
            }}
            value={state}
            disabled
            renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="State"/>}
            />
        </Grid>
        <Grid item xs={12} md={12}>
        <TextField label="Notes / Remarks" multiline rows={4} value={notes} onChange={e=>setNotes(e.target.value)} placeholder='Type Notes (if any)' fullWidth variant="standard" />   
        </Grid>
    </Grid>
    <MySnackbar ref={snackRef} />
   </main>
  )
});



export default ContactTab