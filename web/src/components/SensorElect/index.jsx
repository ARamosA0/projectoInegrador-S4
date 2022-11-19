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


const SensorElect = () =>{
    // Select fecha/hora
    const [fecha, setFecha] = useState(dayjs());
    const handleChangeFecha = (e) => {
      setFecha(e);
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
        },
      };
      
      const labels = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "012:00"
                      , "13:00", "14:00", "15:00", "16:00", "17:00", "18:00","19:00", "20:00", "21:00", "22:00", "23:00"];
      
      const data = {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 150 })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      useEffect(()=>{
        
      })

  return(
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
            {fecha.$D!=dayjs().$D && 
              fecha.$M != dayjs().$M?(
              <>{fecha.$L}</>
            ):
            <Line options={options} data={data} />}
          </Grid>
      </Grid>
  )
}

export default SensorElect