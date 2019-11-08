import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import setSession from '../actions/setSession';
import {connect} from 'react-redux';
import setTime from '../actions/setTime';

class Session extends Component {
    HandelIncSession=()=>{
        if(this.props.play==false){
            let session=this.props.theSession+1;
            let forTime=session
            if(session<10) forTime='0'+forTime;
            if (this.props.theSession<60) 
            {  this.props.calTime(forTime+':00')
                this.props.calSession(session);}         
           }
    }
    /*********************************/
HandelDecSession=()=>
{    if(this.props.play==false){
    let session=this.props.theSession-1
    let forTime=session
    if(session<10) forTime='0'+forTime;

    if (this.props.theSession>1)
    {  this.props.calSession(session);
    this.props.calTime(forTime+':00');}
         }
}
    render(){
        return( 
            <div>
        <label id="session-label">Session Length</label>
        <br/>
        <Button id="session-decrement"><i className='fas fa-arrow-circle-down' onClick={this.HandelDecSession}></i></Button> 
          
                <input id="session-length" value={this.props.theSession} />
        <Button id="session-increment"><i className="fas fa-arrow-circle-up" onClick={this.HandelIncSession}></i></Button>
        </div>)
    }
}
const mapStateToProps = (state)=>{
    return{ 
        theSession:state.theSession,
        play:state.play
    };
}
const mapDispatchToProps=(dispatch)=>{
    return{
        calSession:(inp)=> {dispatch(setSession(inp))},
        calTime:(inp)=> {dispatch(setTime(inp))}
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (Session);