import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AdminHome from "./components/admin_home";

import Navbar from './components/navbar';

import AllCategories from './components/manage_categories/all_categories';
import AddMainCategory from './components/manage_categories/add_main_category';
import EditMainCategory from './components/manage_categories/edit_main_category';
import AddSubcategory from './components/manage_categories/add_subcategory';
import EditSubcategory from './components/manage_categories/edit_subcategory';

import AllProducts from './components/manage_products/all_products';
import AddProduct from './components/manage_products/add_product';
import EditProduct from './components/manage_products/edit_product';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/" exact component={AdminHome}></Route>

        <Route path="/allcategories" component={Navbar}></Route>
        <Route path="/allcategories" component={AllCategories}></Route>

        <Route path="/addmaincategory" component={Navbar}></Route>
        <Route path="/addmaincategory" component={AddMainCategory}></Route>

        <Route path="/editmaincategory" component={Navbar}></Route>
        <Route path="/editmaincategory" component={EditMainCategory}></Route>

        <Route path="/addsubcategory" component={Navbar}></Route>
        <Route path="/addsubcategory" component={AddSubcategory}></Route>

        <Route path="/editsubcategory" component={Navbar}></Route>
        <Route path="/editsubcategory" component={EditSubcategory}></Route>

        <Route path="/allproducts" component={Navbar}></Route>
        <Route path="/allproducts" component={AllProducts}></Route>

        <Route path="/addproduct" component={Navbar}></Route>
        <Route path="/addproduct" component={AddProduct}></Route>

        <Route path="/editproduct" component={Navbar}></Route>
        <Route path="/editproduct" component={EditProduct}></Route>

      </BrowserRouter>
    )
  }
}
