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

import {dataSensorGet} from "../../service/sensorServices"

const SensorTemp = () => {
  // Select fecha/hora
  const [fecha, setFecha] = useState(dayjs());
  const [averageTemp, setAverageTemp] = useState([]);
  const [hour, setHour] = useState([]);


  const handleChangeFecha = (e) => {
    setFecha(e);
  };
  
  useEffect(() => {
    const getData = async () => {
    try {
      const response = await dataSensorGet();

      console.log(response[0].rda_hora.slice(0,2))

      const tipoSensor = response.filter(item=>item.ixa === 1)

      const data = tipoSensor.filter(item=>parseInt(item.rda_fecha.slice(8)) === fecha.$D 
                                     && parseInt(item.rda_fecha.slice(5,7)) !== fecha.$M
                                     && parseInt(item.rda_hora.slice(0,2)) === fecha.$H)
      setAverageTemp(data.map((item)=>item.rda_valor))
      setHour(data.map((item)=>item.rda_hora))

      console.log(data)
      
    } catch (error) {
        console.log(error);
    }
  };
    getData();
  }, [averageTemp]);

 const series = [ //data on the y-axis
    {
      name: "Temperatura",
      data: averageTemp
    }
  ];
  const options = { //data on the x-axis
  chart: { id: 'bar-chart'},
  xaxis: {
    categories: hour
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
        {fecha.$D!=dayjs().$D
        && fecha.$M === dayjs().$M
        && fecha.$H === dayjs().$H?(
            <Chart
            options={options}
            series={series}
            type="line"
            width="900"
          />
        ):
        <>
          <RealMyCharts sensor={1}/>
          {/* <Chart
            options={options}
            series={series}
            type="line"
            width="900"
          /> */}
        </>
        }
        
      </Grid>
    </Grid>
  );
};

export default SensorTemp;