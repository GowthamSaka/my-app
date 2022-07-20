import React, { Component } from 'react'
import {RiLockPasswordLine} from 'react-icons/ri'
import {BsFillPersonFill} from 'react-icons/bs'
import './index.css'
export default class LoginPage extends Component {

    state = {
        adminName : '',
        password : ''
    }

    handleAdminName = (event) => {
      this.setState({adminName : event.target.value});
    }

    handleAdminPassword = (event) => {
      this.setState({password : event.target.value});
    }

handleSubmit = (event) => {
    event.preventDefault();
    if((this.state.adminName === "Gowtham") && (this.state.password === "gouthu")) {
      window.location.href = "/searchEmpByAdmin"
    }else {
      alert("error");
    }
}

  render() {
    const {adminName,password} = this.state
    return (
      <div className="login-bg-container">
    <form onSubmit={this.handleSubmit}>
    <div className="form-body-1">
    <div className="d-flex flex-row justify-content-center">
        <img  className="emp-image" alt="employee-img" src="https://cdn4.iconfinder.com/data/icons/office-34/256/28-512.png"/>
    </div>
    <h3 className="login">Login</h3>
    <p className="login">Sign into your account</p>
      <div className="col-12 mb-3">
            <div className="d-flex flex-row justify-content-center">
            <BsFillPersonFill className="search-icon pt-1" onClick={this.searchResults}/>
            <input id="userName" className="form-control" type="text" placeholder="Admin Name" onChange={this.handleAdminName} value={adminName}/>
            </div>
        </div>
        <div className="col-12 mb-3">
            <div className="d-flex flex-row justify-content-center">
            <RiLockPasswordLine className="search-icon pt-1" onClick={this.searchResults}/>
            <input id="userPassword" className="form-control" type="password" placeholder="Password" onChange={this.handleAdminPassword} value={password}/>
            </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
      <button className="btn btn-primary">
          LOGIN
      </button>
        </div>
        </div>
    </form>
    </div>
    )
  }
}

