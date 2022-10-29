
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import swal from "sweetalert2";

//Material components
import {Avatar, Button, IconButton, Menu, MenuItem} from "@mui/material"

//CSS
import "./index.css"

//Icons
import MapIcon from '@mui/icons-material/Map';
import Modal from "../Modal";
import Modales from "../RegistroUsuario"
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";

import RegUsuario from "../RegUsuario";

import { userData,loginOut } from "../../service/userServices";

const Navbar = () =>{
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () =>{
        setOpen(!open) ;
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const clickBttn = document.querySelector("#btnClick");
    //funcion para darle click al boton registro
    const clickBtnRegistro = () => {
      clickBttn.click();
    };

    const user = JSON.parse(localStorage.getItem("userID")); 

    const clickCerrarSesion = () => {
        localStorage.removeItem("userID");
        if (!localStorage.getItem("userID")) {
          const response = swal.fire(
            'Sesion cerrada',
            'Cerraste sesion correctamente',
            'success'
          );
          setTimeout(() => {
            if (response) {
                window.location.replace("");
            }
          }, 2000);
        }
    }

    const getUserData = async () =>{
        setUser(userData())
    }



    return(
        <>
        
        <div className="navbar-container">
            <div>
                <Link to={"/"}><h2>Taller</h2></Link>
            </div>
            
            <div className="navbar-btn-group">
                <div><Link to={"/ubicacion"}><MapIcon className="btn-navbar-map" fontSize="large"/></Link></div>   
                <div>

                    {!user?(
                        <>
                            <Button
                                id="btnClick"
                                size="large"
                                onClick={handleClickOpen}
                                color="inherit"
                                className="navbar-btn-single">
                                <span>&nbsp;&nbsp;Iniciar Sesion</span>
                            </Button>
                        
                            <RegUsuario handleClickOpen={handleClickOpen} open={open}/>
                        </>
                    ):(
                        <Button
                            id="btnClick"
                            size="large"
                            onClick={handleMenu}
                            color="inherit"
                            className="navbar-btn-single">
                            <span>&nbsp;&nbsp;{user.name}</span>
                        </Button>
                    )}

                    {!user?(
                        <></>
                    ) : (
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                             <MenuItem>
                                <Link
                                to={`/usuario/${user.id}`}
                                color="black"
                                undeline="none"
                                className="navbar-btn-single-out">
                                    <PersonAdd fontSize="small" />
                                    &nbsp;&nbsp;Mi Cuenta
                                </Link>
                             </MenuItem>
                             <MenuItem
                                variant="outlined"
                                className="navbar-btn-single-out"
                                onClick={clickCerrarSesion}>
                                    <Logout fontSize="small" />
                                    &nbsp;&nbsp;Cerrar Sesion
                             </MenuItem>            
                        </Menu>
                    )}

                </div>
                
            </div>
        </div>
        </>
    )
}

export default Navbar;
