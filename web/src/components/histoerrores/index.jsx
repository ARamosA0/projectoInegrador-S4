import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {

    TextField,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import "./index.css";

import { geterrmanual } from "../../service/autoServices";
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';


import {
    LocalizationProvider,
    DesktopDatePicker,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Inf_errores = ({ auto }) => {

    //state para el get de errores
    const [userErroresm, setuserErroresm] = useState([]);


    const ErroresManuales = async () => {
        const data = await geterrmanual(auto[0].id);
        console.log(data)
        setuserErroresm(data);
    };
    useEffect(() => {
        ErroresManuales()
    }, []);



    //state para el filtro de errores
    //const [filErr, setFillErr] = useState([]);







    // Select fecha/hora
    const [fecha, setFecha] = useState(dayjs());
    const handleChangeFecha = async (e) => {

        setFecha(e);
        console.log(fecha)
        console.log(e)
        try {
            const response = await geterrmanual(auto[0].id);
            console.log("para la fecha")
            console.log(response[0].rma_fecha)
            const data = response.filter(item => parseInt(item.rma_fecha.slice(8)) === e.$D
                && parseInt(item.rma_fecha.slice(5, 7)) !== e.$M)
            console.log(parseInt(response[0].rma_fecha.slice(8)))
            setuserErroresm(data.map((item) => item))
            console.log(data)

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>

            <Grid item xs={12} sx={{ marginBottom: 5, marginTop: 5 }}>
                <Grid container>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item xs={6}>
                            <DesktopDatePicker
                                label="Escoge la Fecha"
                                inputFormat="MM/DD/YYYY"
                                value={fecha}
                                onChange={handleChangeFecha}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                    </LocalizationProvider>
                </Grid>
            </Grid>
            {
                userErroresm.length > 0 ?

                    <div className="paraerrores">
                        {userErroresm.length > 0 &&
                            userErroresm.map((errr) => (
                                <Grid item xs={7}>
                                    <Card className="polea">
                                        <CardContent className="Ojo">
                                            <div className="linea">

                                                <p className="parrafouno"><b>{errr.rma_nombre}</b></p>
                                            </div>
                                            <div className="descripcion del error">
                                                <h3>Descripcion: </h3>
                                                <p className="parrafo"> {errr.rma_descripcion}</p>

                                            </div>
                                            <div className="botones">
                                                <h3>Fecha: </h3>
                                                <p className="parrafo"> {errr.rma_fecha}</p>
                                                <h3>Hora: </h3>
                                                <p className="parrafo"> {errr.rma_hora}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <br /><br /><br />
                                </Grid>

                            ))}
                    </div>

                    :
                    <div className="ContenedorErrr">

                        <div className="icono">
                            <YoutubeSearchedForIcon sx={{ fontSize: 100, color: '#FF5733' }} />
                        </div>
                        <Grid item xs={4}>
                            <Card className="noerrorescontent">
                                <CardContent className="noerrores">
                                    <div >
                                        <p>No hay ningun error en esta fecha</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <br /><br /><br />
                        </Grid></div>
            }





        </>
    );
};

export default Inf_errores;