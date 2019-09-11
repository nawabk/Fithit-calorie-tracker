import React from 'react';
import Button from '../UI/Button/Button';
import './CalorieIntake.css';
const calorieIntake =(props)=>{
    const classes=['CalorieIntake'];
    if(props.show){
        classes.push('CalorieIntakeShowing')
    }
    return (<div className={classes.join(' ')}>
      <h2>{props.intake}</h2>
      <Button click={props.click} color="info" size="bg">Start Tracking</Button>
    </div>)
}

export default calorieIntake;