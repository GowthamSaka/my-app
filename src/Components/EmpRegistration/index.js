import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'


export default class RegisterForm extends Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {},
        projects : [],
        designations : [],
        Employee : []
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    componentDidMount() {
        fetch("http://localhost:8080/api/e1/allprojects")
            .then((res) => res.json())
            .then((json) => {
                this.setState({projects: json});
            }).catch(rejected => {
                console.log(rejected);
            });
        fetch("http://localhost:8080/api/e1/alldesignations")
            .then((result) => result.json())
            .then((jsonData) => {
                this.setState({designations : jsonData})
        }).catch(rejected => {
            console.log(rejected);
        });
    }

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields 
      });
    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["empname"] = "";
          fields["empid"] = "";
          fields["projects"] = "";
          fields["designation"] = "";
          fields["experience"] = "";
          this.setState({fields:fields});
          let employee = {
            empId: this.state.fields.empid,
            empName: this.state.fields.empname,
            designation: this.state.fields.designation,
            experience: this.state.fields.projects,
            projects: this.state.fields.experience,
        };
        fetch("http://localhost:8080/api/e1/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        }).then((res)=>{
            console.log(res);
            if(res.status === 202){
               window.location.href="/skillsofemp"
               sessionStorage.setItem("employeename",JSON.stringify(employee.empName));
               sessionStorage.setItem("employeeId",JSON.stringify(employee.empId));
            }
        })
      };
    }


    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["empname"]) {
        formIsValid = false;
        errors["empname"] = "*Please enter your empname.";
      }

      if (typeof fields["empname"] !== "undefined") {
        if (!fields["empname"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["empname"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["empid"]) {
        formIsValid = false;
        errors["empid"] = "*Please enter your empcode.";
      }

      if (!fields["projects"]) {
        formIsValid = false;
        errors["projects"] = "*Please enter your project.";
      }

      if (!fields["designation"]) {
        formIsValid = false;
        errors["designation"] = "*Please enter your designation.";
      }

      if (!fields["experience"]) {
        formIsValid = false;
        errors["experience"] = "*Please enter your experience.";
      }

      this.setState({
        errors: errors
      });
      return formIsValid;
    }



  render() {
    const {projects,designations} = this.state;
    return (
    <div id="main-registration-container">
    <h3 className="main-heading">Employee Registration</h3>
    <div id="register">

    <div className="d-flex flex-row justify-content-center">
      <img  className="employee-image shadow" alt="emp-img" src="https://cdn4.iconfinder.com/data/icons/office-34/256/28-512.png"/>
    </div>

    <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >

      <div className="d-flex flex-row justify-content-center align-items-center">
      <label htmlFor="empname" className='form_label'>Emp Name :</label>
      <input type="text" name="empname" value={this.state.fields.empname || ""} onChange={this.handleChange} />
      </div>
      <div className="errorMsg">{this.state.errors.empname}</div>

      <div className="d-flex flex-row justify-content-center align-items-center">
      <label htmlFor="empid" className='form_label'>Emp Code :</label>
      <input type="text" name="empid" value={this.state.fields.empid || ""} onChange={this.handleChange}  />
      </div>
      <div className="errorMsg">{this.state.errors.empid}</div>
      
      <div className="d-flex flex-row justify-content-center align-items-center">
      <label htmlFor="projects" className='form_label'>Projects :</label>
      <select name="projects" className="select-input form-select" value={this.state.fields.projects} onChange={this.handleChange}>
        <option>Select Your Project</option>
          {projects && projects.map((item,index) => (
            <option value={item.projectName} key={index}>{item.projectName}</option>
          ))}
      </select>
      </div>
      <div className="errorMsg">{this.state.errors.projects}</div>
      
      <div className="d-flex flex-row justify-content-center align-items-center">
      <label htmlFor="experience" className='form_label'>Experience :</label>
      <select name="experience" className="select-input form-select" value={this.state.fields.experience} onChange={this.handleChange}>
          <option value="yearsofexperience">Years of Experience</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="more">more</option>
      </select>
      </div>
      <div className="errorMsg">{this.state.errors.experience}</div>
      
      <div className="d-flex flex-row justify-content-center align-items-center">
      <label htmlFor='designation' className='form_label'>Designation :</label>
      <select name="designation" className="select-input form-select" value={this.state.fields.designation} onChange={this.handleChange}>
          <option>Select Your Designation</option>
          {designations && designations.map((designation,index) => {
                  return <option value={designation.designationName} key={index}>{designation.designationName}</option>
          })}
      </select>
      </div>
      <div className="errorMsg">{this.state.errors.designation}</div>
      
      <div className="d-flex flex-row justify-content-center">
      <input type="submit" className="button btn btn-primary"  value="Register"/>
      </div>
      </form>
    </div>
</div>
    );
  }
}