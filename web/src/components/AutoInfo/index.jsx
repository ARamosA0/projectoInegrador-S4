import { useEffect, useState } from "react";
import dayjs from "dayjs";
// material
import { Grid, Button, Checkbox } from "@mui/material";

import { axiPost, axiGet } from "../../service/sensorServices";

// Import CSS
import "./index.css";

const AutoInfo = ({ auto }) => {
  console.log(auto);

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

  const [sensorDataTemp, setSensorDataTemp] = useState();
  const [sensorDataVolt, setSensorDataVolt] = useState();

  const handleClick = async (id) => {
    const axiPostData = await axiPost({
      auto: auto[0].id,
      instrumento: id,
    });
    console.log(axiPostData);
  };

  const getAxiData = async () => {
    const axiGetData = await axiGet();
    console.log(axiGetData);
    const getData = axiGetData.filter((item) => auto[0].id === item.auto);
    getData.forEach((item) => {
      console.log(item);
      if (item.instrumento === 1) {
        setSensorDataTemp(true);
      } else if (item.instrumento === 2) {
        setSensorDataVolt(true);
      }
    });
  };

  useEffect(() => {
    getAxiData();
  }, []);

  return (
    <>
      {auto.length > 0 &&
        auto.map((auto) => (
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className="auto-info-info-uno">
                  <span>Marca:</span>
                </Grid>
                <Grid item xs={6} className="auto-info-info-dos">
                  <span>{auto.aut_marca}</span>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className="auto-info-info-uno">
                  <span>Modelo:</span>
                </Grid>
                <Grid item xs={6} className="auto-info-info-dos">
                  <span>{auto.aut_modelo}</span>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className="auto-info-info-uno">
                  <span>Color:</span>
                </Grid>
                <Grid item xs={6} className="auto-info-info-dos">
                  <span>{auto.aut_color}</span>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className="auto-info-info-uno">
                  <span>Fecha de Compra:</span>
                </Grid>
                <Grid item xs={6} className="auto-info-info-dos">
                  <span>{auto.aut_fecadquisicion}</span>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className="auto-info-info-uno">
                  <span>Año de fabricacion:</span>
                </Grid>
                <Grid item xs={6} className="auto-info-info-dos">
                  <span>{auto.aut_fecregistro}</span>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} className="auto-info-info-uno">
                  <span>Descripcion:</span>
                </Grid>
                <Grid item xs={6} className="auto-info-info-dos">
                  <span>{auto.aut_descripcion}</span>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
              </Grid>
            </Grid>

            {!sensorDataTemp ? (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} className="auto-info-info-uno">
                    <span>Registrar sensor de:</span>
                  </Grid>
                  <Grid item xs={6} className="auto-info-info-dos">
                    <Button
                      sx={{ background: "#EB3B3B" }}
                      variant="contained"
                      onClick={() => handleClick(1)}
                    >
                      Temperatura
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <hr />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} className="auto-info-info-uno">
                    <span>Temperatura </span>
                  </Grid>
                  <Grid item xs={6} className="auto-info-info-dos">
                    <Checkbox
                      defaultChecked
                      sx={{
                        color: "#EB3B3B",
                        "&.Mui-checked": {
                          color: "#EB3B3B",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <hr />
                  </Grid>
                </Grid>
              </Grid>
            )}
            {!sensorDataVolt ? (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} className="auto-info-info-uno">
                    <span>Registrar sensor de:</span>
                  </Grid>
                  <Grid item xs={6} className="auto-info-info-dos">
                    <Button
                      sx={{ background: "#EB3B3B" }}
                      variant="contained"
                      onClick={() => handleClick(2)}
                    >
                      Voltaje
                    </Button>
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} className="auto-info-info-uno">
                    <span>Voltaje </span>
                  </Grid>
                  <Grid item xs={6} className="auto-info-info-dos">
                    <Checkbox
                      defaultChecked
                      sx={{
                        color: "#EB3B3B",
                        "&.Mui-checked": {
                          color: "#EB3B3B",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}
    </>
  );
};

export default AutoInfo;
