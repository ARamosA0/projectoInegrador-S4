
import { useState } from "react";
import {Link} from "react-router-dom"

//Material components
import {Avatar, Button, IconButton} from "@mui/material"

//CSS
import "./index.css"

//Icons
import MapIcon from '@mui/icons-material/Map';
import Modal from "../Modal";
import Modales from "../RegistroUsuario"

import RegUsuario from "../RegUsuario";

const Navbar = () =>{
    // const [estadoModal1, cambiarEstadoModal1] = useState(false);
    // const [estadoModal2, cambiarEstadoModal2] = useState(false);
    // const handleClickOpen = () => {

    //     cambiarEstadoModal1(!estadoModal1);
    //     cambiarEstadoModal2(!estadoModal2);
        


    //   };
    //   const clickBttn = document.querySelector("#btnClick");
    //   const clickBtnRegistro = () => {
    //     clickBttn.click();
    //   };

    const [open, setOpen] = useState(null);

    const handleClickOpen = () =>{
        setOpen(!open) ;
    }

    const clickBttn = document.querySelector("#btnClick");
    //funcion para darle click al boton registro
    const clickBtnRegistro = () => {
      clickBttn.click();
    };


    return(
        <>
        
        <div className="navbar-container">
            <div>
                <Link to={"/"}><h2>Taller</h2></Link>
            </div>
            
            <div className="navbar-btn-group">
                <div><Link to={"/ubicacion"}><MapIcon className="btn-navbar-map" fontSize="large"/></Link></div>   
                <div>
                    {/* <Button id="btnClick" onClick={e => handleClickOpen()}  variant="contained" className="navbar-btn-single" >Login</Button>
                    <Modales handleClickOpen={handleClickOpen} estadoModal1={estadoModal1} />
                    
                    <Button id="btnClick" onClick={e => handleClickOpen()}  variant="contained" className="navbar-btn-single" >Register</Button>
                    <Modales handleClickOpen={handleClickOpen} estadoModal2={estadoModal2} /> */}

                    <Button
                        id="btnClick"
                        size="large"
                        onClick={handleClickOpen}
                        color="inherit"
                        className="navbar-btn-single">
                        <span>&nbsp;&nbsp;Iniciar Secion</span>
                    </Button>
                    
                    <RegUsuario handleClickOpen={handleClickOpen} open={open}/>

                </div>
                
            </div>
        </div>
        </>
    )
}

export default Navbar;
