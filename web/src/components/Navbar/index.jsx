import React , {useState} from "react";

//Material components
import {Button} from "@mui/material"

//CSS
import "./index.css"

//Icons
import MapIcon from '@mui/icons-material/Map';
import Modal from "../Modal";
import Modales from "../RegistroUsuario"



const Navbar = () =>{
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const [estadoModal2, cambiarEstadoModal2] = useState(false);
    const handleClickOpen = () => {

        cambiarEstadoModal1(!estadoModal1);
        cambiarEstadoModal2(!estadoModal2);
        


      };
      const clickBttn = document.querySelector("#btnClick");
      const clickBtnRegistro = () => {
        clickBttn.click();
      };
    return(
        <>
        
        <div className="navbar-container">
            <div>
                <h2>Taller</h2>
            </div>
            
            <div className="navbar-btn-group">
                <div><MapIcon className="btn-navbar-map" fontSize="large"/></div>   
                <div>
                    <Button id="btnClick" onClick={e => handleClickOpen()}  variant="contained" className="navbar-btn-single" >Login</Button>
                    <Modales handleClickOpen={handleClickOpen} estadoModal1={estadoModal1} />
                    
                    <Button id="btnClick" onClick={e => handleClickOpen()}  variant="contained" className="navbar-btn-single" >Register</Button>
                    <Modales handleClickOpen={handleClickOpen} estadoModal2={estadoModal2} />

                </div>
                
            </div>
        </div>
        </>
    )
}

export default Navbar;
