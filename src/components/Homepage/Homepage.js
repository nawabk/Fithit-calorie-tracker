import React from 'react';
import './Homepage.css';
import Hero from '../../assets/images/hero.png';
import {Button} from 'react-bootstrap';
const homepage =(props)=>(
    <div className="hompage">
       
    <div className="header">
        <div className="header__text-box">
             <h2 className="heading-primary">
                 <span className="heading-primary--main">Fithit</span>
                 <span className="heading-primary--sub">Don't count the reps make the rep counts</span>
            </h2>       
        </div>
        <div className="header-image">
            <img src={Hero} alt="hero image" className="hero-image"/>
        </div>
        <div className="info-button animated">
            <Button variant="info" size="bg" onClick={props.clicked}>Get Started</Button>
        </div>
    </div>
   </div> 
)

export default homepage;