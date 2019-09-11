import React,{Component} from 'react';
import {Col,Row,Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import './Calories.css';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/TopPositionedModal/TopPositionedModal';
import Button from '../../components/UI/Button/Button';
import CalorieIntake from '../../components/CalorieIntake/CalorieIntake';
import * as actions from '../../store/actions/index';
class Calories extends Component {
    state={
       description:{
           weight:{
               elementType:'input',
               elementConfig:{
               type:'number',
               placeholder:'weight'
               },
               value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
           },
           age:{ 
               elementType:'input',
               elementConfig:{
               type:'number',
               placeholder:'age'
            },
            value:'',
             validation:{
                 required:true
              },
             valid:false,
            touched:false
          },
          feet:{
            elementType:'input',
            elementConfig:{
            type:'number',
            placeholder:'feet'
            },
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false
        },
        inch:{
            elementType:'input',
            elementConfig:{
            type:'number',
            placeholder:'inch'
            },
            value:'',
             validation:{
             required:true
                 },
             valid:false,
            touched:false
        },
        sex:{
            elementType:'select',
            elementConfig:{
               options:[
                   {value:'male',displayValue:'Male'},
                   {value:'female',displayValue:'Female'}
               ]
            },
            value:'male',
            valid:true
        },
       },
       calorieIntake:0,
       submit:false,
       formIsValid:false,
       message:false,
       showModal:{
           show:false,
           saved:false
       }
       
    }
   
    inputChangeHandler=(event,identifier)=>{
        const copyDesc={
            ...this.state.description
        } 
        const updatedElement={
            ...copyDesc[identifier]
        }
        
        console.log(event.target.placeholder)
        // switch(event.target.placeholder){
        //     case ('weight') :  
        //       const newWeight=event.target.value;
        //       updatedElement.value=newWeight;
             
        //       break;
        //       case ('feet') :
        //       const newFeet=event.target.value;
        //       updatedElement.value=newFeet;
              
        //       break;
        //       case ('inch') :
        //       const newInch=event.target.value;
        //       updatedElement.value=newInch;
        //       break;
        //       case ('age') :
        //       const newAge=event.target.value;
        //       updatedElement.value=newAge;
        //       break;
        //       case ('sex') :
        //       const newSex=event.target.value;
        //       updatedElement.value=newSex;
        //       break;
        //       default:
        //         console.log('we ll do it later');
        //         break;
        // }
        updatedElement.value=event.target.value;
        updatedElement.touched=true;
        updatedElement.valid=this.checkValidity(updatedElement.value,updatedElement.validation);
        copyDesc[identifier] = updatedElement;
        let formIsValid = true;
        for(let temp in copyDesc){
            formIsValid = copyDesc[temp].valid && formIsValid;
        }
        this.setState({description:copyDesc,formIsValid:formIsValid});

    }
    onFormSubmitHandle=()=>{
        if(!this.state.formIsValid){
                this.setState({message:true})
        }else{
            const newCalorieIntake=(this.state.description.weight.value)*30;
            this.setState({calorieIntake:newCalorieIntake,submit:true,message:false});
        }
        
    }
    checkValidity=(value,rules)=>{
        let isValid=true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        return isValid;
    }
    modalClickedHandler=()=>{
        const copyShowModal ={...this.state.showModal};
        copyShowModal.show=false;
        this.setState({showModal:copyShowModal})
    }
    trackInitHandler=()=>{
        const copyShowModal ={...this.state.showModal};
        copyShowModal.show=true;
        this.setState({showModal:copyShowModal})
    }
    onTrackHandler=()=>{
        if(!this.props.isAuthenticated){
            this.props.onStartTracking(this.state.calorieIntake);
             this.props.changeDirectUrl();
             this.props.history.push("/auth")
        }else{
        this.props.onStartTracking(this.state.calorieIntake);
        this.props.history.push("/track");
        }
        
    }
    editCalorieHandler=(event)=>{
          this.setState({calorieIntake:event.target.value})
    }
    modalSaveHandler=()=>{
        const copyShowModal ={...this.state.showModal};
        copyShowModal.saved=true;
        copyShowModal.show=false;
        this.setState({showModal:copyShowModal})
    }
    render(){
        let formElement=[];
        for(let key in this.state.description){
            let obj={
                id:key,
                config:this.state.description[key]
            }
            formElement.push(obj);
        }
       

        const form=<Form onSubmit={this.onFormSubmitHandler} className='Form'>
            {formElement.map(element=>{
                return (<Row key={element.id}>
                    <Col xs={6}>
                    <Input label={element.id} 
                           elementConfig={element.config.elementConfig}
                           elementType={element.config.elementType}
                           change={(event)=>this.inputChangeHandler(event,element.id)}
                           invalid={!element.config.valid}
                           shouldValidate={element.config.validation}
                           touched={element.config.touched}/>
                    </Col>
                </Row>)
            })}
           
            <Button  color="primary" size="sm" className="Btn-Calculate"
                     click={this.onFormSubmitHandle}>Calculate</Button>
            {this.state.message ? <h3 className="InvalidMessage">Fill all the fields</h3>:null}
            
        </Form>
  
       let calorieIntake=null;
       if (this.state.formIsValid ) {
        calorieIntake=<CalorieIntake show={this.state.submit} intake={this.state.calorieIntake}
                                     click={this.state.showModal.saved ? this.onTrackHandler : this.trackInitHandler}/> 
       }
       let modal=this.state.showModal ? <Modal show={this.state.showModal.show}  heading="Edit Calorie" closed={this.modalClickedHandler} saved={this.modalSaveHandler}>
                                              <Input elementType="input" change={(event)=>this.editCalorieHandler(event)} value={this.state.calorieIntake}/>
                                                </Modal>:null;
        return (
            <div className="Calories">
            <Row>
                <Col xs={8}>
                  {form}
                </Col>
                <Col xs={4}>
                  {calorieIntake}
                </Col>
            </Row>
            {modal}
            
            </div>
        )
   }
}
const mapStateToProps=state=>{
    return{
        cals:state.calorieToBeTrack,
        isAuthenticated:state.auth.token!==null
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onStartTracking:(trackingValue)=>dispatch(actions.onStartTracking(trackingValue)),
        changeDirectUrl:()=>dispatch(actions.changeDirectUrl())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Calories);