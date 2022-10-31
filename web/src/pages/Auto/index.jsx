import { useState, useEffect } from "react";

import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton
} from "@mui/material";

// Components
import AutoInfo from "../../components/AutoInfo";
import Log from "../../components/Log";
import Telemetria from "../../components/Telemetria";

// CSS
import "./index.css";

// Icons
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const Auto = (props) => {
  
  const [auto, setAuto] = useState([])

  const [datosContentVisible, setDatosContentVisible] = useState(false);
  const [teleContentVisible, setTeleContentVisible] = useState(false);
  const [histoContentVisible, setHistoContentVisible] = useState(false);

  const setAutoData = () =>{
    const autoData = JSON.parse(localStorage.getItem("car"));
    setAuto(autoData)
    // console.log(auto)
    // console.log(autoData)
  }

  // Select Tipo
  const [tipo, setTipo] = useState("Tipo");


  const handleClick = (string) => {
    setTipo(string)
  }


  const renderResult = () => {
    let result;
    tipo === "Tipo" ? (result = "Tipo") : (result = tipo);
    return result;
  };

  useEffect(() => {
    setAutoData();
    tipo === "Tipo"
      ? setDatosContentVisible(true)
      : setDatosContentVisible(false);
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
          {auto.length > 0 && 
          auto.map((aut)=>(
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} className="titulo-container">
                <div className="titulo-img-container">
                  <img src={aut.aut_imagen} alt={aut.aut_placa} />
                </div>
                <p>
                  Placa: &nbsp; &nbsp;<span>{aut.aut_placa}</span>
                </p>
              </Grid>
            </Grid>
          </Grid>
          ))}
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <Grid container className="icon-container">
            <Grid item xs={4} >
              <IconButton size="large" onClick={()=>handleClick("Datos del Vehiculo")}>
                <DirectionsCarIcon sx={{fontSize:100}}/>
              </IconButton>
              <IconButton size="large" onClick={()=>handleClick("Telemetria")}>
                <SsidChartIcon sx={{fontSize:100}}/>
              </IconButton>
              <IconButton size="large" onClick={()=>handleClick("Historial")}>
                <ManageSearchIcon sx={{fontSize:100}}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{textAlign:"center"}}>
        {renderResult() === 'Tipo' ? (
            <></> 
          ) : (
            <h1 className="titulo">{renderResult()}</h1>
          )}
          
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
