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
import { dataSensorGet } from "../../service/sensorServices";
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

        const tipoSensor = response.filter((item) => item.ixa === 2);

        console.log(fecha.$D, fecha.$M + 1);
        console.log(tipoSensor[0].rda_fecha, tipoSensor[0].rda_hora);
        const data = tipoSensor.filter(
          (item) =>
            parseInt(item.rda_fecha.slice(8)) === fecha.$D &&
            parseInt(item.rda_fecha.slice(5, 7)) === fecha.$M + 1
        );
        setAverageVolt(data.map((item) => item.rda_valor));
        setHour(data.map((item) => item.rda_hora));
        console.log(hour);
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

  const optionsReal = {
    chart: {
      id: "realtime",
      animation: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 2000,
        },
      },
    },
    xaxis: {
      categories: hour,
    }
  };

  console.log(averageVolt);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ marginBottom: 5, marginTop: 5 }}>
        <Grid container sx={{ paddingLeft: "10rem" }}>
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
            {/* <Grid item xs={6}>
              <TimePicker
                label="Escoge la hora"
                value={fecha}
                onChange={handleChangeFecha}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid> */}
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "5rem" }}>
        {fecha.$D != dayjs().$D && fecha.$M != dayjs().$M + 1 ? (
          <Chart options={options} series={series} type="line" width="900" />
        ) : (
          <>
            <Chart options={optionsReal} series={series} type="line" width="900" />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SensorElect;
