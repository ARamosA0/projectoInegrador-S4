import { useEffect, useState } from "react";
import dayjs from "dayjs";
// material
import {
  Container,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";

import {
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Import CSS
import "./index.css";

import { geterrmanual } from "../../service/autoServices";
const Log = () => {






  const [userErroresm, setuserErroresm] = useState([]);
  const ErroresManuales = async (id) => {
    const a = 1234
    console.log(a)
    
    
    const data = await geterrmanual(8);
    console.log(data)
    setuserErroresm(data);
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
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Sensor</InputLabel>
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

        <button onClick={ErroresManuales}>prueba</button>

        <div>

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
          ))}</div>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};

export default Log;
