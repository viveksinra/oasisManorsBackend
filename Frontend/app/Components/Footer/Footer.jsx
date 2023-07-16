"use client";
import "./footerStyle.css";
import {Container,Grid,Typography } from '@mui/material/';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const amenities=["Best Team Care","Healthy Diet Plan", "Online Reports","Doctor on Call","Exercise & Fitness", "Peaceful Environment"];
  const links =[{label:"About Us",link:"about"},{label:"Amenities",link:"amenities"},{label:"Gallery",link:"gallery"},{label:"Pricing",link:"pricing"},{label:"Contact Us",link:"contact"},{label:"Privacy Policy",link:"privacy"}]
 
  return (
    <section className="footerBg">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} md={3}>
            <Link href="/">
            <Image priority width={160} height={60} src="https://res.cloudinary.com/oasismanors/image/upload/v1685029880/Logo_hmwkcj.svg" alt="Oasis Manor"/>
        </Link><br/><br/>
        <Typography variant="subtitle1">Embrace a life of tranquility, luxury, and well-being at our premier senior living community, where independence thrives and care is paramount. </Typography>
        <br/><Typography variant="body2" color="secondary">Oasis Manors - The Home of Happiness</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
            <Typography variant="h5" color="primary" style={{fontFamily: 'Courgette'}}>Our Amenities :-</Typography>
            <ul id="amenitiesUl">
                {amenities.map(d=><li key={d}>{d}</li>)}
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
            <Typography variant="h5" color="primary" style={{fontFamily: 'Courgette'}}> -:  Quick Links :- </Typography>
            <ul id="quickUl">
              {links.map(l=><li key={l.label}><Link href={`/${l.link}`} >{l.label} ↠</Link></li> )}
            </ul>   
            </Grid>
            <Grid item xs={12} md={3}>
            <iframe id="gMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3295.2318702141956!2d-118.46453358255614!3d34.31911390000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c28fc01a994ea7%3A0x23b6ad49d6b55df!2s15116%20Roxford%20St%2C%20Sylmar%2C%20CA%2091342%2C%20USA!5e0!3m2!1sen!2sin!4v1684686264590!5m2!1sen!2sin" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Grid>
          </Grid>
        </Container>
    </section>
  )
}

export default Footer