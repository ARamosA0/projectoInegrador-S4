import { useState } from "react";
import {Link} from "react-router-dom"

//Material components
import {Button, Container} from "@mui/material"

//CSS
import "./index.css"

//Icons
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddLocationIcon from '@mui/icons-material/AddLocation';

const Footer = () => {
    return (
        <div className="baxkground">
        <Container maxWidth="md" className="footer-container">
            <div className="footer-cont-one">
                <div className="footer-component">
                    <LocalPhoneIcon sx={{color:"#EB3B3B", marginRight:2}} />
                    <div>
                        <p>Llamnos 24/7</p>
                        <p>+1 748392730</p>
                    </div>
                </div>
                <div className="footer-component">
                    <AddLocationIcon sx={{color:"#EB3B3B", marginRight:2}} />
                    <div>
                        <p>Estamos en</p>
                        <p>Direccion xxxx calle XX</p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p>Horas de Atencio</p>
                    <p>Lunes - Viernes: <span>6:00 - 20:00</span> </p>
                    <p>Sabado: <span>6:00 - 18:00</span> </p>
                </div>
            </div>
            <div className="footer-cont-two">
                <div className="footer-component-btn">
                    <p>Necesitas ayuda</p>
                    <p>Llamanos</p>
                    <Link to={'/ubicacion'}>
                    <Button variant="contained" className="navbar-btn-single">Contactanos</Button>
                    </Link>
                </div>
            </div>
        </Container>
        </div>
    )
}

export default Footer;