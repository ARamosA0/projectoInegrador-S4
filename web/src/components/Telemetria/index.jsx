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
  IconButton,
} from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import {
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ThermostatIcon from "@mui/icons-material/Thermostat";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import SensorElect from "../SensorElect";
import {SensorTemp} from "../SensorTem";

// Import CSS
import "./index.css";


const Telemetria = () => {
  // Select sensor
  const [sensor, setSensor] = useState("");
  const [tipo, setTipo] = useState("Tipo");

  const [tempContentVisible, setTempContentVisible] = useState(false);
  const [eleContentVisible, setEleContentVisible] = useState(false);

  const handleChange = (event) => {
    setSensor(event.target.value);
  };



  const handleClick = (string) => {
    setTipo(string);
  };


  const renderResult = () => {
    let result;
    tipo === "Tipo" ? (result = "Tipo") : (result = tipo);
    return result;
  };
  useEffect(() => {
    tipo === "Tipo"
      ? setTempContentVisible(true)
      : setTempContentVisible(false);
    tipo === "Temperatura"
      ? setTempContentVisible(true)
      : setTempContentVisible(false);
    tipo === "Electricidad"
      ? setEleContentVisible(true)
      : setEleContentVisible(false);
  }, [tipo]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid cotainer className="icon-container">
            <Grid item xs={2}>
              <IconButton
                size="large"
                onClick={() => handleClick("Temperatura")}
              >
                <ThermostatIcon sx={{ fontSize: 100, color:'#8D0B0B' }} />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                size="large"
                onClick={() => handleClick("Electricidad")}
              >
                <ElectricBoltIcon sx={{ fontSize: 100, color:'#EAC614' }} />
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
          {tempContentVisible && <SensorTemp />}
          {eleContentVisible && <SensorElect />}
        </Grid>

        
      </Grid>
    </>
  );
};

export default Telemetria;
