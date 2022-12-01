import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { TextField, Card, CardContent, Grid } from "@mui/material";
import "./index.css";

import { geterrsensor } from "../../service/autoServices";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";

import {
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Inf_Err_Volt = () => {
  //state para el get de errores
  const [userErroresm, setuserErroresm] = useState([]);

  //Constante para obtener la data de errores
  const ErroresVoltaje = async () => {
    const data = await geterrsensor(2);
    console.log(data);
    setuserErroresm(data);
  };
  useEffect(() => {
    ErroresVoltaje();
  }, []);

  // Select fecha/hora
  const [fecha, setFecha] = useState(dayjs());
  const handleChangeFecha = async (e) => {
    setFecha(e);
    console.log(fecha);
    console.log(e);
    try {
      const response = await geterrsensor(2);
      console.log("para la fecha");
      console.log(response[0].rer_fecregistro);
      const data = response.filter(
        (item) =>
          parseInt(item.rer_fecregistro.slice(8)) === e.$D &&
          parseInt(item.rer_fecregistro.slice(5, 7)) === e.$M+1
      );
      console.log(parseInt(response[0].rer_fecregistro.slice(8)));
      setuserErroresm(data.map((item) => item));
      console.log(data);
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

      {userErroresm.length > 0 ? (
        <Grid container  className="paraerrores">
          {userErroresm.length > 0 &&
            userErroresm.map((errr) => (
              <Grid item xs={7}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item lg={4} sm={12} className="linea">
                        <Grid container>
                          <Grid item xs={12}>
                            <h3>Motivo: </h3>
                          </Grid>
                          <Grid item xs={12}>
                            <p className="parrafo">{errr.rer_nombre}</p>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        sm={12}
                        className="descripcion del error"
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <h3>Descripcion: </h3>
                          </Grid>
                          <Grid item xs={12}>
                            <p className="parrafo"> {errr.rer_descripcion}</p>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={4} sm={12} className="botones">
                        <Grid container>
                          <Grid item xs={12}>
                            <h3>Fecha: </h3>
                          </Grid>
                          <Grid item xs={12}>
                            <p className="parrafo"> {errr.rer_fecregistro}</p>
                          </Grid>
                          <Grid item xs={12}>
                            <h3>Hora: </h3>
                          </Grid>
                          <Grid item xs={12}>
                            <p className="parrafo"> {errr.rer_horaregistro}</p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <br />
                <br />
                <br />
              </Grid>
            ))}
        </Grid>
      ) : (
        <div className="ContenedorErrr">
          <div className="icono">
            <YoutubeSearchedForIcon sx={{ fontSize: 100, color: "#FF5733" }} />
          </div>
          <Grid item xs={4}>
            <Card className="noerrorescontent">
              <CardContent className="noerrores">
                <div>
                  <p>No hay ningun error en esta fecha</p>
                </div>
              </CardContent>
            </Card>
            <br />
            <br />
            <br />
          </Grid>
        </div>
      )}
    </>
  );
};

export default Inf_Err_Volt;
