import React, { Component } from 'react'
import {RiLockPasswordLine} from 'react-icons/ri'
import {BsFillPersonFill} from 'react-icons/bs'
import './index.css'
export default class AdminLogin extends Component {

    state = {
        userName : '',
        userPassword : '',
        showSubmitError : false,
        errorMsg : ''
    }

    handleAdminName = (event) => {
      this.setState({userName : event.target.value});
    }

    handleAdminPassword = (event) => {
      this.setState({userPassword : event.target.value});
    }

    onSubmitSuccess = () => {
        const {history} = this.props;
        history.replace("/searchEmpByAdmin");
    }

    onSubmitFailure = (error) => {
        this.setState({showSubmitError : true, error});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {userName,userPassword} = this.state;
        const adminDetails = {userName,userPassword}
        const url = 'http://localhost:9090/authenticate'
        const options = {
            method : "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body : JSON.stringify(adminDetails)
        }
        const response = await fetch(url,options)
        const data = await response.json();
        console.log(response);
        if(response.ok === true) {
            this.onSubmitSuccess();
        }else {
            this.onSubmitFailure(data.error);
        }
    }

  render() {
    const {userName,userPassword} = this.state
    const {showSubmitError} = this.state;
    return (
        <div className="login-bg-container">
          {/* <h1 className="admin">Admins only can Login</h1> */}
        <form onSubmit={this.handleSubmit}>
        <div className="form-body-1">
        <div className="d-flex flex-row justify-content-center">
            <img  className="emp-image" alt="employee-img" src="https://cdn4.iconfinder.com/data/icons/office-34/256/28-512.png"/>
        </div>
        <h3 className="login">Login</h3>
        <p className="login">Sign into your account</p>
          <div className="col-12 mb-3">
                {/* <label htmlFor="userName" className="form_label">Admin Name</label> */}
                <div className="d-flex flex-row justify-content-center">
                <BsFillPersonFill className="search-icon pt-1" onClick={this.searchResults}/>
                <input id="userName" className="form-control" type="text" placeholder="Admin Name" onChange={this.handleAdminName} value={userName}/>
                </div>
            </div>
            <div className="col-12 mb-3">
                {/* <label htmlFor="userPassword" className="form_label">Password</label> */}
                <div className="d-flex flex-row justify-content-center">
                <RiLockPasswordLine className="search-icon pt-1" onClick={this.searchResults}/>
                <input id="userPassword" className="form-control" type="password" placeholder="Password" onChange={this.handleAdminPassword} value={userPassword}/>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-end">
          <button className="btn btn-primary">
              LOGIN
          </button>
            </div>
            {showSubmitError && <p className="error-msg">*UserName & Password doesn't match</p>}
            </div>
        </form>
        </div>
    )
  }
}

