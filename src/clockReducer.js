// JavaScript source code
import setBreak from './actions/setBreak';
import setSession from './actions/setSession';
import setTime from './actions/setTime';
import playStop from './actions/playStop';
import setHead from './actions/setHead';
import  beep1 from './beep1.mp3';
const initState = {
    theBreak: 5,
    theSession:25,
    theTime:'25:00',
    headTime:"Session",
    play: false,
    sound:beep1
}
const clockReducer=(state=initState, action)=>{

    switch(action.type){
        case 'set-break':
            return {...state,
                    theBreak:action.data};
        case 'set-session':
            return{...state,
                theSession:action.data};
        case 'set-time':
            return {
                ...state,
                theTime:action.data
            }
        case 'play-stop':
        return{
            ...state,
            play:!action.data
        }
        case 'set-head':
        return{
            ...state,
            headTime:action.data
        }
        default:
            return state;
            }
}
export default clockReducer;