import React from 'react';
import {Button} from 'react-bootstrap';

const button = (props)=>(
    <Button variant={props.color} size={props.size} onClick={props.click}>{props.children}</Button>
)

export default button;