
import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';

const TaskTable=(props)=>{
    let view;
    if (props.task.length > 0)
    {
        view= <div id="viewTable">
<table id="myTab" className="table table-bordered table-hover table-responsive ">
    <tr>
        <th id="noCol">Row#</th>
        <th id="titlCol">Title</th>
        <th id="descCol" >Description</th>
        <th id="DDateCol" >Due Date</th>
        <th id="edtCol">Edit</th>
        <th id="delCol">Delete</th>
    </tr>
    <tbody>
{
props.task.map((item, idx) => (

        <tr id="addr0" key={idx}>
            <td>{idx+1}</td>
            <td> {props.task[idx].title}</td>
            <td> {props.task[idx].description} </td>         
            <td>{props.task[idx].theDate}</td>
                    <td>
                        <Button onClick={()=>props.editT(idx)} id="btnEdt" >
                          <i className="fa fa-pencil-square-o" ></i>  Edit
                        </Button>
                    </td> 
                    <td>
                        <Button onClick={()=>props.deleteT(idx)} id="btnDel" className="btn-danger">
                        <i className="fa fa-trash"></i>   Delete
                        </Button>
                    </td>
           </tr>
      ))  }
    </tbody>
                    </table>
                </div>
}
else{
view=<h1 id="empty">No task added</h1>
}
    return (
        <div>
        {view}
        </div>
    )}
    const mapStateToProps = (state) => {
        return {
          task:state
        }
    }
   
    export default connect(mapStateToProps)(TaskTable);
    