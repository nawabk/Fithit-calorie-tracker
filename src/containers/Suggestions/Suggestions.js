import React,{Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';
import './Suggestions.css';
class Suggestions extends Component{
    state={
        show:false,
        currFood:null,
        currCal:null,
        currMeal:this.props.param,
        caloriPerMeasure:null,
        selectOption:100,
        valueForInput:0,
        unit:'gms'
    }
    addFoodHandler=(name,measure)=>{
        this.setState({show:true,currFood:name,currCal:measure,caloriPerMeasure:measure.get("gms"),unit:'gms',selectOption:100})
    }
    modalClickHandler=()=>{
        this.setState({show:false})
    }
    changeSelect=(event)=>{
        let value=100;
        let unit = 'gms';
        console.log(event.target.value);
        if(event.target.value==="cup") {value=1; unit="cup"}
        else if(event.target.value==="piece") {value=1;unit="piece"}
        this.setState({caloriPerMeasure:this.state.currCal.get(event.target.value),selectOption:value,unit:unit})
 }
 inputChangeHandler=(event)=>{
       this.setState({valueForInput:event.target.value})
}
saveClickHandler=()=>{
       let calOfFoodItem;
       const unit = this.state.unit;
       const quantity = this.state.valueForInput;
       if(unit==="gms"){
          calOfFoodItem = (quantity/100)*this.state.currCal.get("gms");
          console.log("inside the suggestion and showing this message:"+calOfFoodItem);
       }else if(unit==="cup"){
           calOfFoodItem = quantity*this.state.currCal.get("cup");
           console.log("do nothing"+calOfFoodItem);
       }else{
           calOfFoodItem = quantity*this.state.currCal.get("piece");
       }
       this.props.onSavingFood(calOfFoodItem,this.state.currMeal,this.state.currFood,quantity,unit);
       this.setState({show:false})
}
    render(){
        const measure = new Map();
        const optionsRes = this.props.results.filter(res=>{
            return res.name.trim().toLowerCase().search(
                this.props.query.toLowerCase()) !==-1;
        });
          const optionsList = optionsRes.map(opt=>{
              measure.set("gms",opt.gramsCalorie);
              measure.set("piece",opt.pieceCalorie);
              measure.set("cup",opt.cupCalorie)
            return <li key={opt.id}>
                {opt.name}
                <Button color="info" size="sm" >Sub</Button>
                <Button color="info" size="sm" click={()=>this.addFoodHandler(opt.name,measure)}>Add</Button>
            </li>
          });
          const placeholder =(
            <div className="Placeholder"> 
               <p>Calorie Per Unit<span>{this.state.selectOption} {this.state.unit} = {this.state.caloriPerMeasure} </span></p>
               <input type="number" mr="2" defaultValue="0" onChange={(event)=>this.inputChangeHandler(event)}/>
               <select onChange={(event)=>this.changeSelect(event)}>
                  <option value="gms" >gms</option>
                  <option value="piece">Piece</option>
                  <option value="cup">Cup</option>
              </select>
           </div>
          )
          const modal=<Modal show={this.state.show} onHide={this.modalClickHandler} heading={this.state.currFood} savebutton="true"
                                       saveclick={this.saveClickHandler}>
                        {/* <Placeholder measure={this.state.currCal}  calculateTotal={(times)=>this.calculateTotal(times)}/> */}
                        {placeholder}
                    </Modal>
        return (
            <div>
                {modal}
              <ul className='Suggestions'>{optionsList}</ul>
              
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        cals:state.cal.calories
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onSavingFood:(calOfFoodItem,currMeal,currFood,quantity,unit)=>dispatch(actions.saveFoodItem(calOfFoodItem,currMeal,currFood,quantity,unit))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Suggestions);