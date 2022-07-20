import React from "react";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


const EmpName = JSON.parse(sessionStorage.getItem("employeename"));
const EmpId = JSON.parse(sessionStorage.getItem("employeeId"));

class EmployeeTechnology extends React.Component {
  
  state = {
    formValues: [{empId:EmpId,empName:EmpName , techName: "", rating : ""}],
    technologies:[],
    techName : ''
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }


  addFormFields() {
    this.setState(({
      formValues: [...this.state.formValues, {empId:EmpId,empName:EmpName ,techName: "", rating: "" }]
    }))
  }


  removeFormFields(i) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }

  handleSubmit(event) {
    const {formValues} = this.state;
    event.preventDefault();
    alert(JSON.stringify(this.state.formValues));
    console.log(formValues);
    fetch("http://localhost:8080/api/e1/skillsofemployees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        formValues // Use your own property name / key
      ),
    });
  }


  componentDidMount() {
    fetch("http://localhost:8080/api/e1/alltechnologies")
        .then((result) => result.json())
        .then((jsonsData) => {
            this.setState({technologies : jsonsData})
        })
        .catch((err)=>{
            console.log(err)
    })
    this.getEmployeeData();
    }

    getEmployeeData = async () => {
      const EmpName = JSON.parse(sessionStorage.getItem("employeename"));
      const EmpId = JSON.parse(sessionStorage.getItem("employeeId"));
      console.log(EmpName);
      console.log(EmpId);
      try {
        const response = await fetch(
          `http://localhost:8080/api/e1/byuser/${EmpName}`
        );
        const json = await response.json();
        console.log(json);
        this.setState({id : EmpId});
      } catch (error) {
        console.log("error", error);
      }
    }
    
  render() {
      const {technologies} = this.state;
      const {id} = this.state;
      return (      
        <div className="container tech-bg-container">
            <div className="row">
                <div className="col-sm-8 ">
                  <h1>Welcome {EmpName}</h1>
                  <table className="table">
                    <thead>
                      <tr>
                          {/* <th>id</th> */}
                          <th className="fields">EmpUniqueId</th>
                          <th className="fields">EmpName</th>
                          <th className="fields">Technolgies</th>
                          <th className="fields">Rating ?/10</th>
                          <th>
                        <button 
                        onClick={() => this.addFormFields()} 
                        className="btn btn-outline-success">
                        +
                      </button></th>
                      </tr>
                    </thead> 
                    <tbody>
                    {this.state.formValues.map((element, index) => (
                    <tr id="addr1" key={index}>
                      {/* <td className="pt-4 ">{index}</td> */}
                      <td className="pt-4 pr-4 ">{id}</td>
                      <td className="pt-4 pr-4 ">{EmpName}</td>
                      <td>
                      <select name="techName" className="mt-2 form-control-m ratings" techname="techname" onChange={e => this.handleChange(index, e)} isDisabled="true">
                        <option defaultValue="none" >Select Technologies</option>
                            {technologies && technologies.map((item,index) => {
                                return <option value={item.techName} key={index}>{item.techName}</option>
                            })}
                      </select>
                      </td>

                      <td>
                      <input type="number" 
                      name="rating" 
                      className="mt-2 form-control-m ratings" 
                      value={element.rating || ""}
                      placeholder = "rating"
                      required
                      min="1"
                      max = "10"
                      onChange={e => this.handleChange(index, e)} 
                      />
                      </td>

                      <td> 
                      <button
                        className="btn btn-outline-danger m-2"
                        onClick={() => this.removeFormFields(index)}
                      >
                        x
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <button
                onClick={this.handleRemoveRow}
                className="btn btn-danger float-right m-2"
              >
                Delete Last Row
              </button> */}
              <button
                className="btn btn-success float-right"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <Button
                as={Link}
                to="/registration"
  	            variant="text"
                className="btn btn-secondary m-2"
              >
     	          Back
              </Button>
            </div>
          </div>
        </div>
    )
  }
}

export default EmployeeTechnology;
