import React from "react";
import { useState, useEffect } from "react";
// import { createUserAxios } from "../../service/userService";
import { Grid, TextField, Button, styled } from "@mui/material";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  Container,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { marcas, registerCar, editCar } from "../../service/autoServices";

const RegAuto = ({ id, opcion }) => {
//   console.log(id);
//   console.log(opcion);
  // console.log("carId",carId)

  const [count, setcount] = useState([]);
  const [auto, setAuto] = useState([]);

  const [valorInputs, setValorInputs] = useState({
    aut_marca: "",
    aut_modelo: "",
    aut_placa: "",
    aut_imagen: "",
    aut_descripcion: "",
    aut_fecadquisicion: "",
    aut_color: "",
  });

  const [carImage, setCarImage] = useState();

  const handleInputValue = (event) => {
    const { value, name } = event.target;

    setValorInputs({
      ...valorInputs,
      [name]: value,
    });
  };

  const handleInputImage = (event) => {
    setCarImage(event.target.files[0]);
  };



  //API
  const fetchApi = async () => {
    const marcasdata = await marcas();
    setcount(marcasdata);
  };



  const handleSubmitPost = async () => {
    const image = new FormData();
    image.append("aut_marca", valorInputs.aut_marca);
    image.append("aut_modelo", valorInputs.aut_modelo);
    image.append("aut_placa", valorInputs.aut_placa);
    image.append("aut_imagen", carImage);
    image.append("aut_descripcion", valorInputs.aut_descripcion);
    image.append("aut_fecadquisicion", valorInputs.aut_fecadquisicion);
    image.append("aut_color", valorInputs.aut_color);
    image.append("aut_usuario", id);
    console.log(image);
    console.log(carImage)
    console.log(valorInputs);
    const register = await registerCar(image);
    console.log(register);
  };

  const handleSubmitChange = async () =>{
    const autoData = JSON.parse(localStorage.getItem("car"));
    console.log(autoData[0].id)
    setAuto(autoData);
    console.log(auto)
    const image = new FormData();
    image.append("aut_marca", valorInputs.aut_marca);
    image.append("aut_modelo", valorInputs.aut_modelo);
    image.append("aut_placa", valorInputs.aut_placa);
    image.append("aut_imagen", carImage);
    image.append("aut_descripcion", valorInputs.aut_descripcion);
    image.append("aut_fecadquisicion", valorInputs.aut_fecadquisicion);
    image.append("aut_color", valorInputs.aut_color);
    image.append("aut_usuario", id);
    console.log(image);
    const change = await editCar(autoData[0].id, image);
    console.log(change)
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#EB3B3B",
    height: "42px",
    margin: "20px 0",
    transition: "1s",
    "&:hover": {
      backgroundColor: "#cf3434",
    },
    borderRadius: "12px",
  }));
  //API
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Container>
      <form >
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <h2>Marca del vehiculo </h2>
            <Select
              required
              name="aut_marca"
              color="warning"
              fullWidth
              onChange={handleInputValue}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              {count.length > 0 &&
                count.map((count) => (
                  <MenuItem value={count.id}>{count.mar_nombre}</MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={6} md={6}>
            <h2>Modelo del vehiculo</h2>
            <TextField
              margin="dense"
              name="aut_modelo"
              required
              color="warning"
              label="Modelo del vehiculo"
              type="text"
              fullWidth
              onChange={handleInputValue}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <h2>Placa del vehiculo</h2>
            <TextField
              margin="dense"
              name="aut_placa"
              required
              color="warning"
              label="Placa del vehiculo"
              type="text"
              fullWidth
              onChange={handleInputValue}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <h2>Imagen del vehiculo</h2>
            <TextField
              margin="dense"
              name="aut_imagen"
              required
              color="warning"
              type="file"
              fullWidth
              onChange={handleInputImage}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <h2>Fecha de adquisicion del vehiculo</h2>
            <TextField
              margin="dense"
              name="aut_fecadquisicion"
              required
              color="warning"
              label=""
              type="date"
              onChange={handleInputValue}
              fullWidth
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <h2>Color del vehiculo</h2>
            <TextField
              margin="dense"
              name="aut_color"
              required
              color="warning"
              label="Color del vehiculo"
              type="text"
              onChange={handleInputValue}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <h2>Descripcion del vehiculo</h2>
            <TextField
              margin="dense"
              name="aut_descripcion"
              required
              color="warning"
              label="Descripcion del vehiculo"
              type="text"
              onChange={handleInputValue}
              fullWidth
            />
          </Grid>
        </Grid>
        { opcion === 'editar'?(
        <ColorButton
          variant="contained"
          fullWidth
          endIcon={<AppRegistrationIcon />}
          onClick={handleSubmitChange}
        >
          EDITAR VEHICULO
        </ColorButton>

        ):(
            <ColorButton
              variant="contained"
              fullWidth
              endIcon={<AppRegistrationIcon />}
              onClick={handleSubmitPost}
            >
              AGREGAR VEHICULO
            </ColorButton>)}
      </form>
    </Container>
  );
};
export default RegAuto;
