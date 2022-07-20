import React,{Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Modal } from "react-bootstrap";
import './index.css'

export default class Home extends Component{
  constructor(){  
    super();  
    this.state={  
      show:false,
    }  
  }  

  handleModal(){  
    this.setState({show:!this.state.show})  
  } 

  gotoRegistrationPage = () => {
    window.location.replace("/registration");
  }

  gotoEmployeeData = () => {
    window.location.replace("/searchbyemployee");
  }

  gotoLoginPage = () => {
    window.location.replace("/login");
  }
  
  render() {
  return (
    <div>
      <div className="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0g8-ytnyzRjwlKSDIj-_MdbQbTxR_Z--XvfyIdeC4ta3PSb5ebPx60Em-ubGEbr9oRH0&usqp=CAU" 
        alt="Spinebiz" className="spinebiz-image" />
        <ul className="list-items">
        <li className="items"><Button onClick={()=>this.handleModal()}>Admin</Button></li>
        <Modal show={this.state.show} onHide={()=>this.handleModal()}>  
          <Modal.Header closeButton><b>Admins Login Page</b></Modal.Header>  
          <Modal.Body>Admins Only Can log in<br></br>If you are not an admin please click on close button</Modal.Body>  
          <Modal.Footer>  
            <Button onClick={()=>this.handleModal()}>Close</Button>
            <button className="btn btn-primary" onClick={this.gotoLoginPage}>Log In</button>
          </Modal.Footer>  
      </Modal> 

        <li className="items"><button className="btn btn-primary" onClick={this.gotoRegistrationPage}>Employee</button></li>
        <li className="items"><button className="btn btn-primary" onClick={this.gotoEmployeeData}>EmployeeData</button></li>
        </ul>
      </div>
      <div className="body-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqGGpUfjIl6aIAXstmdcXieZtawlZJbLeztg&usqp=CAU" className="bg-image img-fluid" alt="employee"/>
        <div className="content">
          <h1>Spinebiz</h1>
          <p>Connecting the people</p>
          <p>Spinebiz is headquartered in Singapore with delivery centres<br></br> in Chennai and Bangalore and offices in the US, and UK.<br></br>
          Since being founded in 2013 Spinebiz has grown significantly over the years <br></br>and has served clients across 178 locations in 74 countries over the world.</p>
        </div>
      </div>
    </div>
  );
}
}