import React from 'react';
import './App.css';

//Import react routes and its other modules
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//Include Sweetalert for success messages
import Swal from 'sweetalert2'

//Bootstrap libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery for bootstrap modal
import 'jquery/dist/jquery.min.js';

import $ from 'jquery';

//Axios servies module for post or get request
import axios from 'axios';


class Home extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        data: [],
        userdetails:[]
              }
              this.addFormData = this.addFormData.bind(this);
      }

      //Form Submission for updation
        addFormData(evt)
        {
          evt.preventDefault();
          const fd = new FormData();
          fd.append('updateUsername', this.refs.myUsername.value);
          fd.append('updateEmail', this.refs.myEmail.value);
          fd.append('updateid', this.refs.myID.value);
          
          axios.post('http://localhost/save.php', fd
          ).then(res=>
          {

        this.myFormRef.reset();
        $("#editmodal").modal("hide");
        //Get all users details in bootstrap table
        axios.get('http://localhost/save.php').then(res => 
        {
        //Storing users detail in state array object
        this.setState({data: res.data});
        }); 
        //Success Message in Sweetalert modal
        Swal.fire({
          title: 'User id of '+this.refs.myID.value+' has been updated.',
          text: res.data.data,
          type: 'success',
          
        });

        
        }
        );
        }

      //Get user details inside bootstrap modal popup
      userdetails(userid){
        
        const fd = new FormData();
          fd.append('userid', userid);
          
          
          axios.post('http://localhost/save.php', fd
          ).then(res=>
          {
    
            //Storing user detail in state array object
            this.setState({userdetails: res.data[0]});
            $("#myModal").modal("show");

          
          }
          );
      }

      //Edit User Function
      edituser(userid){
        
        const fd = new FormData();
          fd.append('userid', userid);
          
          
          axios.post('http://localhost/save.php', fd
          ).then(res=>
          {
    
            //Storing user detail in state array object
            this.setState({userdetails: res.data[0]});

            //edit user popup form
            $("#editmodal").modal("show");

          
          }
          );
      }

      //Delete User Function
      deleteuser(userid)
      {
        const fd = new FormData();
          fd.append('deleteid', userid);
          
          
          axios.post('http://localhost/save.php', fd
          ).then(res=>
          {
    
            
            //Get all users details in bootstrap table
            axios.get('http://localhost/save.php').then(res => 
            {
            //Storing users detail in state array object
            this.setState({data: res.data});
            }); 

            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'User id of '+userid+' has been deleted.',
              text: res.data.data,
              type: 'success',
              
            });

          
          }
          );
      }
      componentDidMount(){

        //Get all users details in bootstrap table
        axios.get('http://localhost/save.php').then(res => 
        {
        //Storing users detail in state array object
        this.setState({data: res.data});
           }); 
        
        }
    
 
  render() {
   
    return (
     
      <div className="maincontainer">
        
        <h1 className="mr-5 ml-5 mt-5">Reactjs simple crud tutorial for beginners</h1>
        <div className="container mb-5 mt-5 text-left">
        <button className="bg-primary mb-3"><Link class="nav-link" to={'/adduser'}><span>Add</span><i class="fas fa-user"></i></Link></button>
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((result) => {
            return (
             
                 <tr>
                  <td>{result.id}</td>
                  <td>{result.email}</td>
                  <td>{result.username}</td>
                  <td>
                    <button className="bg-info" onClick={e => {this.userdetails(result.id)}}> <i class="fas fa-eye"></i> </button>
                    <button className="bg-warning" onClick={e => {this.edituser(result.id)}}> <i class="fas fa-edit"></i> </button>
                    <button className="bg-danger" onClick={e => {this.deleteuser(result.id)}}> <i class="fas fa-trash"></i> </button>
                  </td>
                </tr>
             
            )
          })}
           
            
          </tbody>
        </table>

        
            
      </div>
      <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
              
                <div class="modal-header">
                  <h4 class="modal-title align-center">User : {this.state.userdetails.username}</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body text-center">
                <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              
            </tr>
          </thead>
          <tbody>
          
             
                  <tr>
                  <td>{this.state.userdetails.id}</td>
                  <td>{this.state.userdetails.email}</td>
                  <td>{this.state.userdetails.username}</td>
                  </tr>
           
            
          </tbody>
        </table>
                </div>
              
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    
      
      
      
      <div class="modal" id="editmodal">
            <div class="modal-dialog">
              <div class="modal-content">
              
                <div class="modal-header">
                  <h4 class="modal-title align-center">User : {this.state.userdetails.username}</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body text-center">
                <form ref={(el) => this.myFormRef = el}>
                <input type="hidden" id="Username" value={this.state.userdetails.id} ref="myID" />
                  <div className="form-group">
                  <input type="email" className="form-control" id="Email" defaultValue={this.state.userdetails.email} aria-describedby="emailHelp" placeholder="Enter email" ref="myEmail" />
                  
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="Username" defaultValue={this.state.userdetails.username} placeholder="Enter Username" ref="myUsername" />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.addFormData}>Update</button>
                </form>
                </div>
              
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    
      </div>
)
};
}

export default Home;