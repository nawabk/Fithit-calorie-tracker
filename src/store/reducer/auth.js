import * as actionTypes from '../actions/actionTypes';

const initialState={
    token:null,
    error:null,
    loading:false,
    directUrl:true,
    signupSuccess:false,
    signupError:null
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.CHANGE_DIRECT_URL:{
           return{
               ...state,
               directUrl:false
           }
        } 
        case actionTypes.AUTH_START:{
            return{
                ...state,
                loading:true
            }
        }
        case actionTypes.AUTH_SUCCESS:{
            return {
                ...state,
                token:action.token,
                loading:false,
                signupSuccess:false,
                signupError:null
            }
        }
        case actionTypes.AUTH_FAILURE:{
            return{
                ...state,
                error:action.error,
                loading:false
            }
        }
        case actionTypes.AUTH_LOGOUT:{
            return {
                ...state,
                token:null,
                
            }
        }

        case actionTypes.SIGNUP_SUCCESS:{
            return{
                ...state,
                signupSuccess:true,
                loading:false
            }
        }
        case actionTypes.SINGUP_FAILURE:{
            return{
                ...state,
                signupError:action.error,
                loading:false
            }

        }
    }
    return state;
}

export default reducer;