import { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Container,
    Card,
    CardContent,
    Grid,
} from "@mui/material";

import { geterrmanual } from "../../service/autoServices";

const Inf_errores = () => {
    const [userErroresm, setuserErroresm] = useState([]);
{/*
    const[userErrores, setuserErrores] =  useState([]);*/}


    const ErroresManuales = async () => {
        console.log(auto[0].id);
        console.log("adorable")
        const data = await geterrmanual(auto[0].id);  
        setuserErroresm(data);
      };

   {/** 
    const ErroresArduino = async (usuarioId) => {
        console.log(usuarioId);
        const data = await geterrarduino(usuarioId);  
        setuserErrores(data);
      };*/}


    



    return (
        <>
            {userErroresm.length > 0 &&
                userErroresm.map((errr) => (
                    <Grid item xs={3}>
                        <Card className="polea">
                            <CardContent className="Nombre del error">
                                <div className="linea">
                                    
                                    <p className="parrafo">{errr.rma_nombre}</p>
                                </div>
                                <div className="descripcion del error">
                                    {/*errr.nombre del campo */}
                                    <p className="parrafo"> {errr.rma_descripcion}</p>
                                   
                                </div>
                                <div className="Fecha y hora del error">
                                <p>Fecha: </p>
                                <p className="parrafo"> {errr.rma_fecha}</p>
                                <p>Hora: </p>
                                <p className="parrafo"> {errr.rma_hora}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            <br/>
          

        </>
    );
};

export default Inf_errores;