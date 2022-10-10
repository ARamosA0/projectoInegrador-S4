import { useState } from "react";

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
                <h2>Taller</h2>
            </div>
            
            <div className="navbar-btn-group">
                <div><MapIcon className="btn-navbar-map" fontSize="large"/></div>   
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