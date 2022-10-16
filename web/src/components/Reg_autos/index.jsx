import React from "react";
import styled from "styled-components";
import {Button, TextField, Container, FormControlLabel, RadioGroup,Radio} from "@mui/material"

import "./index.css";

const Reg_auto=()=>{
    return(
        <>
        <Container maxWidth="sm">
        <h2 >INGRESA LOS DATOS DE TU VEHICULO</h2>
        
                    <div className='poll' ></div>
                    <br/>
        <h3 >SUBE UNA FOTO</h3>
        <div className='image'></div>
        <br/>
        <TextField id="outlined-basic" label="Marca del Vehiculo" variant="outlined" fullWidth />
        <br/><br/>
        <TextField id="outlined-basic" label="Modelo del vehiculo" variant="outlined"  fullWidth />
        <br/><br/>
        <TextField id="outlined-basic" label="Numero de Placa" variant="outlined"  fullWidth/>
        <br/><br/>
        <TextField id="outlined-basic" label="Kilometraje" variant="outlined" type="number"  fullWidth/>
        <br/><br/>
        <h2>Fecha de adquisicion</h2>
        <TextField id="outlined-basic"  variant="outlined" type="date" fullWidth/>

        <br/><br/>
      <h2>Año de Fabricacion</h2>
      <TextField id="outlined-basic"  label="Año" variant="outlined" type="number" fullWidth />
      <br/><br/>
      <h2>Estado Actual del Vehiculo</h2>
      
      <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    
    name="radio-buttons-group"
  >
    <FormControlLabel value="bueno" control={<Radio />} label="Bueno" />
    <FormControlLabel value="malo" control={<Radio />} label="Malo" />
    <FormControlLabel value="otro" control={<Radio />} label="..." />
  </RadioGroup>
  <br/><br/>
  <center>
      <Button  variant="contained" className="navbar-btn-single" >ENVIAR FORMULARIO DE REGISTRO DE VEHICULO</Button>
      </center>
      <br/><br/>
      
        
       <br/>
       <br/>
       <br/>

       </Container>

        
    
        </>);
}
export default Reg_auto;



