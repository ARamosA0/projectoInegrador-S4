import { useEffect, useState } from "react";
import dayjs from 'dayjs';
// material
import {
  Container,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Grid,
  TextField,
  Divider
} from "@mui/material";

import {LocalizationProvider, DesktopDatePicker, TimePicker} from '@mui/x-date-pickers' 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Import CSS
import "./index.css";

const AutoInfo = ({auto}) => {

  // Select sensor
  const [sensor, setSensor] = useState("");
  const handleChange = (event) => {
    setSensor(event.target.value);
  };

  // Select fecha/hora
  const [fecha, setFecha] = useState(dayjs());
  const handleChangeFecha = (e) => {
    setFecha(e);
  };

  return (
    <>
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} className="auto-info-info-uno">
                        <span>Marca:</span>
                    </Grid>
                    <Grid item xs={6} className="auto-info-info-dos">
                        <span>{auto.marca}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} className="auto-info-info-uno">
                        <span>Marca:</span>
                    </Grid>
                    <Grid item xs={6} className="auto-info-info-dos">
                        <span>{auto.modelo}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} className="auto-info-info-uno">
                        <span>Modelo:</span>
                    </Grid>
                    <Grid item xs={6} className="auto-info-info-dos">
                        <span>{auto.kilometraje}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} className="auto-info-info-uno">
                        <span>Fecha de Compra:</span>
                    </Grid>
                    <Grid item xs={6} className="auto-info-info-dos">
                        <span>{auto.fecha_in}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} className="auto-info-info-uno">
                        <span>Año de fabricacion:</span>
                    </Grid>
                    <Grid item xs={6} className="auto-info-info-dos">
                        <span>{auto.ano_fab}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} className="auto-info-info-uno">
                        <span>Estado:</span>
                    </Grid>
                    <Grid item xs={6} className="auto-info-info-dos">
                        <span>{auto.estado}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} className="auto-info-info-uno">
                        <span>Descripcion:</span>
                    </Grid>
                    <Grid item xs={6} className="auto-info-info-dos">
                        <span>{auto.descripcion}</span>
                    </Grid>
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
  );
};

export default AutoInfo;



