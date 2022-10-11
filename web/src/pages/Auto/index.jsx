import { useState, useEffect } from "react";

import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

// Components
import AutoInfo from "../../components/AutoInfo";
import Log from "../../components/Log";
import Telemetria from "../../components/Telemetria";

// CSS
import "./index.css";

const Auto = (props) => {
  // Auto
  const auto= {
    img: "https://derco-pe-prod.s3.amazonaws.com/medias/suzuki/migration/front-image/nuevo-alto/Alto_destacado-3.jpg",
    placa: "112233",
    marca:"marca",
    modelo:"modelo",
    kilometraje:12345,
    fecha_in:"a",
    ano_fab:"a",
    estado:"bueno",
    descripcion:"esta bien"
  };

  const [datosContentVisible, setDatosContentVisible] = useState(false);
  const [teleContentVisible, setTeleContentVisible] = useState(false);
  const [histoContentVisible, setHistoContentVisible] = useState(false);

  // Select Tipo
  const [tipo, setTipo] = useState("Tipo");
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
    // console.log(e.target.value)
  };

  const renderResult = () => {
    let result;
    tipo === "Tipo" ? (result = "Tipo") : (result = tipo);
    return result;
  };

  useEffect(() => {
    tipo === "Datos del Vehiculo"
      ? setDatosContentVisible(true)
      : setDatosContentVisible(false);
    tipo === "Telemetria"
      ? setTeleContentVisible(true)
      : setTeleContentVisible(false);
    tipo === "Historial"
      ? setHistoContentVisible(true)
      : setHistoContentVisible(false);
  }, [tipo]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} className="titulo-container">
              <div className="titulo-img-container">
                <img src={auto.img} alt={auto.placa} />
              </div>
              <p>
                Placa: &nbsp; &nbsp;<span>{auto.placa}</span>
              </p>
            </Grid>
          </Grid>
        </Grid>
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
              <MenuItem value={"Datos del Vehiculo"}>
                Datos del Vehiculo
              </MenuItem>
              <MenuItem value={"Telemetria"}>Telemetria</MenuItem>
              <MenuItem value={"Historial"}>Historial</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <h1>{renderResult()}</h1>
        </Grid>
        <Grid item xs={12}>
          {datosContentVisible && <AutoInfo auto={auto}/>}
          {teleContentVisible && <Telemetria auto={auto}/>}
          {histoContentVisible && <Log auto={auto}/>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auto;
