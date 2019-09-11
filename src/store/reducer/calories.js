import * as actionTypes from '../actions/actionTypes';



const initialState={
    calories:{
        breakfast:[],
        lunch:[],
        dinner:[],
        snack1:[],
        snack2:[],
        snack3:[]
    },
     result:[],
     error:false,
     totalCalorie:0,
     calorieToBeTrack:0,
     loader:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GET_ALL_FOODS_INIT:{
            return{
                ...state,
                loader:true
            }
        }
        case actionTypes.SET_FOOD_RESULT :{
            console.log('In Reducers set:'+action.result)
            return{
                ...state,
                result:action.result,
                error:false,
                loader:false
            }
        }
        case actionTypes.FETCH_RESULT_FAILED :{
            return{
                ...state,
                error:action.error,
                loader:false
            }
        }
        case actionTypes.ADD_FOOD_ITEM:{
            let totCal = state.totalCalorie+action.calOfFoodItem;
            const meal={};
            const mealDetails = {};
            mealDetails.name=action.currFood;
            mealDetails.quantity = action.quantity;
            mealDetails.unit=action.unit;
            mealDetails.cal=action.calOfFoodItem;
            meal.foodItem=mealDetails;
            return{
                ...state,
                calories:{
                    ...state.calories,
                    [action.currentMeal]:state.calories[action.currentMeal].concat(meal)
                },
                
                // [action.currentMeal]:{
                //     ...state.currentMeal,
                //     [action.currFood]:[action.currFood].concat(meal)
                // },
            //     calories:{
            //         ...state.calories,
            //         [action.currentMeal]:state.calories[action.currentMeal]+action.calOfFoodItem,
            //     },
                totalCalorie:totCal
            }
        }
        case actionTypes.START_TRACKING:{
                 return{
                     ...state,
                     calorieToBeTrack:action.trackingValue
                 }
        }
        default:
            return state;
    }
}
    

export default reducer;