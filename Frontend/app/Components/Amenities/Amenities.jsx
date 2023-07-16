"use client";
import "./amenitiesStyle.css";
import Image from 'next/image';
import {Container, Divider, Grid, Typography,Hidden} from '@mui/material/';
import { useState } from 'react';
import Link from 'next/link';
import yoga from "./yoga.svg";
import diet from "./diet.svg";
import doctor from "./doctor.svg";
import freedom from "./freedom.svg";

function Amenities() {
    const [amenities] = useState([{title:"Experience Actual Freedom",subtitle:"Live with your own dignity",img:freedom},{title:"Proper Diet & Nutrition",subtitle:"Get fresh & healthy meal every time",img:diet},{title:"Regular Health Checkup",subtitle:"Free Health Checkup with diagnosis & Medicine",img:doctor},{title:"Yoga & Exercise Events",subtitle:"Participate in health & cultural events",img:yoga}])
  return (
    <section className="sectionMargin" style={{background:"#fff"}}>
        <Container>
        <div id="visit">
            <span id="firstText"><p><Link href="/about">Schedule Your Visit  ➡ </Link></p> </span>
            <span id="secoundText" style={{color:"#00a2c2"}}>Starting at $5,743 monthly, including amenities & services, with entrance-fee contract.*</span>
        </div>

        <Grid container spacing={2} className="sectionMargin">
            <Grid item xs={12} md={6}>
            <Typography variant="h3" color="primary" gutterBottom style={{fontFamily: 'Courgette'}}> Welcome to Oasis Manors </Typography>
            <Typography variant="subtitle1" style={{color:"#000"}} gutterBottom>Come home to sophisticated living in the 15116 Roxford St, Sylmar, CA 91342, where relaxed, maintenance-free living and proactive wellness ensure a lifestyle as vibrant as you are. Here, you are free to pursue your passions and discover new interests, all in the company of neighbors who share your view of what independent senior living in CALIFORNIA should be.</Typography>
            <br/>
            <Typography variant="p" style={{color:"#000"}} gutterBottom>Perched on a scenic bluff in the rolling hills of Sylmar, CA, at The Oasis Manors, you can be as active or easygoing as you want with the confidence and peace of mind that comes from choosing a Life Plan community to call home.</Typography>

            </Grid>
             <Grid item xs={12} md={6}  className="center">
                <img id="welcomeImg" src="https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/ECS_Canterbury_Intro-1024x727.jpg" alt="Img" />
             </Grid>
        </Grid>

    
        <Grid container>
         <Grid item xs={12}>
            <Divider light variant="inset"> <h4 className='heading'> Our Amentities</h4> </Divider>
            <br/>
            <Typography align='center' style={{color:"#000"}} variant="subtitle1">
            Free from the hassles of home maintenance, assisted living residents have more time to focus on living fully and meaningfully within an active community. With social events, group programs, and restaurant-style dining, residents can connect with each other and with the broader world. 
            </Typography>
            <br/>
         </Grid>
         {amenities.map(a=>
            <Grid key={a.title} item xs={12} md={3} className='amenityCard'>
                <center><Image priority src={a.img} alt={a.title}/></center>
                <Typography variant='h6'style={{fontFamily: 'Courgette'}} textAlign="center" color="primary">{a.title}</Typography>
                <Typography align='center' style={{color:"#000"}} variant="body2" >
                {a.subtitle}
             </Typography>
            </Grid>)}
        </Grid>

        <Grid container spacing={2} id="imgBox">
            <Grid item xs={12} md={6} className="center">
                <img src="https://mss-p-045-delivery.stylelabs.cloud/api/public/content/1ac6f11bdaff43cb95cc4eb893618ccd?v=8ade6d2a&t=w1000h1000" alt="CareImg" style={{maxHeight:440,maxWidth:"100%"}}/>
            </Grid>
            <Grid item xs={12} md={6} id="textBox">
                <br/>
            <Typography variant='h6' textAlign="center" color="primary" sx={{fontFamily: 'Courgette'}}>Helpful Services Tailored to Your Needs</Typography>
            <Divider light variant="inset"/>
            <br/>
            <Typography variant="subtitle1" style={{color:"#000"}} >
               Our compassionate team members take the time to get to know your abilities and needs so you can live as independently as possible. We will work with you to create an individualized Service Plan (SP) to guide your personalized services. Your SP will also capture your unique preferences so we can make sure your desires are met, from delivering your morning newspaper to bringing you a glass of wine after dinner. And should you need support with dressing, bathing, grooming, or medication management, your care team is always on hand to help—as little or as much as you need. 
            </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <br/>
            <Typography variant='h6' textAlign="center" color="primary" sx={{fontFamily: 'Courgette'}}>Special Celebration & Social Events</Typography>
            <Divider light variant="inset"/>
            <br/>
            <Typography variant="subtitle1" style={{color:"#000"}} >
            We love to celebrate special occasions and holidays in style with good food, festive decorations, and excellent company. Always find yourself mixing, mingling and even cutting a rug at our socials, happy hours, and live entertainment events.  
            </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="center">
                <img src="https://mss-p-045-delivery.stylelabs.cloud/api/public/content/808de43641db4c8fbf25bdb4a55171e3?v=aa232b9d&t=w520h380" alt="CareImg" style={{maxHeight:440,maxWidth:"100%"}}/>
            </Grid>
        </Grid>
        </Container>

    <div id="connected" className="sectionMargin">
    <h4 className='heading'> <Hidden mdDown>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Hidden> Stay Connected with Your Family</h4>
    <center>  <Divider light variant="inset" style={{maxWidth:500}}/></center>  
    <br /> <br /> 
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <ul>
                <li> <Typography variant="subtitle1"  style={{color:"#00a2c2"}}>Your Family can also track your all activities. (If allowed)</Typography></li>
                <li> <Typography variant="subtitle1"  style={{color:"#00a2c2"}}>Instant notification to your family members.</Typography></li>
                <li> <Typography variant="subtitle1"  style={{color:"#00a2c2"}}>Schedule call, message, online meeting with your family & Relatives.</Typography></li>
                <li> <Typography variant="subtitle1"  style={{color:"#00a2c2"}}>Daily Summary Report (DSR) live on website for individual guest.</Typography></li>
                <li> <Typography variant="subtitle1"  style={{color:"#00a2c2"}}>Your family can also track DSR and request for any change.</Typography></li>
            </ul>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" style={{color:"#000"}} >
            Oasis Manors provides you the best connectivity and notification facility so that you or your allowed family members can keep track of all the daily activities. Like at what time did you take what medicine, meal or any such activities? You can also keep track of your regular health check-up, reports, next doctor's appointment, all kind of medical diagnostic and much more just by login into the Oasis Manors online web portal.
            </Typography>
            </Grid>
        </Grid>
    </Container>
    </div>
    <div id="community">
   <Divider light> <Typography variant='h4' textAlign="center" className='heading'>Explore Our Community</Typography> </Divider> 
    <br/>
    <Container maxWidth="xl">
    <Grid container>
        <Grid item xs={12} md={4} >
            <div className="communityCard">
                <img className="abstractImg" src="https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2022/11/abstract_1.jpg" alt="abstract_1" />
                <video className="communityImg" style={{height:310}} src="https://www.ecsforseniors.org/wp-content/uploads/2023/03/ECS_How-We-Live_Vido.mp4" type="video/mp4/" playsInline autoPlay loop muted>
                </video>
                <Typography variant="h6" color="primary">How we Live</Typography>
                <Typography variant="subtitle2" color="secondary">A lifestyle as rich and vibrant as you are.</Typography>
                <br/>   <Link href="/" className="btnLink">Watch Our Video  ➡ </Link>
                <br/>  <br/>  <br/>
            </div>
        </Grid>
        <Grid item xs={12} md={4}>
            <div className="communityCard">
                <img className="abstractImg" src="https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2022/11/abstract_2.jpg" alt="abstract_1" />
            <img className="communityImg" src="https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/Services-Amenties-640x427.jpg" alt="abstract_2" />
            <Typography variant="h6" color="primary">Services & Amenities</Typography>
            <Typography variant="subtitle2" color="secondary">All the comforts of home and so much more.</Typography>
            <br/>   <Link href="/" className="btnLink">Take a Tour  ➡ </Link>  
            <br/>  <br/>  <br/>
            </div>
        </Grid>
        <Grid item xs={12} md={4}>
            <div className="communityCard">
                <img className="abstractImg" src="https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2022/11/abstract_3.jpg" alt="abstract_1" />
            <img className="communityImg" src="https://www.ecsforseniors.org/cdn-cgi/image/format=auto/wp-content/uploads/2023/03/Delectable-Dining-2-640x427.jpg" alt="abstract_2" />
            <Typography variant="h6" color="primary">Fresh & Hygienic Meal</Typography>
            <Typography variant="subtitle2" color="secondary">This is core speciality to provide best nutritious meal.</Typography>
            <br/>   <Link href="/" className="btnLink">Schedule Visit  ➡ </Link>
            <br/>  <br/>  <br/>            
            </div>
        </Grid>
    </Grid>
    </Container>
    </div>
    
    </section>
  )
}

export default Amenities