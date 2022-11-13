import { useEffect, useState } from "react";
import {
    Container,
    Card,
    CardContent,
    Grid,
    TextField
} from "@mui/material";

import { useParams } from 'react-router-dom';

import { Button } from "@mui/material"
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { errmanualpost } from "../../service/erroresServices";
import "./index.css";
const ErrManual = ({auto}) => {
    const [fecha, setFecha] = useState(dayjs());
    const handleChangeFecha = (e) => {
        setFecha(e);
    };

    const { id } = useParams();
    const [valorInputs, setValorInputs] = useState({
        rma_nombre: "",
        rma_descripcion: "",
        rma_fecha: "",
        rma_hora: "",
        auto:auto[0].id,
    });

    const handleInputValue = (event) => {
        const { value, name } = event.target;

        setValorInputs({
            ...valorInputs,
            [name]: value,
        });
    };


    
    
    const handleSubmit = async () => {
        const a = await errmanualpost(valorInputs);
        console.log(a)
        console.log(valorInputs)
        console.log(auto[0].id)

    }

    

    return (
        <Grid item xs={12} >

            <div className="opiera">

                <Container>
                    <form  >

                        <Grid >
                            <Grid item xs={12} md={12}>
                                <h2>Nombre del Error: </h2>
                                <TextField
                                    margin="dense"
                                    name="rma_nombre"
                                    required
                                    color="warning"
                                    label="Nombre del error"
                                    type="text"
                                    fullWidth
                                    onChange={handleInputValue}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <h2>Descripcion:</h2>
                                <TextField
                                    margin="dense"
                                    name="rma_descripcion"
                                    required
                                    color="warning"
                                    label="Descripcion del error"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={6}
                                    onChange={handleInputValue}
                                />
                            </Grid>

                            <Grid container spacing={2}>
                                
                                    <Grid item xs={6} md={6}>
                                        <h2>Fecha del error:</h2>

                                        <TextField
                                    margin="dense"
                                    name="rma_fecha"
                                    required
                                    color="warning"
                                    type="date"
                                    fullWidth
                                    onChange={handleInputValue}
                                />
                                       
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <h2>Hora del error:</h2>
                                        <TextField
                                    margin="dense"
                                    name="rma_hora"
                                    required
                                    color="warning"
                                    type="time"
                                    fullWidth
                                    onChange={handleInputValue}
                                />
                                    </Grid>
                               
                            </Grid>
                        </Grid>
                        <br /> <br />
                        <center>
                            <Button variant="contained" className="navbar-btn-single" onClick={handleSubmit} >Guardar Errores</Button>
                            
                        </center>
                    </form>
                </Container>
            </div>
        </Grid>
    );
};
export default ErrManual;