import React from 'react';
import {Form} from 'react-bootstrap';
import './Input.css';
const input=(props)=>{
   let inputClasses = [];
   if(props.invalid && props.shouldValidate && props.touched){
       inputClasses.push('Invalid');
   }
   let formGroup;
   switch(props.elementType){
       case 'input':
           formGroup=
                     <Form.Group>
                       <label>{props.label}</label>
                     <Form.Control 
                            value={props.value}
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            onChange={props.change}/>
                      </Form.Group>
           break;
        
        case 'select':
            formGroup=
            <Form.Group controlId="exampleForm.ControlSelect1">
               <Form.Label>{props.label}</Form.Label>
               <Form.Control as="select">
                  {props.elementConfig.options.map(option=>(
                      <option key={option.value} value={option.value}>{option.displayValue}</option>
                  ))}
               </Form.Control>
  </Form.Group>
          break;
   }
   
       return formGroup;
};

export default input;