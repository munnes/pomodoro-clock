// JavaScript source code

import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import addTask from '../actions/addTask';
import editTask from '../actions/editTask';
import delTask from '../actions/delTask';
import updtTask from '../actions/updtTask';
import {Form} from 'react-bootstrap';
import TaskTable from './TaskTable';

class MyTask  extends Component {
    handleSubmit=(e)=>{
        e.preventDefault();
        const title= this.refs.title.value;
        const description= this.refs.desc.value;
        const theDate=this.refs.dDate.value;
        let id=new Date();
        let upd=false;
        
        for (let i=0;i<this.props.task.length;i++){    
            if (this.props.task[i].isEdit==true){
                id=  this.props.task[i].id;
                i=this.props.task.length;
                upd=true
                }}
    
            const data ={
                id: id,
                title:title,
                description:description,
                theDate:theDate,
                isEdit: false
            };
            if (upd==true)
            {
                this.props.update(id,data)
                document.getElementById("addUpd").innerHTML="Add"
                
            }
            else{
                this.props.add(data);
              }
                    this.refs.title.value='';
                    this.refs.desc.value='';
                    this.refs.dDate.value=''; 
        }

        editRow=(idx)=>{
                  document.getElementById("addUpd").innerHTML="Update"        
                  this.refs.title.value =this.props.task[idx].title;
                  this.refs.desc.value=this.props.task[idx].description;
                  this.refs.dDate.value=this.props.task[idx].theDate;        
                  this.props.edit(this.props.task[idx].id);
      }
        deleteRow=(idx)=>{
                  this.props.del(this.props.task[idx].id);
       }    

        render(){
    
    return (
    <div className="container-fluid">
            <h1 id="head"> Task management</h1>
<Form onSubmit={this.handleSubmit} id="myForm">
     <br/>
    <Form.Group as={Row} controlId="formHorizontalText">
     
        <Form.Label column sm={2} className="lbl">
          Task
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" placeholder="add task" ref="title" required  ref="title" className="inp" />
        </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalDesc">
        <Form.Label column sm={2} className="lbl">
          Description
        </Form.Label>
        <Col sm={9}>
          <Form.Control as="textarea" rows="3" placeholder="descripe task" required ref="desc" className="inp"/>
        </Col>
  </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalDue">
        <Form.Label column sm={2} className="lbl">
          Due Date
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="date" required ref="dDate"   />
        </Col>
  </Form.Group>

  <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button  id="addUpd"  type="submit">Add</Button>
        </Col>
  </Form.Group>
  </Form>
  {/* pass function as props to another component */}
<TaskTable editT={this.editRow} deleteT={this.deleteRow} />
                        </div>
                        );
                        }}

const mapStateToProps = (state) => {
    return {
      task:state
    }
}
const mapDispatchToProps = (dispatch) => 
{ 
    return { 
        add:(inp) => {dispatch(addTask(inp))},
        del:(inp)=>{dispatch(delTask(inp))},
        edit:(inp)=>{dispatch(editTask(inp))},
        update:(id,inp)=>{dispatch(updtTask(id,inp))}    
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(MyTask);


