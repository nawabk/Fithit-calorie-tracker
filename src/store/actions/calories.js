import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchResultFailed=(error)=>{
    return{
        type:actionTypes.FETCH_RESULT_FAILED,
        error:error
    }
}
export const setFoodResult = (data) =>{
    return{
        type:actionTypes.SET_FOOD_RESULT,
        result:data
    }
}

export const getAllFoodsInit=()=>{
    return{
        type:actionTypes.GET_ALL_FOODS_INIT
    }
}
export const getAllFoods = () =>{
    return dispatch =>{
        dispatch(getAllFoodsInit());
        const url="http://localhost:6001/fit/rest/foods";
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        };
        axios.get(url,config)
         .then(response =>{
           console.log('Sending request to get data from action creator');
           console.log(response);
           dispatch(setFoodResult(response.data));
         }).catch(error=>{
           console.log(error)
           dispatch(fetchResultFailed(error));
         })
    }
}

export const saveFoodItem = (calOfFoodItem,currMeal,currFood,quantity,unit)=>{
     return{
         type:actionTypes.ADD_FOOD_ITEM,
         calOfFoodItem:calOfFoodItem,
         currentMeal:currMeal,
         currFood:currFood,
         quantity:quantity,
         unit:unit
     }
}

export const onStartTracking = (trackingValue)=>{
    return{
        type:actionTypes.START_TRACKING,
        trackingValue:trackingValue
    }
}