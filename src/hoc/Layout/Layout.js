import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import './Layout.css';

class Layout extends Component{
    render(){
        return(
        <Aux>
            <NavigationItems isAuthenticated={this.props.isAuthenticated}/>
            <main className='Content'>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}
export default connect(mapStateToProps)(Layout);