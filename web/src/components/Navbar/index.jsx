import { useState } from "react";
import {Link} from "react-router-dom"

//Material components
import {Button} from "@mui/material"

//CSS
import "./index.css"

//Icons
import MapIcon from '@mui/icons-material/Map';


const Navbar = () =>{

    return(
        <>
        <div className="navbar-container">
            <div>
                <Link to={"/"}><h2>Taller</h2></Link>
            </div>
            
            <div className="navbar-btn-group">
                <div><Link to={"/ubicacion"}><MapIcon className="btn-navbar-map" fontSize="large"/></Link></div>   
                <div>
                    <Button variant="contained" className="navbar-btn-single">Login</Button>
                    <Button variant="contained" className="navbar-btn-single">Registro</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;