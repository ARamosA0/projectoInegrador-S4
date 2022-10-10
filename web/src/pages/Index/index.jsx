import { useEffect,useState } from "react";
import {Link} from "react-router-dom"

// Material
import {Container, Button, Grid} from "@mui/material"

// Icons
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

// Componentes
import IndexTipos from "../../components/IndexTipos";

// Import CSS
import "./index.css"

const Index = () =>{
    console.log('hola')
    return(
        <>
            <Container maxWidth="md" className="index-container">
                <div className="index-titulo">
                    <h1>Taller</h1>
                </div>
                <div className="index-titulo-descripcion">
                    <div className="index-titulo-uno">
                        <p>/ Un taller para todas las persona</p>
                    </div>
                    <div className="index-titulo-dos">
                        <p>Control del estado de tu</p>
                        <p>Vehiculo en Tiempo Real</p>
                    </div>
                    <div className="index-titulo-btn">
                        <Link to={"/ubicacion"}>
                            <Button variant="outlined" className="index-titulo-btn-btn">Encuentranos</Button>
                        </Link>
                    </div>
                </div>
                <div className="index-titulo-redes">
                    <span>Nuestras Redes: </span> &nbsp; &nbsp; &nbsp;
                    <TwitterIcon/> &nbsp; &nbsp;
                    <FacebookIcon/> &nbsp; &nbsp;
                </div>
            </Container>
            <div className="container-exp">
                <Container maxWidth="md" className="exp-container">
                    <Grid container>
                        <Grid item xs={6} className="exp-container-titulo">
                            <div className="exp-container-titulo-uno">
                                <p>/Como funciona la aplicacion?</p>
                            </div>
                            <div className="exp-container-titulo-dos">
                                <p>Maneja los sensores desde tu celular</p>
                            </div>
                            <Grid container>
                                <Grid item xs={12} className="exp-item">
                                    <LooksOneIcon fontSize="large" style={{color:"#eb3b3b"}}/> &nbsp; &nbsp; &nbsp; &nbsp;
                                    <p>Instala el sensor en el vehiculo</p>
                                </Grid>
                                <Grid item xs={12} className="exp-item">
                                     <LooksTwoIcon fontSize="large" style={{color:"#eb3b3b"}}/> &nbsp; &nbsp; &nbsp; &nbsp;
                                    <p>Sincroniza el sensor con la app</p>
                                </Grid>
                                <Grid item xs={12} className="exp-item">
                                    <Looks3Icon fontSize="large" style={{color:"#eb3b3b"}}/> &nbsp; &nbsp; &nbsp; &nbsp;
                                    <p>Resive Notificaciones</p>
                                </Grid>
                                <Grid item xs={12}  className="index-titulo-btn-dos">
                                    {/* <Link to={"/ubicacion"}> */}
                                        <Button variant="outlined" className="index-titulo-btn-btn-dos">Unete</Button>
                                    {/* </Link> */}
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} className="exp-container-img">
                            <img src="https://img.freepik.com/fotos-premium/retrato-vertical-mecanico-afroamericano-parado-junto-auto-taller-reparacion-automoviles-usando-laptop-mientras-inspecciona-vehiculo_274679-32829.jpg?w=2000" alt="" />
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container maxWidth="md">
                <IndexTipos/>
            </Container>
            <div className="background-telemetria">
                <Container maxWidth="md">
                    <Grid container className="telemtria-container">
                        <Grid item xs={12} className="telemtria-container-titulo">
                            <div className="telemetria-container-titulo-uno">
                                <p>/Telemetria</p>
                            </div>
                            <div className="telemetria-container-titulo-dos">
                                <p>Revisa el estado de tu vehiculo</p>
                            </div>

                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default Index;
