'use client';
import "./residentStyle.css";
import React, {useState} from 'react'
import {Grid, Avatar, IconButton, Dialog,DialogContent,DialogTitle, Typography,Tab, Divider,Chip   } from '@mui/material/';
import {TabList,TabContext,TabPanel} from '@mui/lab/';
import { FcCancel } from "react-icons/fc";
import { BsInfoCircleFill } from "react-icons/bs";


const Meds = ({openMeds,setOpenMeds,act}) => {
  const [medTab, setMTab]= useState("Scheduled Medication");
  return (
    <Dialog
    open={openMeds}
    onClose={()=>setOpenMeds()}
    maxWidth="lg"
    aria-labelledby="meds-popup"
    aria-describedby="meds-popup-description"
  >
    <DialogTitle>
        <Typography variant='body1' color="primary">Medication Pass For <b> {`${act?.lastName} ${act?.firstName}`} </b></Typography>
      <IconButton onClick={()=>setOpenMeds()} sx={{position:"absolute", top:0, right:0}}>
        <FcCancel/>
      </IconButton>
    </DialogTitle>
    <Divider/>
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
        <Avatar alt={act?.firstName} src={act?.userImage} sx={{width:"120px",height:"80px", borderRadius:"10px"}} className="dialogImg" variant="square" />
        </Grid>
        <Grid item xs={12} md={3}>
        <Typography>{`${act?.lastName} ${act?.firstName}`}</Typography>
        <Typography>{`Room ~ ${act?.room} ${act?.seat}` }</Typography>
        <Typography>{`Birth Date : ~ ${act?.dateOfBirth}` }</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, error?
        </Grid>
        <Grid item xs={12} md={2}>
        <Typography align="center">{`Tuesday` }</Typography>
       <center><Chip label="Day" color="primary" sx={{padding:"0px 20px", color:"#fff"}}/></center> 
        </Grid>
      </Grid>
      <Divider sx={{margin:"10px 0px"}}/>
      <TabContext value={medTab} variant="scrollable" allowScrollButtonsMobile scrollButtons>
      <TabList onChange={(e,v)=>setMTab(v)} sx={{height:40}} aria-label="MedsTabs">
          {["Scheduled Medication", "PRN Medication", "Scheduled Treatments", "PRN Treatments"].map((t,i)=> <Tab key={i} value={t} label={t}  />)}
      </TabList>
      {["Scheduled Medication", "PRN Medication", "Scheduled Treatments", "PRN Treatments"].map((t,i)=> <TabPanel key={i} value={t}> 
      <MedCard/>
       </TabPanel>)}
      </TabContext>
    
      
    </DialogContent>
  </Dialog>
  )
}
function MedCard(){
  const [medData, setMedDat] = useState([{name:"CZ 3 Tablet",brand:"Lupin Ltd",time:"8:00 AM", img:"https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/vl3kxion1sm0hceui05s.jpg", advice:[{title:"Take 1 Tablet by Mouth Daily"}, {title:"Preventing and treating low blood levels of folate."}], uses:[{title:"Treatment of Allergic conditions"},{title:"Vomatiin or Cough"}], storage:"Store below 30°C", composition:[{title:"Cetirizine", value:"10mg"}],info:[{title:"CZ 3 Tablet belongs to a group of medicines called antihistamines."}] }, 
                                         {name:"CZ 3 Tablet",brand:"Lupin Ltd",time:"8:00 AM", img:"https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/vl3kxion1sm0hceui05s.jpg", advice:[{title:"Take 1 Tablet by Mouth Daily"}, {title:"Preventing and treating low blood levels of folate."}], uses:[{title:"Treatment of Allergic conditions"},{title:"Vomatiin or Cough"}], storage:"Store below 30°C", composition:[{title:"Cetirizine", value:"10mg"}],info:[{title:"CZ 3 Tablet belongs to a group of medicines called antihistamines."}] }, 
                                         {name:"CZ 3 Tablet",brand:"Lupin Ltd",time:"8:00 AM", img:"https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/vl3kxion1sm0hceui05s.jpg", advice:[{title:"Take 1 Tablet by Mouth Daily"}, {title:"Preventing and treating low blood levels of folate."}], uses:[{title:"Treatment of Allergic conditions"},{title:"Vomatiin or Cough"}], storage:"Store below 30°C", composition:[{title:"Cetirizine", value:"10mg"}],info:[{title:"CZ 3 Tablet belongs to a group of medicines called antihistamines."}] }, 
                                         {name:"CZ 3 Tablet",brand:"Lupin Ltd",time:"8:00 AM", img:"https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/vl3kxion1sm0hceui05s.jpg", advice:[{title:"Take 1 Tablet by Mouth Daily"}, {title:"Preventing and treating low blood levels of folate."}], uses:[{title:"Treatment of Allergic conditions"},{title:"Vomatiin or Cough"}], storage:"Store below 30°C", composition:[{title:"Cetirizine", value:"10mg"}],info:[{title:"CZ 3 Tablet belongs to a group of medicines called antihistamines."}] }, ])
  return(
     <Grid container sx={{maxHeight: "350px", overflowY:"auto", justifyContent:"center"}}>
    {medData.map((m,i)=> <Grid key={i} className="medCard"> 
      <Grid container>
        <Grid item xs={12} className="cardTop">
          <Grid container>
          <Grid item xs={10} sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
          <IconButton> <BsInfoCircleFill style={{color:"#fff"}}/> </IconButton> 
          <Typography>{m?.name}</Typography> 
            </Grid>
            <Grid item xs={2} sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <Typography>{m?.time}</Typography> 
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}> 
        <Grid container sx={{padding:"10px", height:"168px"}}>
            <Grid item xs={12} md={4} >
              <Avatar alt={m?.name} src={m?.img} sx={{width:"100%",height:"80px", borderRadius:"10px"}} className="dialogImg" variant="square" />
              <br/>
              <Typography variant="body2" align="center" color="primary">{m?.brand}</Typography> 
            </Grid>
            <Grid item xs={12} md={8} sx={{paddingLeft:"30px"}}>
            <Typography variant="body2" color="primary"><b>Advice :</b></Typography> 
              <ul>
              {m?.advice && m?.advice.map((adv, ai) => <li key={ai}> <Typography variant="body2">{adv?.title}</Typography>   </li>)}
              </ul>
              <Divider/>
              <Typography variant="body2" color="primary"><b>Reason :</b></Typography> 
              <ul>
              {m?.uses && m?.uses.map((use, ui) => <li key={ui}> <Typography variant="body2">{use?.title}</Typography>   </li>)}
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="cardBottom"> 
        <Chip label="No Pass" color="warning" sx={{padding:"0px 20px", color:"#fff", cursor:"pointer"}}/>
        <Chip label="Provide" color="primary" sx={{padding:"0px 20px", color:"#fff", cursor:"pointer"}}/>
        </Grid>
      </Grid>
       </Grid> )}
  </Grid>)
}
export default Meds