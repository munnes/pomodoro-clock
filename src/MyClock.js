// JavaScript source code

import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import setBreak from './actions/setBreak';
import setSession from './actions/setSession';
import setTime from './actions/setTime';
import playStop from './actions/playStop';
import setHead from './actions/setHead';


import {connect} from 'react-redux';

class MyClock extends Component {

    HandelIncBreak=()=>{
        if (this.props.theBreak < 60 && this.props.play==false)
            this.props.calBreak(this.props.theBreak + 1);
      
    }
        /*********************************/
        HandelDecBreak=()=>{
            if (this.props.theBreak >1 && this.props.play==false)
        this.props.calBreak(this.props.theBreak -1);
        }
        /*********************************/
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
        /********************************/
    Reset=()=>
    {  this.props.togelTime(true);
        this.props.calBreak(5);
        this.props.calSession(25);
        this.props.calTime('25:00');
        document.getElementById("timer").style.color="darkblue"; 
        this.props.findHead("Session");
        const audioEl = document.getElementById('beep');
        audioEl.pause();
    }
        /*************************************************************************/
    Counter=()=>{
    
            var fullTime=this.props.theTime;
            var seconds=parseInt(fullTime.slice(3,5));
            var mins =parseInt(fullTime.slice(0,3));
           
            var countdown = setInterval(() =>{
                if (this.props.play===true){
                    seconds--;
                  
                    if (seconds < 0) {
                        seconds=0 ;
                        if(mins>0){
                            mins--;
                            if (mins<10){     
                                mins='0'+mins;
                            }
                  
                            seconds=59
                        }
                        else
                        {
                           
                            const audioEl = document.getElementById('beep')
                            audioEl.play();
                                if(this.props.headTime==='Session')
                                {
                                    this.props.findHead("Break");
                                    mins=this.props.theBreak;}
                                else{
                                    this.props.findHead("Session");
                                    mins=this.props.theSession;}
                      

                                seconds=0;
                        }
                    }
                  
                    if (mins==0) document.getElementById("timer").style.color="red";
                    else  document.getElementById("timer").style.color="darkblue"; 
                    if(seconds<10)
                    {seconds='0'+seconds;}

                    let fullTime=mins+':'+seconds;

                    this.props.calTime(fullTime);}
                else{
                    clearInterval(countdown);

                }

            }, 1000);
       
        
        this.props.togelTime(this.props.play)
    }
        /************************************/

   
    render() {

        return(
            <div id="clock">
              
            <Row>
            <Col className="col">
            <label id="break-label">Break Length</label>
            <br/>
            <Button className="btn" id="break-decrement" className="btn btn-default" onClick={this.HandelDecBreak}><i className='fas fa-arrow-circle-down'></i></Button> 
                 
                     <input id="break-length" value={this.props.theBreak}/>
            <Button id="break-increment" onClick={this.HandelIncBreak}><i className="fas fa-arrow-circle-up"></i></Button>
            </Col>
            <Col className="col">
                 <label id="session-label">Session Length</label>
            <br/>
            <Button id="session-decrement"><i className='fas fa-arrow-circle-down' onClick={this.HandelDecSession}></i></Button> 
              
                    <input id="session-length" value={this.props.theSession} />
            <Button id="session-increment"><i className="fas fa-arrow-circle-up" onClick={this.HandelIncSession}></i></Button>
           </Col>
            </Row>
            <br/>
            <div id="timer">
                <div id="timer-label">
                    <label>{this.props.headTime}</label><br/>
                    <label id="time-left">{this.props.theTime}</label>
                    </div>
                      <Button id="start_stop" onClick={this.Counter}> <i className="fas fa-play"></i><i className="fas fa-pause"></i></Button>
                           <Button id="reset" onClick={this.Reset}><i className="fas fa-sync"></i> </Button>
                           
                   
                           
      </div>
       <audio id="beep" ref="audio_tag"  src= {this.props.sound}  preload="auto"  autoPlay/>
                           </div>
            );
    }
}
const mapStateToProps = (state)=>{
    return{
        theBreak:state.theBreak,
        theSession:state.theSession,
        theTime:state.theTime,
        play:state.play,
        headTime:state.headTime,
        sound:state.sound
    };
}

const mapDispatchToProps=(dispatch)=>{
    return{
        calBreak:(inp) => {dispatch(setBreak(inp))},
        calSession:(inp)=> {dispatch(setSession(inp))},
        calTime:(inp)=> {dispatch(setTime(inp))},
        togelTime:(inp)=> {dispatch(playStop(inp))},
        findHead:(inp)=>{dispatch(setHead(inp))}
    };
}


export default connect(mapStateToProps,mapDispatchToProps) (MyClock);