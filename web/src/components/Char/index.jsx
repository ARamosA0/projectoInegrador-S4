import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { sensorDataPost } from "../../service/sensorServices";

const RealMyCharts = () => {
  const [averageTemp, setAverageTemp] = useState([]);
  const [date, setDate] = useState([]);
  const [dataPost, setDataPost] = useState({
    data:"",
    average_temp:"",
    time:""
  });

  useEffect(() => {
    const getData = async () => {
      const url = "http://localhost:9000/temperature";
      

      try {
        setInterval(async() => {
            const postData = await sensorDataPost({date: "03/10/2022",
            average_temp: 50, time:"10:00"})
            console.log(postData)
            
          }, 20000);
        ;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setAverageTemp(data?.map((item) => item.average_temp));
        setDate(data?.map((item) => item.date));
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
      <Chart options={options} series={series} type="line" width="700" />
    </div>
  );
};

export default RealMyCharts;
