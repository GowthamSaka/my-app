import React, { Component } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FiEdit, FiSave} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
// import ReactLoading from "react-loading";
import './index.css'

export default class EmployeeData extends Component {
    state = {
        ShowData : [],
        name : '',
        editMode:false,
        id : '',
        showResults : true,
        newRating : ''
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/e1/skillsofemployee")
            .then((result) => result.json())
            .then((jsonData) => {
              this.setState({ShowData : jsonData})
        })
        // this.getEmployeeSkills();
    }

    // getEmployeeSkills() {
    //   fetch("http://localhost:8080/api/e1/skillsofemployee")
    //         .then((result) => result.json())
    //         .then((jsonData) => {
    //           this.setState({ShowData : jsonData})
    //     })
    // }

    deleteItem(id) {
      fetch("http://localhost:8080/api/e1/skillsofemployee/" + id, {
        method : "DELETE",
        header:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        }
        }).then((result) => result.json())
          .then((response) =>  {
            console.warn(response);
            //this.getEmployeeSkills();
        })
  }

  updateItem(item) {
    const id = item.skillId;
    console.log(item);
    console.log(this.state.newRating)
    let updatedData = {
        rating : this.state.newRating,
        skillId : item.skillId
      }
      console.log(updatedData)
    fetch("http://localhost:8080/api/e1/skillsofemployee/" + id, {
      method : "PUT",
      header : {
        'Access-Control-Allow-Headers': 'Accept',
        'Access-Control-Allow-Origin': '*',
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
      },
      body :JSON.stringify(updatedData),
    })
  }

   filter = (event) => {
       this.setState({name : event.target.value})
   }

   searchResults = () => {
    const {name,ShowData} = this.state;
    if (name !== '') {
        const results = ShowData.filter((user) => {
          return user.empId.toLowerCase().startsWith(name.toLowerCase());
        });
        this.setState({ShowData : results,showResults:false})
      } else {
        return null
      }
  
      this.setState({name : name});
    };

     editItem(id) {
        this.setState({editMode:true, id:id})
        console.log(id);
    }

    handleChangeRating = (event) => {
      this.setState({newRating : event.target.value},()=>console.log(this.state.newRating));
    }
   
  render() {
      const { ShowData,name,showResults} = this.state;
      const {id} = this.state;
    return (
      <div>
        <input type="search" placeholder="Employee Code" className="search-button" onChange={this.filter} value={name}/>
        <span><AiOutlineSearch className="search-icon" onClick={this.searchResults}/></span>
        {showResults ? null :
        <table>
        <thead>
            <tr>
                {/* <th>SkillId</th> */}
                <th>EmpCode</th>
                <th>EmpName</th>
                <th>Technolgies</th>
                <th>Rating</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        {ShowData && ShowData.length > 0 ? (
        ShowData.map((item, i) => (
        <tbody key={i}>
            <tr key={i}>
              {/* <td>{item.skillId}</td> */}
              <td>{item.empId}</td>
              <td>{item.empName}</td>
              <td>{item.techName}</td>
              <td>{ this.state.editMode && item.skillId === id ? <input type='number' defaultValue={item.rating} onChange={this.handleChangeRating} /> : <p>{item.rating}</p>}</td>
              <td>{this.state.editMode && item.skillId === id  ? <span><FiSave className="search-icon" onClick={  () => this.updateItem(item)}/></span> : <span><FiEdit className="search-icon" onClick={  () => this.editItem(item.skillId)}/></span> }</td>
              <td><span><AiFillDelete className="search-icon" onClick={() => this.deleteItem(item.skillId)}/></span></td>
            </tr>
        </tbody> 
        ))
        ) : (
            <p>No Results Found</p> 
        )}
        </table>
      }
        <Button
          as={Link}
          to="/rows"
  	      variant="text"
          className="btn btn-secondary m-2"
        >
     	      Add New Technolgies
        </Button>
      </div>
    )
  }
}




