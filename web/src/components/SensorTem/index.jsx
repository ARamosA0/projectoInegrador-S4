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

//   CHARJS

// import { ChartData, ChartArea } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  } from 'chart.js';

import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Line',
      },
    },
  };

export const SensorTemp = () => {
  // Select fecha/hora
  const [fecha, setFecha] = useState(dayjs());
  const [chartData, setChartData] = useState({
    labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: "Dataset 1",
            data: [],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
  });
  const handleChangeFecha = (e) => {
    setFecha(e);
  };

  useEffect(()=> {
    const fetchData= async()=> {
        const url = 'https://jsonplaceholder.typicode.com/comments'
        const labelSet = []
        const dataSet1 = [];
        const dataSet2 = [];
      await fetch(url).then((data)=> {
          console.log("Api data", data)
          const res = data.json();
          return res
      }).then((res) => {
          console.log("ressss", res)
         for (const val of res) {
             dataSet1.push(val.id);
             dataSet2.push(val.postId)
             // labelSet.push(val.name)
         }
         setChartData({
             labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
             datasets: [
               {
                 label: 'Dataset ID',
                 data:dataSet1,
                 borderColor: 'rgb(255, 99, 132)',
                 backgroundColor: 'rgba(99, 132, 0.5)',
               },
               {
                 label: 'Dataset ID2',
                 data:dataSet2,
                 borderColor: 'rgb(53, 162, 235)',
                 backgroundColor: 'rgba(53, 235, 0.5)',
               },
             ],
           })
         console.log("arrData", dataSet1, dataSet2)
      }).catch(e => {
             console.log("error", e)
         })
     }
     
     fetchData();
 },[])

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
        <Line options={options} data={chartData} />
      </Grid>
    </Grid>
  );
};

