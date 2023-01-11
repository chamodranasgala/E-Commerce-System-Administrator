import React, { Component } from 'react';
import axios from 'axios';


export default class MemberList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      memberName: "",
      address: "",
      email: "",
      phoneNumber: "",
      gender: "",
      weight: "",
      height: "",
      joiningDate: "",
      otherDetails: ""
    }

    this.state = {
      members: []
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  // Validation
  validate = () => {

    let memberNameError = "";
    let addressError = "";
    let emailError = "";
    let phoneNumberError = "";
    let genderError = "";
    let weightError = "";
    let heightError = "";

    if (!this.state.memberName) {
      memberNameError = 'This field is required!';
    }
    if (!this.state.address) {
      addressError = 'This field is required!';
    }
    if (!this.state.email) {
      emailError = 'This field is required!';
    }
    if (!this.state.phoneNumber) {
      phoneNumberError = 'This field is required!';
    }
    if (!this.state.gender) {
      genderError = 'This field is required!';
    }
    if (!this.state.weight) {
      weightError = 'This field is required!';
    }
    if (!this.state.height) {
      heightError = 'This field is required!';
    }

    if (memberNameError || addressError || emailError || phoneNumberError || genderError || weightError || heightError) {
      this.setState({ memberNameError, addressError, emailError, phoneNumberError, genderError, weightError, heightError });
      return false;
    }

    return true;
  };

  //Add
  onSubmit = (e) => {
    e.preventDefault();

    const { memberName, address, email, phoneNumber, gender, weight, height, joiningDate, otherDetails } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const data = {

        memberName: memberName,
        address: address,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        weight: weight,
        height: height,
        joiningDate: joiningDate,
        otherDetails: otherDetails
      }

      console.log(data)

      axios.post("/member/save", data).then((res) => {
        if (res.data.success) {
          alert("Member Detailes Saved Successfully");
          this.setState(
            {
              memberName: "",
              address: "",
              email: "",
              phoneNumber: "",
              gender: "",
              weight: "",
              height: "",
              joiningDate: "",
              otherDetails: ""
            }
          );

          window.location.href = '/memberlist';
        }
      });
    }
  }

  componentDidMount() {
    this.retrieveMembers();
  }

  retrieveMembers() {
    axios.get("/members").then(res => {
      if (res.data.success) {
        this.setState({
          members: res.data.existingMembers
        });

        console.log(this.state.members)
      }
    });
  }

  //Search
  filterData(members, searchKey) {
    const result = members.filter((member) =>
      member.memberName.toLowerCase().includes(searchKey)
    )

    this.setState({ members: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/members").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingMembers, searchKey)
      }
    });
  }

  //Delete Button
  onDelete = (id) => {
    axios.delete(`/member/delete/${id}`).then((res) => {
      alert("Deleted Successfully.")
      this.retrieveMembers();
    });
  }

  



  render() {
    return (
      <div className='container' style={{ marginBottom: '50px' }}>

        <br></br>

        <div>
          <center><h4>Manage Categories - All Categories</h4></center>
        </div>

        <br></br>
        

        <div style={{ margin: '30px 250px 0px 250px' }}>
          <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}></input>
        </div>

        

        <table className='table table-hover' style={{ marginTop: '40px' }}>

          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Main Category</th>
              <th scope='col'>Subcategory</th>
              <th scope='col'>Date</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
          </tbody>
          
        </table>

      </div>
      
    )
  }
}