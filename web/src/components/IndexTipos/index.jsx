import { useEffect, useState } from "react";

// Material
import {
  Container,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CardHeader,
  Grid
} from "@mui/material";

// Icons
import SpeedIcon from '@mui/icons-material/Speed';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

// CSS
import "./index.css";

const IndexTipos = () => {

    const [count, setcount] = useState([
        {titulo:'Sensor de velocidad',
        imagen: <SpeedIcon fontSize="large" style={{color:"#eb3b3b3"}}/>,
        descripcion:'Sensor de velocidad que se instala en tu vehiculo'},
        {titulo:'Sensor de calo',
        imagen: <HeatPumpIcon fontSize="large"/>,
        descripcion:'Sensor de velocidad que se instala en tu vehiculo'},
        {titulo:'Telemetria',
        imagen: <AutoGraphIcon fontSize="large"/>,
        descripcion:'Sensor de velocidad que se instala en tu vehiculo'},
        {titulo:'Reparacion',
        imagen: <CarRepairIcon fontSize="large"/>,
        descripcion:'Sensor de velocidad que se instala en tu vehiculo'},
        {titulo:'Lavado de Vehiculo',
        imagen: <LocalCarWashIcon fontSize="large"/>,
        descripcion:'Sensor de velocidad que se instala en tu vehiculo'}
    ]);

    

  return (
    <div className="tipos-container">
      <div className="tipos-titulo-container">
        <div className="tipos-titulo-uno">
          <p>/Que Ofrecemos?</p>
        </div>
        <div className="tipos-titulo-dos">
          <span>Revisa los tipos de Sensores</span>
          <br />
          <span>y Servicios del taller</span>
        </div>
      </div>
      <div className="tipos-elementos-container">
        <Grid container spacing={2}>
            {count.length > 0 &&
            count.map((count, index)=>(
                <Grid key={index} item xs={4}>
                    <Card sx={{maxWidth: 200, maxHeight:300}}>
                        <CardContent className="tipos-card-content">
                            {count.imagen}
                            <h4>{count.titulo}</h4>
                            <p>{count.descripcion}</p>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default IndexTipos;
