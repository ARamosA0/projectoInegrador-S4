import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { dataSensorGet } from "../../service/sensorServices";

const RealMyCharts = ({sensor}) => {
  const [averageTemp, setAverageTemp] = useState([]);
  const [hour, setHour] = useState([]);

  useEffect(() => {
    const getData = async () => {
    try {
      const response = await dataSensorGet();

      // console.log(response[0].rda_hora.slice(0,2))

      const tipoSensor = response.filter(item=>item.ixa === sensor)

      // const data = tipoSensor.filter(item=>parseInt(item.rda_fecha.slice(8)) === fecha.$D 
      //                                && parseInt(item.rda_fecha.slice(5,7)) !== fecha.$M)
      setAverageTemp(tipoSensor.map((item)=>item.rda_valor))
      setHour(tipoSensor.map((item)=>item.rda_hora))

      // console.log(data)
      
    } catch (error) {
        console.log(error);
    }
  };
    getData();
  }, [averageTemp]);

  const series = [
    //data on the y-axis
    {
      name: "Valor",
      data: averageTemp,
    },
  ];
  const options = {
    //data on the x-axis
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
    },
  };
  return (
    <div>
      <Chart options={options} series={series} type="line" width="900" />
    </div>
  );
};

export default RealMyCharts;
