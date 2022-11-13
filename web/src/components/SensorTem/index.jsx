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


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
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
  
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
  export const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  

  

const SensorTemp = () =>{
    // Select fecha/hora
    const [fecha, setFecha] = useState(dayjs());
    const handleChangeFecha = (e) => {
      setFecha(e);
    };
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
            <Line options={options} data={data} />
          </Grid>
      </Grid>
  )
}

export default SensorTemp