import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AdminHome from "./components/admin_home";

import Navbar from './components/navbar';

import AllCategories from './components/manage_categories/all_categories';
import AddMainCategory from './components/manage_categories/add_main_category';
import AddSubCategory from './components/manage_categories/add_subcategory';


import AllProducts from './components/manage_products/all_products';
import AddProduct from './components/manage_products/add_product';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/" exact component={AdminHome}></Route>

        <Route path="/allcategories" component={Navbar}></Route>
        <Route path="/allcategories" component={AllCategories}></Route>

        <Route path="/addmaincategory" component={Navbar}></Route>
        <Route path="/addmaincategory" component={AddMainCategory}></Route>

        <Route path="/addsubcategory" component={Navbar}></Route>
        <Route path="/addsubcategory" component={AddSubCategory}></Route>





        <Route path="/allproducts" component={Navbar}></Route>
        <Route path="/allproducts" component={AllProducts}></Route>

        <Route path="/addproduct" component={Navbar}></Route>
        <Route path="/addproduct" component={AddProduct}></Route>



      </BrowserRouter>
    )
  }
}