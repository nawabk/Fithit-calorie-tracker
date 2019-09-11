import React,{ Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Layout from './hoc/Layout/Layout';
import {Route,withRouter} from 'react-router-dom';
import Calories from './containers/Calories/Calories';
import Track from './containers/Track/Track';
import FoodTracker from './containers/FoodTracker/FoodTracker';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
class App extends Component{
  componentDidMount(){
    this.props.checkStatus();
  }
  getStartedClickHandler=()=>{
    this.props.history.push("/calories");
  }
    render(){
  
      return(
      <Layout>
          <Route path="/calories"  component={Calories}/>
          <Route path="/track" component={Track}/>
          <Route path="/foodtracker" component={FoodTracker}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/"  exact render={()=><Homepage clicked={this.getStartedClickHandler}/>}/>
      </Layout>
      )
    }
} 

const mapDispatchToProps=dispatch=>{
  return{
    checkStatus:()=>dispatch(actions.checkStatus())
  }
}
export default connect(null,mapDispatchToProps)(withRouter(App));
