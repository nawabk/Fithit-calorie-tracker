import React,{Component} from 'react';
import ReactStoreIndicator from 'react-score-indicator';
import{connect} from 'react-redux';
import {Row,Col} from 'react-bootstrap';
import breakfast from '../../assets/images/rsz_img6.jpg';
import lunch from '../../assets/images/rsz_img7.jpg';
import dinner from '../../assets/images/rsz_img8.jpg';
import snack1 from '../../assets/images/rsz_img9.jpg';
import snack2 from '../../assets/images/rsz_img10.jpg';
import snack3 from '../../assets/images/rsz_img11.jpg';
import './Track.css';
class Track extends Component{

   state={
      show:false
   }
   addButtonClickHandler=(type)=>{
     
      this.props.history.push({
         pathname:'/foodtracker',
         search:'?type='+type
      });
   }
   modalClickHandler=()=>{
      this.setState({show:false})
   }
    render(){
       let keyArray=[];
       for(let key in this.props.cals){
         
          keyArray.push(key);
       }
       const addButton = keyArray.map((key,index)=>{
          const classes=[];let img;
          if(index===0) img=breakfast;
          else if(index===1) img=lunch;
          else if(index===2) img=dinner;
          else if(index===3) img=snack1;
          else if(index===4) img=snack2;
          else if(index===5) img=snack3;
          classes.push('AddButton');
          if(index>2){
             classes.push('Bottom');
          }
          return (
          <div onClick={()=>this.addButtonClickHandler(key)} className={classes.join(' ')} key={key}>
             <img src={img}/>
            {/* <Button color="outline-info" click={()=>this.addButtonClickHandler(key)}><i class="fa fa-plus" value="aria-hidden"></i></Button> */}
            <label>{key}</label>
         </div>
         
          )
       })
      //  const modal=(
      //     <Modal show={this.state.show} onHide={this.modalClickHandler}>
      //        <FoodTracker/>
      //     </Modal>
      //  )
       return( 
          <div>
          <ReactStoreIndicator width={300} value={this.props.totCal} maxValue={this.props.calorieToBeTrack} lineGap={1}/>
          <Row className="MealPlace">
              <Col xs={2}>
              </Col>
              <Col xs={8}>
                 
                   {addButton} 
                 
              </Col>
              <Col xs={2}>
              </Col>
          </Row>
          </div>
       )
    }
}
const mapStateToProps=state=>{
   return{
      cals:state.cal.calories,
      totCal:state.cal.totalCalorie,
      calorieToBeTrack:state.cal.calorieToBeTrack
   }
}

export default connect(mapStateToProps)(Track);