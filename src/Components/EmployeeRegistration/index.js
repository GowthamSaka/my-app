import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'


export default class Registration extends Component {

    state = {
        projects : [],
        designations : [],
        empname : '',
        empid : '',
        desig : '',
        exp : '',
        project : '',
        Employee : [],
        errors : {},
        fields : {}
    }

   onChangeEmpName = (event) => {
        this.setState({empname : event.target.value})
   }

   onChangeEmpCode = (event) => {
       this.setState({empid : event.target.value});
   }


    getProject = (event) => {
        this.setState({project : event.target.value},()=>console.log(this.state.project));
    }
    
    getExperience = (event) => {
        this.setState({exp : event.target.value},()=>console.log(this.state.exp));
    }

    getDesignation = (event) => {
        this.setState({desig : event.target.value},()=>console.log(this.state.desig))
    }

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

    saveuser = (e) => {
        e.preventDefault();
        let employee = {
            empId: this.state.empid,
            empName: this.state.empname,
            designation: this.state.desig,
            experience: this.state.exp,
            projects: this.state.project,
        };
      
        fetch("http://localhost:8080/api/e1/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        }).then((res)=>{
            console.log(res);
            if(res.status === 200){
               window.location.href="/skillsofemp"
               sessionStorage.setItem("employeename",JSON.stringify(employee.empName));
               sessionStorage.setItem("employeeId",JSON.stringify(employee.empId));
            }else {
                this.validateForm();
            }
        })
      };

      validateForm() {
        let errors = {};
        let employee = this.state;
        let formIsValid = true;

        if(!employee["empName"]) {
            formIsValid = false;
            errors["empName"] = "*Please Enter Employee Name"
        }else {
            errors.empName = ""
        }

        if (typeof employee["empName"] !== "undefined") {
            if (!employee["empName"].match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["empName"] = "*Please enter alphabet characters only.";
            }
          }

        if(!employee["empId"]) {
            formIsValid = false;
            errors["empId"] = "*Please Enter Employee Code"
        }

        if(!employee["projectName"]) {
            formIsValid = false;
            errors["projectName"] = "*Please Select One Project"
        }

        if(!employee["designation"]) {
            formIsValid = false;
            errors["designation"] = "*Please Select Your Designation"
        }

        if(!employee["experience"]) {
            formIsValid = false;
            errors["experience"] = "*Mention Your experience"
        }

        this.setState({
            errors : errors
        });
        return formIsValid;
      }

      componentDidUpdate() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
          window.history.pushState(null, document.title, window.location.href);
        });
      }
    
  render() {
    const {projects,designations,empname,empid,project,exp,desig} = this.state;
    return (
      <div className="bg-container">
        <h1 className="text-center heading">Employee Registration</h1>
        <div className="form-body">

            <div className="d-flex flex-row justify-content-center">
            <img  className="employee-image shadow" alt="emp-img" src="https://cdn4.iconfinder.com/data/icons/office-34/256/28-512.png"/>
            </div>

            <div className="errorMsg">{this.state.errors.empName}</div>
            <div className="col-12 mb-2 d-flex flex-row justify-content-between">
                <label htmlFor="empname" className="form_label p-1">Emp Name : </label>
                <input name="empname" 
                required
                className="form-control" 
                type="text" 
                id="empname" 
                value={empname || ""}
                placeholder="Employee Name" 
                onChange={ this.onChangeEmpName}
                />
            </div>
            
            <div className="errorMsg">{this.state.errors.empId}</div>
            <div className="col-12 mb-2 d-flex flex-row justify-content-between">
                <label htmlFor="empid" className="form_label p-1">Emp Code : </label>
                <input name="empid"
                required
                className="form-control"
                type="text" id="empid"
                value={empid || ""}
                placeholder="Employee ID"
                onChange= {this.onChangeEmpCode}
                />
            </div>
            
            <div className="errorMsg">{this.state.errors.projectName}</div>
            <div className="col-12 mb-2 d-flex flex-row justify-content-between">
                <label className="form_label p-1">Your Project : </label>
                <select name="projects" className="select-input form-select" value={project} onChange={this.getProject}>
                    <option>Select Your Project</option>
                    {projects && projects.map((item,index) => (
                         <option value={item.projectName} key={index}>{item.projectName}</option>
                    ))}
                </select>
            </div>

            <div className="errorMsg">{this.state.errors.experience}</div>         
            <div className="col-12 mb-2 d-flex flex-row justify-content-between">
                <label className="form_label p-1">Experience :</label>
                <select name="experience" className="select-input form-select" value={exp} onChange={this.getExperience}>
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
            
            <div className="errorMsg">{this.state.errors.designation}</div>
            <div className="col-12 mb-2 d-flex flex-row justify-content-between">
                <label className="form_label p-1">Designation :</label>
                <select name="designation" className="select-input form-select" value={desig} onChange={this.getDesignation}>
                    <option>Select Your Designation</option>
                {designations && designations.map((designation,index) => {
                        return <option value={designation.designationName} key={index}>{designation.designationName}</option>
                })}
                </select>
            </div>
            
          <div className="d-flex flex-row justify-content-center">
          <button className="btn btn-primary" onClick={this.saveuser}>
              SIGN UP
        </button>
          </div>
        </div>  
      </div>
    )
  }
}