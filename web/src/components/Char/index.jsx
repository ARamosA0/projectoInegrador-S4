import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { dataSensorGet } from "../../service/sensorServices";

const RealMyCharts = ({sensor}, {sensorData}) => {
  const [averageTemp, setAverageTemp] = useState(sensorData);
  const [hour, setHour] = useState([]);


  console.log(averageTemp)
  useEffect(() => {
    const getData = async () => {
    try {
      // const response = await dataSensorGet();

      // console.log(response[0].rda_hora.slice(0,2))

      // const tipoSensor = response.filter(item=>item.ixa === sensor)

      // const data = tipoSensor.filter(item=>parseInt(item.rda_fecha.slice(8)) === fecha.$D 
      //                                && parseInt(item.rda_fecha.slice(5,7)) == fecha.$M)
      console.log(sensor)
      console.log(sensorData)
      // console.log(sensorHour)
      setAverageTemp(sensorData)
      // setHour(sensorHour)

      // console.log(data)
      
    } catch (error) {
        console.log(error);
    }
  };
    getData();
  });

  const series = [
    //data on the y-axis
    {
      name: "Valor",
      data: averageTemp,
    },
  ];
  const options = {
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
      categories: [1,2,4,5,6],
    }
  };
  return (
    <div>
      <Chart options={options} series={series} type="line" width="900" />
    </div>
  );
};

export default RealMyCharts;
