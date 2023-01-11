import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AdminHome from "./components/admin_home";

import Navbar from './components/navbar';

import AllCategories from './components/manage_categories/all_categories';
import AddCategory from './components/manage_categories/add_category';
import AddSubCategory from './components/manage_categories/add_subcategory';
import EditMember from './components/manage_categories/EditMember';
import PostMember from './components/manage_categories/PostMember';

import AllProducts from './components/manage_products/all_products';
import AddProduct from './components/manage_products/add_product';
import EditPlan from './components/manage_products/EditPlan';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/" exact component={AdminHome}></Route>

        <Route path="/all_categories" component={Navbar}></Route>
        <Route path="/all_categories" component={AllCategories}></Route>

        <Route path="/add_category" component={Navbar}></Route>
        <Route path="/add_category" component={AddCategory}></Route>

        <Route path="/add_subcategory" component={Navbar}></Route>
        <Route path="/add_subcategory" component={AddSubCategory}></Route>

        <Route path="/editmember" component={Navbar}></Route>
        <Route path="/editmember/:id" component={EditMember}></Route>

        <Route path="/postmember" component={Navbar}></Route>
        <Route path="/postmember/:id" component={PostMember}></Route>

        <Route path="/all_products" component={Navbar}></Route>
        <Route path="/all_products" component={AllProducts}></Route>

        <Route path="/add_product" component={Navbar}></Route>
        <Route path="/add_product" component={AddProduct}></Route>

        <Route path="/editworkoutplan" component={Navbar}></Route>
        <Route path="/editworkoutplan/:id" component={EditPlan}></Route>

      </BrowserRouter>
    )
  }
}