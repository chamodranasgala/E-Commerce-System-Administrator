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
          <center><h4>Manage Products - Add Product</h4></center>
        </div>

        <br></br>



        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginLeft: '250px' }}>
          Add Product
        </button>



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
                    <label style={{ marginBottom: '5px' }}>Product Name</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Product Name' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Main Category</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Main Category' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Subcategory</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Subcategory' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Brand</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Brand' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Price</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Price' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Quantity</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Quantity' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Availability</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Select Availability' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Upload Images</label>
                    <input type='text' className='form-control' name='memberName' placeholder='Enter Name' value={this.state.memberName} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.memberNameError}
                    </div>
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

        {this.state.members.map((members, index) => (
          <div class="card text-center" style={{ margin: '35px 250px 0px 250px' }}>
            <div class="card-header" key={index}>
              Member {index + 1}
            </div>
            <div class="card-body">

              <a href={`/postmember/${members._id}`} style={{ textDecoration: 'none' }}><h5 class="card-title">{members.memberName}</h5></a>

              <p class="card-text">
                {members.email}
                <br /><br />

                Weight:   {members.weight}kg
                <br />

                Height:   {members.height}cm
              </p>

              <a className='btn btn-warning' href={`/editmember/${members._id}`}>
                <i className='fas fa-edit'></i>&nbsp;Edit
              </a>
              &nbsp;&nbsp;

              <a className='btn btn-danger' onClick={() => this.onDelete(members._id)}>
                <i className='far fa-trash-alt'></i>&nbsp;Delete
              </a>
              &nbsp;&nbsp;

              <button className="btn btn-info" onClick={() => this.createPDF(members.memberName, members.address, members.email, members.phoneNumber, members.gender, members.weight, members.height, members.joiningDate, members.otherDetails)}>
                <i class="fa-solid fa-file-pdf"></i>&nbsp;Get Report
              </button>

            </div>
            <div class="card-footer text-muted">
              Joined Date:  {members.joiningDate}
            </div>
          </div>
        ))}

        <table className='table table-hover' style={{ marginTop: '40px' }}>

          <thead>
            <tr>
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