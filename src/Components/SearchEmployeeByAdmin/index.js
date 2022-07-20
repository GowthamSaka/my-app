import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
// import {AiOutlineSearch} from 'react-icons/ai'
import MaterialTable from '@material-table/core';
import tableIcons from '../MaterialTable/materialtableicons'
import './index.css'

export default class SearchPage extends Component {

  state = {
    data : []
  }

    componentDidMount() {
      fetch("http://localhost:8080/api/e1/requiredempdata")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  data: json,
              },()=>console.log(json));
      })
  }


  render() {
    //const {projects,designations,project,desig,technologies,techName} = this.state;
      const {data} = this.state;
      const columns = [
        { title: "ID", field: "empId" },
        { title: "Username", field: "empName" },
        { title: "Designation", field: "designation" },
        { title: "Projects", field: "projects" },
        { title: "Technology", field : "techName"},
        { title: "Experience", field : "experience"}
      ]
      
    return (
      <div className="search-bg-container">
        <h1 className="text-start">Welcome Admin</h1>
        <MaterialTable
         title="Employee Data"
         icons={tableIcons}
         data={data}
         columns={columns}
         className="table"
        />
      </div>
    )
  }
}
