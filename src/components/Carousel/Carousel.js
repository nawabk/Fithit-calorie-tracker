import React,{Component} from 'react';
import {Carousel} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Gym1 from '../../assets/images/gym2.jpg';
import Gym2 from '../../assets/images/gym3.jpg';
import Gym3 from '../../assets/images/gym4.jpg';
import Button from '../UI/Button/Button';
import './Carousel.css';
 class Carousell extends Component {
   getStartedHandler=()=>{
     this.props.history.push('/calories');
   }
  render(){
    return (
      <Carousel className='Carousel'>
       <Carousel.Item>
        <img
          className="d-block w-100"
          src={Gym2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <Button color='info' click={this.getStartedHandler}>Get Started</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Gym1}
          alt="Third slide"
        />
    
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <Button color='info' click={this.getStartedHandler}>Get Started</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Gym3}
          alt="Third slide"
        />
    
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <Button color='info' click={this.getStartedHandler}>Get Started</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
  }
 }

export default withRouter(Carousell);