import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { dataSensorGet } from "../../service/sensorServices";

const RealMyCharts = () => {
  const [averageTemp, setAverageTemp] = useState([]);
  const [date, setDate] = useState([]);
  const [hour, setHour] = useState([]);

  useEffect(() => {
    const getData = async () => {     
      try {
        const response = await dataSensorGet();
  
        // const ixa = response.map((item)=>item.ixa)
        // console.log(ixa)
  
        const data = response.filter(item=>parseInt(item.rda_fecha.slice(8)) === fecha.$D 
                                       && parseInt(item.rda_fecha.slice(5,7)) !== fecha.$M)
        setAverageTemp(data.map((item)=>item.rda_valor))
        setHour(data.map((item)=>item.rda_hora))
        
      } catch (error) {
          console.log(error);
      }
    };
    getData();
  }, [averageTemp]);

  const series = [
    //data on the y-axis
    {
      name: "Temperature in Celsius",
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
          speed: 1000,
        },
      },
    },
    xaxis: {
      categories: date,
    },
  };
  return (
    <div>
      <Chart options={options} series={series} type="line" width="900" />
    </div>
  );
};

export default RealMyCharts;
