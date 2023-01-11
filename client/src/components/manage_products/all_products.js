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
          <center><h4>Manage Products - All Products</h4></center>
        </div>

        <br></br>


        <div style={{ margin: '30px 250px 0px 250px' }}>
          <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}></input>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Member</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <form className='needs-validation' noValidate>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Name</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Name' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Address</label>
                    <input type='text' className='form-control' name='address' placeholder='Enter Address' value={this.state.address} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.addressError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Email</label>
                    <input type='email' className='form-control' name='email' placeholder='Enter Email' value={this.state.email} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.emailError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Phone Number</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">+94</span>
                      </div>
                      <input type='tel' className='form-control' name='phoneNumber' placeholder='Enter Phone Number' aria-describedby="inputGroupPrepend" value={this.state.phoneNumber} onChange={this.handleInputChange}></input>
                    </div>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.phoneNumberError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Gender</label>

                    <select name='gender' id="inputState" class="form-control" value={this.state.gender} onChange={this.handleInputChange}>
                      <option selected>Choose...</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.genderError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Weight (kg)</label>
                    <input type='number' className='form-control' name='weight' min="1" placeholder='Enter Weight' value={this.state.weight} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.weightError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Height (cm)</label>
                    <input type='number' className='form-control' name='height' min="1" placeholder='Enter Height' value={this.state.height} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.heightError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Joining Date</label>
                    <input type='date' className='form-control' name='joiningDate' placeholder='Enter Joining Date' value={this.state.joiningDate} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.phoneNumberError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Other Details</label>
                    <textarea type="text" className='form-control' name='otherDetails' value={this.state.otherDetails} onChange={this.handleInputChange}></textarea>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success" onClick={this.onSubmit}>Add</button>
              </div>

            </div>
          </div>
        </div>

        <table className='table table-hover' style={{ marginTop: '40px' }}>

          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Serial No.</th>
              <th scope='col'>Product Image</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Category</th>
              <th scope='col'>Brand</th>
              <th scope='col'>Price</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Availability</th>
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