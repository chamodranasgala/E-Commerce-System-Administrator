import React, { Component } from 'react';
import axios from 'axios';

export default class add_main_category extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mainCategory: ""
    }

    this.state = {
      manage_category: []
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

    let mainCategoryError = "";

    if (!this.state.mainCategory) {
      mainCategoryError = 'This field is required!';
    }

    if (mainCategoryError) {
      this.setState({mainCategoryError});
      return false;
    }

    return true;
  };

  //Add
  onSubmit = (e) => {
    e.preventDefault();

    const { mainCategory } = this.state;

    const isValid = this.validate();
    if (isValid) {
      const data = {

        mainCategory: mainCategory

      }

      console.log(data)

      axios.post("/maincategory/save", data).then((res) => {
        if (res.data.success) {
          alert("Added Successfully.");
          this.setState(
            {
              mainCategory: ""
            }
          );

          window.location.href = '/maincategory';
        }
      });
    }
  }

  //Retrieve
  componentDidMount() {
    this.retrieveMainCategories();
  }

  retrieveMainCategories() {
    axios.get("/maincategories").then(res => {
      if (res.data.success) {
        this.setState({
          maincategories: res.data.existingMainCategories
        });

        console.log(this.state.maincategories)
      }
    });
  }

  //Delete
  onDelete = (sn) => {
    axios.delete(`/maincategory/delete/${sn}`).then((res) => {
      alert("Deleted Successfully.")
      this.retrieveMainCategories();
    });
  }

  
  render() {
    return (
      <div className='container' style={{ marginBottom: '50px' }}>

        <br></br>

        <div>
          <center><h4>Manage Categories - Add Main Category</h4></center>
        </div>

        <br></br>

        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ marginLeft: '250px' }}>Add Main Category</button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Main Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <form className='needs-validation' noValidate>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Main Category Name</label>
                    <input type='text' className='form-control' name='mainCategory' placeholder='Enter Main Category Name' value={this.state.mainCategory} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.mainCategoryError}         
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




        <table className='table table-hover' style={{ marginTop: '40px' }}>

          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Main Category</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.posts.map((posts,index) =>(
              <tr>
                <th></th>
              </tr>

            ))}

          </tbody>
          
        </table>

      </div>
      
    )
  }
}