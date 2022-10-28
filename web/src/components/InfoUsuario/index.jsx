import { useEffect, useState } from "react";
import styled from "styled-components";
import RegAuto from "../nuevoregistroautovalidacion";
import {
  Container,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
  
} from "@mui/material";

import {Button} from "@mui/material"
import "./index.css";


const Inf_Usuario = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [count, setcount] = useState([
        {Placa:'Placa: XUS79',
        Marca:'Marca: Hyundai', Descripcion:'Carro en buen estado de los años 90'},
        {Placa:'Placa: XUS79',
        Marca:'Marca: Hyundai', Descripcion:'Carro en buen estado de los años 90'},
        {Placa:'Placa: XUS79',
        Marca:'Marca: Hyundai', Descripcion:'Carro en buen estado de los años 90'},
        {Placa:'Placa: XUS79',
        Marca:'Marca: Hyundai', Descripcion:'Carro en buen estado de los años 90'},
    ]);

    
  return (
    <>
    <Container maxWidth="md">
                
         
    <div className="tipos-container">
      <div className="tipos-titulo-container">
        <div className="tipos-titulo-uno">
        <div className ="iitem1">
        <img src="https://i.pinimg.com/originals/aa/82/fc/aa82fcaa820018b9f48d876f624d9fc1.jpg" className="item1"></img>
          </div>
        </div>
        <div className="tipos-titulo-dos">
          <span>Nombre de Usuario</span>
          
        </div>
      </div>
      <div className="tipos-elementos-container">
        <Grid container spacing={3} direction="column"  alignContent={'center'}>
            {count.length > 0 &&
            count.map((count)=>(
                <Grid item xs={3} >
                    <Card className="polea"  >
                        <CardContent className="Ojo">
                        <div className="linea">
                        <img src="https://www.carrosyclasicos.com/imagenes/cronicas/nissan_240_julian/nissan_2.jpg" width={160}></img>
                        </div>
                            <div >
                              
                              <p className="parrafo"> {count.Placa}</p>
                              <p className="parrafo"> {count.Marca}</p>
                              <p className="parrafo"> {count.Descripcion}</p>
                            </div>
                            <div className="botones">
                                <Button variant="contained" className="navbar-btn-single">Ver</Button>
                                <Button variant="contained" className="navbar-btn-single">Editar</Button>
                                <Button onClick={handleOpen}>Open modal</Button>

                            </div>
                
                        </CardContent>
                    </Card>
                    
                </Grid>
            ))}
        </Grid>
      </div>
    </div>
<Dialog
  open={open}
  onClose={handleClose}
  className="Formulario"
  maxWidth={'lg'}
>
<DialogContent

>
  <RegAuto/>
  <Button onClick={handleClose}>Open modal</Button>
  </DialogContent>
  
</Dialog>


    </Container>
    </>
  );
  
};

export default Inf_Usuario;

 
const ContenedorModal = styled.div`
  

    width: 700px;
    min-heigth: 100px !important;

    position: relative;
    margin: auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 11, 0.2) 0px 7px 29px 0px;
    top: 0;
    padding: 40px;
    overflow: scroll;

             
`;


