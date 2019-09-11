import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationItem.css';
const navigationItem=(props)=>{
    let classname=[];
    classname.push('NavigationItem');
    if(props.right){
        classname.push('Right')
    }
   return(  <li className={classname.join(' ')}>
        <NavLink to={props.link} exact={props.exact}>{props.children}</NavLink>
     </li> 
   )
};

export default navigationItem;