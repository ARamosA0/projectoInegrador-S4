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


//ICONOS
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import GppBadIcon from '@mui/icons-material/GppBad';



import SensorElect from "../SensorElect";
import SensorTemp from "../SensorTem";
import Inf_errores from "../histoerrores";

// Import CSS
import "./index.css";


const Log = ({auto}) => {
  // Select sensor
  const [sensor, setSensor] = useState("");
  const [tipo, setTipo] = useState("Tipo");

  const [tempContentVisible, setTempContentVisible] = useState(false);
  const [eleContentVisible, setEleContentVisible] = useState(false);
  const [manuContentVisible, setManuContentVisible] = useState(false);

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
    tipo === "Manual"
      ? setManuContentVisible(true)
      : setManuContentVisible(false);
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
                <ThermostatAutoIcon  sx={{ fontSize: 100, color: '#8D0B0B' }} />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                size="large"
                onClick={() => handleClick("Electricidad")}
              >
                <ElectricMeterIcon  sx={{ fontSize: 100, color: '#EAC614' }} />
              </IconButton>
            </Grid>

            <Grid item xs={2}>
              <IconButton
                size="large"
                onClick={() => handleClick("Manual")}
              >
                <GppBadIcon  sx={{ fontSize: 100, color: 'black' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          {renderResult() === 'Tipo' ? (
            <></>
          ) : (
            <h1 className="titulo">{renderResult()}</h1>
          )}

        </Grid>
        <Grid item xs={12}>
          {tempContentVisible && <SensorTemp />}
          {eleContentVisible && <SensorElect />}
          {manuContentVisible && <Inf_errores auto={auto}/>}
        </Grid>


      </Grid>
    </>
  );
};

export default Log;
