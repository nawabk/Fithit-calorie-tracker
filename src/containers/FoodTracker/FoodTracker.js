import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap'; 
import Input from '../../components/UI/Input/Input';
import Suggestions from '../Suggestions/Suggestions';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-food';
import './FoodTracker.css';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// const url="/foods";
// const { API_KEY } = process.env
class FoodTracker extends Component {
  state={
    query:'',
    results:[],
    show:false
  }
  
  // getInfo = ()=>{
  //   axios.get('/foods')
  //        .then(response =>{
  //          console.log('Sending request to get data');
  //          console.log(response);
  //          this.setState({
  //            results:response.data
  //          })
  //        }).catch(error=>{
  //          console.log(error)
  //        })
         
  // }
  componentDidMount(){
    this.props.getAllFoods();
  }
  searchChangeHandler=(event)=>{
      // this.setState({
      //   query:event.target.value
      // },()=>{
        
      //       this.props.getAllFoods();
          
      // })
      this.setState({
        query:event.target.value
      })
  }
  modalClickHandler=()=>{
    this.setState({show:false})
}

  render(){
    
    const params=new URLSearchParams(this.props.location.search);
    const param=params.get('type')
    const suggestions= this.state.query.length > 0 ? <Suggestions results={this.props.res} 
                                                                  query={this.state.query} param={param}
                                                                  />:null
    //const calorieIntake= <CalorieIntake show={this.state.submit} intake={this.state.calorieIntake} click={this.onTrackHandler}/> 

   // const currentCalorie = this.props.totCal !==0 ? <p>Total Calorie:{this.props.cals[param]}</p> : <p>No food is added</p>
   
  //  const dataInTable=this.props.cals[param].map(item=>{
  //    return(
  //      <tr key={item["Roti"].name}>
  //        <td>{item["Roti"].name}</td>
  //        <td>{item["Roti"].quantity}</td>
  //        <td>{item["Roti"].cal}</td>
  //      </tr>
  //    )
  //  })
  //  const table=
    const mealDetails = this.props.cals[param].length===0 ? <p>No food is added</p> : <Table striped bordered hover size="sm">
      <thead>
        <tr>
        <th>Food</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Calorie</th>
        </tr>
      </thead>
      <tbody>
        {this.props.cals[param].map(item=>{
  return(
  <tr key={item["foodItem"].name}>
  <td>{item["foodItem"].name}</td>
  <td>{item["foodItem"].quantity}</td>
  <td>{item["foodItem"].unit}</td>
  <td>{item["foodItem"].cal}</td>
  </tr>
  )
  })}
      </tbody>
    </Table>
    return( 
     <div className='FoodTracker'>
      <section className="MealDetails">
        <h2>{param}</h2>
        {mealDetails}
      </section>
        <form >
          <Input elementType='input' ty="text" ph="Search Food"  
          change={(event)=>this.searchChangeHandler(event)}/>
          {suggestions}
        </form>
     </div> 
    )
  }
}

const mapStateToProps=(state)=>{
  return{
    cals:state.cal.calories,
    res:state.cal.result,
    error:state.cal.error,
    totCal:state.cal.totalCalorie,
    loader:state.cal.loader
  }
}

const mapDispatchToProps= dispatch =>{
  return{
     getAllFoods:()=>dispatch(actions.getAllFoods())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(FoodTracker,axios));