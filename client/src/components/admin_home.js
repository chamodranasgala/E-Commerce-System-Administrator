import React from "react";
import "../styles/css/styles.css";


function Adminhome() {
    return (


        <div className="adminhome">

            <div>
                <br />
                <br />


                <div className="container" style={{color:'white'}}><h1 className="text-start">Admin Home</h1></div>


                <br />
                <br />
                <br />
                <a role="button" className="button-87" href="/all_categories">Manage Categories</a>
                <br />
                <a role="button" className="button-88" href="/all_products">Manage Products</a>
                <br />
            </div>
        </div>



    )
}

export default Adminhome;