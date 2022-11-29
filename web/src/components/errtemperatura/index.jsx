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

import { geterrsensor } from "../../service/autoServices";


import {
    LocalizationProvider,
    DesktopDatePicker,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Inf_Err_Temp = () => {

    //state para el get de errores
    const [userErroresm, setuserErroresm] = useState([]);


    //Constante para obtener la data de errores
    const ErroresTemperatura = async () => {
        const data = await geterrsensor();
        console.log(data)
        setuserErroresm(data);
    };
    useEffect(() => {
        ErroresTemperatura()
    }, []);




    // Select fecha/hora
    const [fecha, setFecha] = useState(dayjs());
    const handleChangeFecha = async (e) => {

        setFecha(e);
        console.log(fecha)
        console.log(e)
        try {
            const response = await geterrsensor();
            console.log("para la fecha")
            console.log(response[0].rer_fecregistro)
            const data = response.filter(item => parseInt(item.rer_fecregistro.slice(8)) === e.$D
                && parseInt(item.rer_fecregistro.slice(5, 7)) !== e.$M)
            console.log(parseInt(response[0].rer_fecregistro.slice(8)))
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


            <div className="paraerrores">
                {userErroresm.length > 0 &&
                    userErroresm.map((errr) => (
                        <Grid item xs={7}>
                            <Card className="polea">
                                <CardContent className="Ojo">
                                    <div className="linea">
                                    <h3>Motivo: </h3>
                                        <p className="parrafo">{errr.rer_nombre}</p>
                                    </div>
                                    <div className="descripcion del error">
                                        <h3>Descripcion: </h3>
                                        <p className="parrafo"> {errr.rer_descripcion}</p>

                                    </div>
                                    <div className="botones">
                                        <h3>Fecha: </h3>
                                        <p className="parrafo"> {errr.rer_fecregistro}</p>
                                        <h3>Hora: </h3>
                                        <p className="parrafo"> {errr.rer_fecregistro}</p>
                                    
                                    </div>
                                </CardContent>
                            </Card>
                            <br /><br /><br />
                        </Grid>

                    ))}
            </div>


        </>
    );
};

export default Inf_Err_Temp;