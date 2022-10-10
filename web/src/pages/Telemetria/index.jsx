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
  TextField
} from "@mui/material";

import {LocalizationProvider, DesktopDatePicker, TimePicker} from '@mui/x-date-pickers' 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Import CSS
import "./index.css";

const Telemetria = () => {
  // Select Tipo
  const [tipo, setTipo] = useState("");
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };

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
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipo}
                label="Tipo"
                onChange={handleChangeTipo}
              >
                <MenuItem value={10}>Datos del Vehiculo</MenuItem>
                <MenuItem value={20}>Telemetria</MenuItem>
                <MenuItem value={20}>Historial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sensor}
                label="Sensor"
                onChange={handleChange}
              >
                <MenuItem value={10}>Temperatura</MenuItem>
                <MenuItem value={20}>Velocidad</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{marginBottom:5, marginTop:5}}>
            <Grid container >
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
                    <Grid item xs={6}>
                    <TimePicker
                      label="Escoge la hora"
                      value={fecha}
                      onChange={handleChangeFecha}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    </Grid>
                </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Telemetria;



