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

import { Link, useParams } from "react-router-dom";

import {Button} from "@mui/material"
import "./index.css";
import { color } from "@mui/system";


import { userData } from "../../service/userServices";

const Inf_Usuario = () => {
const { usuarioId } = useParams();
const [user, setUser] = useState([]);
const [count, setcount] = useState([
    {Placa:'Placa: XUS79',
    Marca:'Marca: Hyundai', Descripcion:'Carro en buen estado de los años 90'},
    {Placa:'Placa: XUS79',
    Marca:'Marca: Hyundai', Descripcion:'Carro en buen estado de los años 90'},
]);

const fetchUserInfo = async () =>{
  // const userData = JSON.parse(localStorage.getItem("userID"));
  console.log(usuarioId)
  const data = await userData(usuarioId);
  const usuarioData = data.content
  setUser(usuarioData); 
  console.log(user)
  // console.log(usuarioData)
}

useEffect (()=>{
  fetchUserInfo();
},[])

  return (
    <>
    <Container maxWidth="md">
                
    
    <div className="tipos-container">
    {Object.keys(user).length > 0 ? (

      <div className="tipos-titulo-container">
        <div className="tipos-titulo-uno">
        <div className ="iitem1">
        <img src={user.imagen} className="item1"></img>
          </div>
        </div>
        <div className="tipos-titulo-dos">
          <span>{user.name}</span>
        </div>
      </div>
    ):<></>}

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
                                <Button variant="contained" className="navbar-btn-single" onClick={handleOpen}>Editar</Button>
                                

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
><center>
  <DialogTitle><H11>Edita la Información de tu Auto</H11></DialogTitle>
  </center>
<DialogContent

>

  <RegAuto/>
  <center>
  <Button variant="contained" className="navbar-btn-single" onClick={handleClose}>Cancelar</Button>
  </center>
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


const H11 = styled.h1`
 color: #FFA34F;
 font-family: Comic Sans MS;
 font-size: 42px;

             
`;


