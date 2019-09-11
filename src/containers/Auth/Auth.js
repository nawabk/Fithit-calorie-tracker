import React,{ Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button,Form} from 'react-bootstrap';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import './Auth.css';

class Auth extends Component{
    state={
        form:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email',
                    required:true
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:false
    }
    checkValidity=(value,rules)=>{
       let isValid=true;
       if(!rules) return true;
       if(rules.required){
           isValid=value.trim() !=='' && isValid;
       }
       if(rules.minLength){
           isValid=value.length >= rules.minLength && isValid;
       }
       if(rules.maxLength){
           isValid=value.length <= rules.maxLength && isValid;
       }
       return isValid;
    }
    inputChangeHandler=(event,identifier)=>{
          const updatedForm={
              ...this.state.form,
              [identifier]:{
                  ...this.state.form[identifier],
                  value:event.target.value,
                  touched:true,
                  valid:this.checkValidity(event.target.value,this.state.form[identifier].validation)
              }
          }
          this.setState({form:updatedForm})
    }
    formSubmitHandler=()=>{
        const email=this.state.form.email.value;
        const password=this.state.form.password.value;
        this.props.onAuth(email,password,this.state.isSignUp);
    }
    switchSignupHandler=()=>{
       this.setState(prevState=>{
           return {isSignUp:!prevState.isSignUp}
       })
    }
    render(){
        let formElementsArray=[];
        for(let key in this.state.form){
            const obj={
                id:key,
                config:this.state.form[key]
            }
            formElementsArray.push(obj);
        }
        let inputElement = formElementsArray.map(formElement=>(
             <Input key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                     invalid={!formElement.config.valid}
                     shouldValidate={formElement.config.validation}
                     touched={formElement.config.touched}
                     change={(event)=>this.inputChangeHandler(event,formElement.id)}/>
        ))
        if(this.props.loading) {
            inputElement=<Spinner/>;
        }
        let h2,redirect=null;
        if(!this.props.isDirectUrl) h2=<h2>Please Sign in</h2>;
        if(this.props.error) h2=<h2>{this.props.error.message}</h2>;
        if(this.state.isSignUp && this.props.signupSuccess) h2=<h2>Sign up successfull</h2>
        if(this.state.isSignUp && this.props.signupError) h2=<h2>{this.props.signupError.message}</h2>
        let switchtext=this.state.isSignUp ? <p className="SwitchPara" onClick={this.switchSignupHandler}>Switch To Login</p> : <p className="SwitchPara" onClick={this.switchSignupHandler}>Switch To Signup</p>
        // let redirect= this.props.isAuthenticated ? <Redirect to={this.props.redirectUrl}/> : null;
        if(this.props.isAuthenticated && this.props.calorieToBeTrack!==0){
              redirect=<Redirect to="/track"/>
        }else if(this.props.isAuthenticated && this.props.calorieToBeTrack===0){
            redirect=<Redirect to="/"/>
        }
        let button=this.state.isSignUp ? <Button className="btn btn-primary btn-sm" onClick={this.formSubmitHandler}>Sign Up</Button>
                                       : <Button className="btn btn-success btn-sm" onClick={this.formSubmitHandler}>Login</Button>
        return(
           <Form className="AuthForm">
               {redirect}
               {h2}
              {inputElement}
              {button}
              {/* <Button variant="primary" size="sm">Sign Up</Button> */}
              {switchtext}
           </Form>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        isDirectUrl:state.auth.directUrl,
        error:state.auth.error,
        isAuthenticated:state.auth.token,
        loading:state.auth.loading,
        signupSuccess:state.auth.signupSuccess,
        signupError:state.auth.signupError,
        calorieToBeTrack:state.cal.calorieToBeTrack
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);