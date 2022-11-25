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

import Chart from "react-apexcharts";
import { faker } from "@faker-js/faker";

import {
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RealMyCharts from "../Char";
import {dataSensorGet} from "../../service/sensorServices"
const SensorElect = () => {
  // Select fecha/hora
  const [fecha, setFecha] = useState(dayjs());
  const [averageVolt, setAverageVolt] = useState([]);
  const [date, setDate] = useState([]);
  const [hour, setHour] = useState([]);

  const handleChangeFecha = (e) => {
    setFecha(e);
  };

  useEffect(() => {
    const getData = async () => {
    try {
      const response = await dataSensorGet();

      // const ixa = response.map((item)=>item.ixa)
      // console.log(ixa)

      const tipoSensor = response.filter(item=>item.ixa === 2)

      const data = tipoSensor.filter(item=>parseInt(item.rda_fecha.slice(8)) === fecha.$D 
                                     && parseInt(item.rda_fecha.slice(5,7)) !== fecha.$M
                                     && parseInt(item.rda_hora.slice(0,2)) === fecha.$H)
      setAverageVolt(data.map((item)=>item.rda_valor))
      setHour(data.map((item)=>item.rda_hora))
      
    } catch (error) {
        console.log(error);
    }
  };
    getData();
  }, [averageVolt]);

  const series = [
    //data on the y-axis
    {
      name: "Voltaje",
      data: averageVolt,
    },
  ];
  const options = {
    //data on the x-axis
    chart: { id: "bar-chart" },
    xaxis: {
      categories: hour,
    },
  };

  return (
    <Grid container>
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
      <Grid item xs={12}>
        {fecha.$D != dayjs().$D
        && fecha.$M === dayjs().$M
        && fecha.$H === dayjs().$H ? (
          <Chart
          options={options}
          series={series}
          type="line"
          width="900"
        />
        ) : (
          <>
            REAL TIME
            <RealMyCharts sensor={2}/>
            {/* <Chart
            options={options}
            series={series}
            type="line"
            width="900"
          /> */}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SensorElect;
