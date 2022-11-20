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
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { faker } from "@faker-js/faker";

import RealMyCharts from "../Char";
import Chart from "react-apexcharts";

const SensorTemp = () => {
  // Select fecha/hora
  const [fecha, setFecha] = useState(dayjs());
  const [averageTemp, setAverageTemp] = useState([]);
  const [date, setDate] = useState([]);


  const handleChangeFecha = (e) => {
    setFecha(e);
  };

  useEffect(() => {
    const getData = async () => {
    const url = 'http://localhost:9000/temperature';
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setAverageTemp(data?.map((item) => item.average_temp));
      setDate(data?.map((item) => item.date));
    } catch (error) {
        console.log(error);
    }
  };
    getData();
  }, []);

 const series = [ //data on the y-axis
    {
      name: "Temperature in Celsius",
      data: averageTemp
    }
  ];
  const options = { //data on the x-axis
  chart: { id: 'bar-chart'},
  xaxis: {
    categories: date
  }

  
    }
  

  const labels = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "012:00"
                  , "13:00", "14:00", "15:00", "16:00", "17:00", "18:00","19:00", "20:00", "21:00", "22:00", "23:00"];
  
  
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
        {fecha.$D!=dayjs().$D?(
            <Chart
            options={options}
            series={series}
            type="line"
            width="700"
          />
        ):
        <>
          REAL TIME
          <RealMyCharts />
        </>
        }
        
      </Grid>
    </Grid>
  );
};

export default SensorTemp;