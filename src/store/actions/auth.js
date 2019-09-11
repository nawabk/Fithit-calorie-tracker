import * as actionTypes from './actionTypes';
import axios from 'axios';

export const changeDirectUrl=()=>{
    return{
        type:actionTypes.CHANGE_DIRECT_URL
    }
}

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token
    }
}

export const authFailure=(error)=>{
    return{
        type:actionTypes.AUTH_FAILURE,
        error:error.response.data
    }
}
export const signupSuccess=()=>{
    return{
        type:actionTypes.SIGNUP_SUCCESS
    }
}
export const signupFailure=(error)=>{
    return{
        type:actionTypes.SINGUP_FAILURE,
        error:error.response.data
    }
}
export const auth=(email,password,isSignUp)=>{
      return dispatch=>{
          dispatch(authStart());
          let url;
          const data={
            username:email,
            password:password
        };
          if(isSignUp){
              url="http://localhost:6001/fit/register";
              axios.post(url,data).then(response=>{
                  dispatch(signupSuccess());
              }).catch(error=>{
                  console.log(error)
                  dispatch(signupFailure(error))
              })
          }else{
            url="http://localhost:6001/fit/authenticate";
          
            axios.post(url,data).then(response=>{
                localStorage.setItem('token',response.data.token);
                dispatch(authSuccess(response.data.token));
                console.log(response);
            }).catch(error=>{
                console.log(error);
                dispatch(authFailure(error));
            });
          }
           
      }
}

export const authLogout=()=>{
    localStorage.removeItem('token');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkStatus=()=>{
    return dispatch=>{
        if(localStorage.getItem('token')!==null){
            dispatch(authSuccess(localStorage.getItem('token')));
        }else{
            dispatch(authLogout())
        }
    }
}