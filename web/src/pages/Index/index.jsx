import { useEffect,useState } from "react";

// Material
import {Container, Button} from "@mui/material"

// Icons
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

// Componentes
import IndexTipos from "../../components/IndexTipos";

// Import CSS
import "./index.css"

const Index = () =>{
    console.log('hola')
    return(
        <>
            <Container maxWidth="md" className="index-container">
                <div className="index-titulo">
                    <h1>Taller</h1>
                </div>
                <div className="index-titulo-descripcion">
                    <div className="index-titulo-uno">
                        <p>/ Un taller para todas las persona</p>
                    </div>
                    <div className="index-titulo-dos">
                        <p>Control del estado de tu</p>
                        <p>Vehiculo en Tiempo Real</p>
                    </div>
                    <div className="index-titulo-btn">
                        <Button variant="outlined" className="index-titulo-btn-btn">Encuentranos</Button>
                    </div>
                </div>
                <div className="index-titulo-redes">
                    <span>Nuestras Redes: </span> &nbsp; &nbsp; &nbsp;
                    <TwitterIcon/> &nbsp; &nbsp;
                    <FacebookIcon/> &nbsp; &nbsp;
                </div>
            </Container>
            <Container maxWidth="md">
                <IndexTipos/>
            </Container>
            <Container maxWidth="md" className="exp-container">
                <div className="exp-container-titulo">
                    <div className="exp-container-titulo-uno">
                        <p>/Como funciona la aplicacion?</p>
                    </div>
                    <div>
                        <p>Maneja los sensores desde tu celular</p>
                    </div>
                </div>
                <div className="exp-container-dos">

                </div>
            </Container>
        </>
    );
}

export default Index;
