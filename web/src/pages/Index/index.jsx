import { useEffect,useState } from "react";

// Material
import {Container, Button} from "@mui/material"

// Import CSS
import "./index.css"

const Index = () =>{
    console.log('hola')
    return(
        <>
            <Container fixed className="index-container">
                <div className="index-titulo">
                    <h1>Taller</h1>
                </div>
                <div className="index-titulo-descripcion">
                    <div>
                        <h5>Un taller para todas las persona</h5>
                    </div>
                    <div>
                        <p>Control del estado de tu</p>
                        <p>Vehiculo en Tiempo Real</p>
                    </div>
                    <div className="index-titulo-btn">
                        <Button variant="outlined" className="index-titulo-btn-btn">Encuentranos</Button>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Index;
