import { useEffect, useState } from "react";
import styled from "styled-components";
import RegAuto from "../../components/nuevoregistroautovalidacion";
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
import {getCar} from "../../service/autoServices"

const Inf_Usuario = () => {
  const { usuarioId } = useParams();
  const [user, setUser] = useState([]);
  const [userCars, setuserCars] = useState([]);

  const url = 'https://res.cloudinary.com/dm8aqmori/'

  const fetchUserInfo = async () =>{
    // const userData = JSON.parse(localStorage.getItem("userID"));
    console.log(usuarioId)
    const data = await userData(usuarioId);
    const usuarioData = data.content
    setUser(usuarioData); 
    console.log(user)
    // console.log(usuarioData)

    const autosData = await getCar(usuarioId);
    setuserCars(autosData);
    console.log(userCars)
    console.log(autosData)

  }

  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRedirectTo = (id) => {

    const carData = userCars.filter( data => data.id === id)
    localStorage.setItem("car", JSON.stringify(carData))
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
              {userCars.length > 0 &&
              userCars.map((cars)=>(
                  <Grid item xs={3} >
                      <Card className="polea"  >
                          <CardContent className="Ojo">
                          <div className="linea">
                          <img src={cars.aut_imagen} width={160}></img>
                          </div>
                              <div >

                                <p className="parrafo"> {cars.aut_placa}</p>
                                <p className="parrafo"> {cars.aut_marca}</p>
                                <p className="parrafo"> {cars.aut_descripcion}</p>
                              </div>
                              <div className="botones">
                                  <Link to={`/auto/${cars.id}`}>
                                    <Button variant="contained" className="navbar-btn-single" onClick={()=>handleRedirectTo(cars.id)}>Ver</Button>
                                  </Link>
                                  <Button variant="contained" className="navbar-btn-single" onClick={handleOpen}>Editar</Button>


                              </div>

                          </CardContent>
                      </Card>

                  </Grid>
              ))}
              <Grid item xs={3}>
                <Button variant="contained" className="navbar-btn-single" onClick={handleOpen}>Agregar Auto</Button>
              </Grid>
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
 font-size: 42px;

             
`;

