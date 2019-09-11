import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import './NavigationItems.css';
const navigationItems=(props)=>(
     <ul className="NavigationItems">
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/calories" >Calories</NavigationItem>
        <NavigationItem link="#" >Suppliments</NavigationItem>
        <NavigationItem link="#">Nutrition</NavigationItem>
        <NavigationItem link="#">Workout</NavigationItem>
        {props.isAuthenticated?<NavigationItem link="/logout">Logout</NavigationItem>
                               :<NavigationItem link='/auth' right>Authenticate</NavigationItem>}
       
     </ul>
)

export default navigationItems;