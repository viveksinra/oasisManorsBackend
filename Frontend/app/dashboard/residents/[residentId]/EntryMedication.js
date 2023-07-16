'use client';
import React,{ useState,useEffect,forwardRef,useRef,useImperativeHandle} from 'react'
import {Grid, FormGroup,FormControlLabel, Checkbox,Radio, Typography,TextField,Input,Tooltip,Avatar,RadioGroup,CircularProgress,Table,TableHead,TableRow,TableCell,TableBody, IconButton} from '@mui/material/';
import {FcAddRow,FcDeleteRow } from "react-icons/fc";
import { useImgUpload } from '@/app/hooks/auth/useImgUpload';
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";
import { medicationService } from "../../../services";
import Autocomplete,{createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

const EntryMedication = forwardRef((props, ref) => {
    const [image, setImgUrl] = useState("https://onemg.gumlet.io/l_watermark_346,w_240,h_240/a_ignore,w_240,h_240,c_fit,q_auto,f_auto/hx2gxivwmeoxxxsc1hix.png")
    const [loadingImg, setLoadingImg]= useState(false);
    const [prn, setPrn] = useState(false);
    const [emptyStomach, setEmpty] = useState(false);
    const [rx, setRx] = useState(true);
    const [discontinue, setDis]= useState(false);
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFreq] = useState("daily");
    const [days, setDays] =  useState("")
    const [timing, setTiming]= useState([{time:"09:00", qty:"1"}])
    const [startDate, setStartDate]=useState("");
    const [endDate, setEndDate]= useState("");
    const [route, setRoute] = useState("");
    const [storage, setStorage] = useState("");
    const [description,setDisc] = useState("");
    const [composition,setCompo] = useState("");
    const [barcode, setBarcode] = useState("");
    const [ruleCategory, setRule] = useState("");
    const [supplier, setSupplier] = useState(null);
    const [prescription, setPresp] = useState("");
    const [direction, setDirection] = useState("");
    const [reason, setReason] = useState("");
    const [recommend, setRecom] = useState("");
    const [medPassNote, setMedNotes] = useState("");
    const [sideEffect, setSideEff]= useState("");
    const [allSuppliers]= useState([{label:"XYZ Supplier", id:"jjsdo"}])
    const snackRef = useRef();
       
      useEffect(() => {
        async function getData() {
          try {
            let res = await medicationService.getMedication(`api/v1/residence/resMed/getResMed/getAll/${props.prospectId}` , props.id);
           if(res.variant === "success"){
             props.setId(res.data._id);
             setImgUrl(res.data?.image);
             setPrn(Boolean(res.data.prn));
             setEmpty(Boolean(res.data.emptyStomach));
             setRx(Boolean(res.data.rx));
             setDis(Boolean(res.data.discontinue));
             setTitle(res.data.title);
             setBrand(res.data.brand);
             setDosage(res.data.dosage);
             setFreq(res.data.frequency);
             setDays(res.data.days);
             setTiming(res.data.timing);
             setStartDate(res.data.startDate);
             setEndDate(res.data.endDate);
             setRoute(res.data.route);
             setStorage(res.data.storage);
             setDisc(res.data.description);
             setCompo(res.data.composition);
             setBarcode(res.data.barcode);
             setRule(res.data.ruleCategory);
             setSupplier(res.data.supplier);
             setPresp(res.data.prescription);
             setDirection(res.data.direction);
             setReason(res.data.reason);
             setRecom(res.data.recommend);
             setMedNotes(res.data.medPassNote);
             setSideEff(res.data.sideEffect);
             snackRef.current.handleSnack(res);
           }else snackRef.current.handleSnack(res);            
          } catch (error) {
           console.log(error);
           snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.res.data.message, variant:"error"});
          } 
        }
        if(props.id){getData()}
        
      }, [props.id])
      const handleObjChange=(e,i,p)=>{
        let newArr = [...timing]; // copying the old datas array
        if(p==="time"){
          newArr[i].time = e
        }else if(p==="qty"){
          newArr[i].qty = e
        }
        setTiming(newArr)
      }
      const handleAdd = (mode,i)=>{
        if(mode==="add"){
          let Arr1 = [...timing]
        let newArr=[...Arr1,{time:"09:00", qty:"1"}]
        console.log(newArr)
        setTiming(newArr);
        }else if(mode==="delete"){
          let Arr1 = [...timing]
            if (Arr1.length > 1) {
                 var filtered = timing
                   var newArr = [...filtered].filter(function(value, index, arr){ 
                    return index !== i;
                    });
                  setTiming(newArr)
              } else {
                    alert("Not Allowed to delete this.")
              }
  
        }
    }
     
    const handleClear =()=>{
      setImgUrl("https://onemg.gumlet.io/l_watermark_346,w_240,h_240/a_ignore,w_240,h_240,c_fit,q_auto,f_auto/hx2gxivwmeoxxxsc1hix.png");
      setLoadingImg(false);
      setPrn(false);
      setEmpty(false);
      setRx(true);
      setTitle("");
      setBrand("");
      setDosage("");
      setFreq("daily");
      setDays("");
      setTiming([{time:"09:00", qty:"1"}]);
      setStartDate("");
      setEndDate("");
      setRoute("");
      setStorage("");
      setDisc("");
      setCompo("");
      setBarcode("");
      setRule("");
      setSupplier("");
      setPresp("");
      setDirection("");
      setReason("");
      setRecom("");
      setMedNotes("");
      setSideEff("");
      }
      useImperativeHandle(ref, () => ({
          handleSubmit: async () => {
            try {
              let data = {prospectId:props.prospectId,image,prn,emptyStomach,rx,title,brand,dosage,frequency,days,timing,startDate,endDate,route,storage,description,composition,barcode,ruleCategory,supplier,prescription,direction,reason,recommend,medPassNote,sideEffect  };
              let response = await medicationService.saveMedication("api/v1/residence/resMed/addResMed", props.id, data);
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
      <br />
      <Grid item xs={12}>
        <Grid container>
        <Grid item xs={0} md={1}/>
          <Grid item xs={12} md={3}>
          <FormGroup>
            <FormControlLabel  control={<Checkbox size="small" checked={prn} onChange={()=>setPrn(!prn)}/>} label="PRN (As per Need)" />
            <FormControlLabel control={<Checkbox size="small" checked={emptyStomach} onChange={()=>setEmpty(!emptyStomach)} />} label="Empty Stomach" />
            <FormControlLabel control={<Checkbox size="small" checked={rx} onChange={()=>setRx(!rx)}  />} label="Prescription Required" />
            {props?.id && <FormControlLabel control={<Checkbox size="small" checked={discontinue} onChange={()=>setDis(!discontinue)}  />} label="Discontinued" /> }
          </FormGroup>
          </Grid>
          <Grid item xs={12} md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
      <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Add New {props.addType}</Typography>
  
          {
            loadingImg ?  <CircularProgress /> :  <label htmlFor="contactImg">
            <input type="file" id="contactImg" style={{display:"none"}} onChange={(e) => imgUpload(e.target.files[0])}  accept="image/*"  />
            <Tooltip title={`Upload ${props.addType} Photo`} arrow>
            <Avatar alt="Medication-Img" sx={{cursor: "pointer",width: 112, height: 112, border:"4px solid #d9fdd3"}} src={image}/>
            </Tooltip>
            </label>
            } 
          </Grid>
          <Grid item xs={12} md={4}> 
          {!prn && <>
          <div style={{...scheduleText}}>Schedule</div>
          <div style={{...scheduleBox}}>
            <Grid container>
              <Grid item xs={12} style={{display:"flex", justifyContent:"center",height:"40px",}}>
                <RadioGroup row value={frequency} onChange={e=>setFreq(e.target.value)} >
                <FormControlLabel sx={{height:"60px"}} value="daily" control={<Radio size="small" />} label="Daily" />
                <FormControlLabel sx={{marginLeft:"10px", height:"60px"}} value="every" control={<Radio size="small" />} label="Every"/>
                <Input sx={{width:"70px", background:"#fff", height:"20px", padding:"0px 5px", borderRadius:"2px", marginTop:"20px"}} value={days} onChange={e=>setDays(e.target.value)} disableUnderline margin="dense" endAdornment="Days" disabled={frequency==="daily"} type="number" />
              </RadioGroup>
              </Grid>
              <Grid item xs={12} >
              <Table size="small">
          <TableHead>
            <TableRow>
              {/* setTiming([...timing, {time:"09:00", qty:"1"}]) */}
              <TableCell sx={{width:"30px"}}> <Tooltip title="Add New Row" placement="left" arrow> <IconButton onClick={()=> handleAdd("add") }>
                  <FcAddRow/>
                  </IconButton> </Tooltip >  </TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Qty Given</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timing.map((row,i) => (
              <TableRow
                key={row?.time}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><Tooltip title="Remove This Row" placement="left" arrow>
                  <IconButton onClick={()=>handleAdd("delete", i)}>
                  <FcDeleteRow/>
                  </IconButton> </Tooltip>
                </TableCell>
                <TableCell align="center"><Input value={row.time} onChange={e=>handleObjChange(e.target.value, i, "time")} type="time"/></TableCell>
                <TableCell align="center"><Input value={row.qty} onChange={e=>handleObjChange(e.target.value, i, "qty")} sx={{width:"50px"}} type="number"/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
              </Grid>
            </Grid>
          
        </div>
          </> }
          
          
          </Grid>
        </Grid>
   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label={`${props.addType} Title`} value={title} onChange={e=>setTitle(e.target.value)} placeholder={`Name of the ${props.addType}`} variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Brand Name" value={brand} onChange={e=>setBrand(e.target.value)} placeholder='Type Brand Name' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Dosage" value={dosage} onChange={e=>setDosage(e.target.value)} variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Composition" value={composition} onChange={e=>setCompo(e.target.value)} placeholder='Type Salt Composition' variant="standard" />   
      </Grid>
     
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Start Date" value={startDate} onChange={e=>setStartDate(e.target.value)} type="date" focused variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="End Data" value={endDate} onChange={e=>setEndDate(e.target.value)} type="date" focused variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField label="Route" value={route} placeholder='By Mouth' onChange={e=>setRoute(e.target.value)} fullWidth variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Storage" value={storage} onChange={e=>setStorage(e.target.value)} placeholder='Like, Store below 30°C' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField fullWidth label="Med Description" value={description} onChange={e=>setDisc(e.target.value)} variant="standard" />   
  
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField label="Barcode" value={barcode} onChange={e=>setBarcode(e.target.value)} fullWidth variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField label="Med Rule Category" value={ruleCategory} onChange={e=>setRule(e.target.value)} fullWidth variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
        <Autocomplete
        value={supplier}
        onChange={(e, newValue) => {
          if (typeof newValue === 'string') {
            setSupplier({
              label: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setSupplier({
              label: newValue.inputValue,
            });
          } else {
            setSupplier(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
  
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.label);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              label: `Add "${inputValue}"`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="supplier"
        options={allSuppliers}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.label;
        }}
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
        // sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} variant="standard" fullWidth label="Supplier Name" />
        )}
      />
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField label="Prescription" value={prescription} onChange={e=>setPresp(e.target.value)} fullWidth variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField label="Direction of use" value={direction} onChange={e=>setDirection(e.target.value)} placeholder="Direction to use" fullWidth variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField label="Reason for Use" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason for use" fullWidth variant="standard" />   
      </Grid>
      <Grid item xs={12} md={3}>
      <TextField label="Recommended By" value={recommend} onChange={e=>setRecom(e.target.value)} placeholder="Type Doctor's Name" fullWidth variant="standard" />   
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField label="Med Pass Notes" value={medPassNote} onChange={e=>setMedNotes(e.target.value)} multiline rows={4}  placeholder='Any Advice you want to convey before the med pass.' fullWidth variant="outlined" />   
      </Grid>
      <Grid item xs={12} md={6}>
      <TextField label="Side Effects" value={sideEffect} onChange={e=>setSideEff(e.target.value)} multiline rows={4}  placeholder='Side Effects (if any)' fullWidth variant="outlined" />   
      </Grid>
      </Grid>
      <MySnackbar ref={snackRef} />
     </main>
    )
  });
  
  const scheduleBox={
    width: "100%",
    borderRadius: "10px",
    maxWidth: "350px",
    background: "linear-gradient(313deg, rgba(134,237,182,0.25) 0%, rgba(0,212,255,0.20) 100%)",
    boxShadow :"0 2px 4px #ddd"
  }

  const scheduleText ={
    position: "relative",
    top:"10px",
    width: "80px",
    textAlign: "center",
    backgroundColor: "#2eac34",
    color: "#fff",
    marginLeft: "135px",
    borderRadius: "20px",
    fontSize: "small"
  }

  export default EntryMedication;