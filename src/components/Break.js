import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import setBreak from '../actions/setBreak';
import {connect} from 'react-redux';

class Break extends Component {
    HandelIncBreak=()=>{
        if (this.props.theBreak < 60 && this.props.play==false)
            this.props.calBreak(this.props.theBreak + 1);   
    }
        /*********************************/
        HandelDecBreak=()=>{
            if (this.props.theBreak >1 && this.props.play==false)
        this.props.calBreak(this.props.theBreak -1);
        }
        render(){
            return(
                <div>
                    <label id="break-label">Break Length</label>
            <br/>
            <Button className="btn" id="break-decrement" className="btn btn-default" onClick={this.HandelDecBreak}><i className='fas fa-arrow-circle-down'></i></Button> 
                 
                     <input id="break-length" value={this.props.theBreak}/>
            <Button id="break-increment" onClick={this.HandelIncBreak}><i className="fas fa-arrow-circle-up"></i></Button>
                </div>
            )
        }
}
const mapStateToProps = (state)=>{
    return{
        theBreak:state.theBreak,
        play:state.play
    };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        calBreak:(inp) => {dispatch(setBreak(inp))},
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (Break);