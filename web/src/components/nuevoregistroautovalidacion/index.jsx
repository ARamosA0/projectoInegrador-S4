import React from "react";
import { useState, useEffect } from "react";

// import { createUserAxios } from "../../service/userService";
import { Grid, TextField, Button, styled } from "@mui/material";
import { Formik, ErrorMessage, Field, Form } from "formik";
import swal from "sweetalert2";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Container, FormControlLabel, RadioGroup, Radio, Select, MenuItem, InputLabel } from "@mui/material"

import { marcas, registerCar } from "../../service/autoServices";

const RegAuto = () => {

    const [count, setcount] = useState([]);
    const [auto,setAuto] = useState([])

    const fetchApi = async () => {
        const marcasdata = await marcas()
        setcount(marcasdata)        
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

    useEffect(() => {
        fetchApi()
    }, []);

    return (
        <Container>
            <Formik
                initialValues={{
                    //valores inciales del formulario

                    //nombre:"",
                    aut_marca: "",

                    //email: "",
                    aut_modelo: "",

                    //password: "",
                    aut_placa: "",

                    aut_fecadquisicion: "",

                    aut_color: "",

                    aut_imagen: "",

                    aut_descripcion: ""

                    //estado: ""

                }}
                //para validar los datos
                validate={(valores) => {
                    let errores = {};
                    //validacion nombre
                    if (!valores.aut_marca) {
                        errores.aut_marca = "Ingrese la marca de su vehiculo";
                    }
                    if (!valores.aut_modelo) {
                        errores.aut_modelo = "Ingrese el modelo de su vehiculo";

                    }
                    if (!valores.aut_placa) {
                        errores.aut_placa = "Ingrese su numero de placa";
                    }
                    if (!valores.aut_descripcion) {
                        errores.aut_descripcion = "Ingrese la descripcion de su vehiculo";
                    }
                    if (!valores.aut_fecadquisicion) {
                        errores.aut_fecadquisicion = "Ingrese la fecha de adquisicion de su vehiculo";
                    }
                    if (!valores.aut_color) {
                        errores.aut_color = "Ingrese el color de su vehiculo";
                    }
                    if (!valores.aut_imagen) {
                        errores.aut_imagen = "Cargue una imagen de su vehiculo";
                    }
                    return errores;
                }}
                //para enviar el formulario
                onSubmit={async (valores, { resetForm }) => {
                    //valores son los valores de los inputs donde se muestra en un objeto
                    resetForm();
                    const registroAuto = await registerCar(valores)
                    // setAuto(registroAuto)
                    console.log(registroAuto)
                    console.log(valores)
                    // try {
                    //     await createUserAxios(valores)
                    //     swal({
                    //         icon: "success",
                    //         title: "Cuenta creada",
                    //         text: "Inicie sesion para continuar",
                    //     });
                    // } catch (error) {
                    //     swal({
                    //         icon: "error",
                    //         title: `${error.message}`,
                    //         text: "Intenta de nuevo dentro de unos minutos",
                    //     });
                    // }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    setFieldValue
                }) => (

                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={6}>
                                <h2 >Marca del vehiculo </h2>
                                <Select
                                    error={touched.aut_marca && errors.aut_marca && true}
                                    required
                                    name="aut_marca"
                                    color="warning"
                                    fullWidth
                                    value={values.marca}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >

                                    {count.length > 0 &&
                                        count.map((count) => (
                                            <MenuItem value={count.id} >{count.mar_nombre}</MenuItem>
                                        ))}

                                </Select>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <h2>Modelo del vehiculo</h2>
                                <TextField
                                    error={touched.aut_modelo && errors.aut_modelo && true}
                                    margin="dense"
                                    name="aut_modelo"
                                    required
                                    color="warning"
                                    label="Modelo del vehiculo"
                                    type="text"
                                    fullWidth
                                    value={values.aut_modelo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="aut_modelo"
                                    component={() => (
                                        <div className="input-error">{errors.aut_modelo}</div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <h2>Placa del vehiculo</h2>
                                <TextField
                                    error={touched.aut_placa && errors.aut_placa && true}
                                    margin="dense"
                                    name="aut_placa"
                                    required
                                    color="warning"
                                    label="Placa del vehiculo"
                                    type="text"
                                    fullWidth
                                    value={values.aut_placa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="aut_placa"
                                    component={() => (
                                        <div className="input-error">{errors.aut_placa}</div>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <h2>Imgen del vehiculo</h2>
                                <Field
                                    error={touched.aut_imagen && errors.aut_imagen && true}
                                    margin="dense"
                                    name="aut_imagen"
                                    required
                                    color="warning"
                                    type="file"
                                    value={values.aut_imagen}
                                    onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                      }}
                                    onBlur={handleBlur}
                                    fullWidth
                                />
                                <ErrorMessage
                                    name="aut_imagen"
                                    component={() => (
                                        <div className="input-error">{errors.aut_imagen}</div>
                                    )}
                                />


                            </Grid>

                            <Grid item xs={6} md={6}>
                                <h2>Fecha de adquisicion del vehiculo</h2>
                                <TextField
                                    error={touched.aut_fecadquisicion && errors.aut_fecadquisicion && true}
                                    margin="dense"
                                    name="aut_fecadquisicion"
                                    required
                                    color="warning"
                                    label=""
                                    type="date"
                                    value={values.aut_fecadquisicion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    fullWidth
                                />
                                <ErrorMessage
                                    name="aut_fecadquisicion"
                                    component={() => (
                                        <div className="input-error">{errors.aut_fecadquisicion}</div>
                                    )}
                                />
                            </Grid>


                            <Grid item xs={6} md={6}>
                                <h2>Color del vehiculo</h2>
                                <TextField
                                    error={touched.aut_color && errors.aut_color && true}
                                    margin="dense"
                                    name="aut_color"
                                    required
                                    color="warning"
                                    label="Color del vehiculo"
                                    type="text"
                                    value={values.aut_color}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                />
                                <ErrorMessage
                                    name="aut_color"
                                    component={() => (
                                        <div className="input-error">{errors.aut_color}</div>
                                    )}
                                />
                            </Grid>
                            {/*
                            <Grid item xs={6} md={6}>
                                <h2>Estado del vehiculo</h2>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"

                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="excelente" control={<Radio />} label="excelente" />
                                    <FormControlLabel value="muy bueno" control={<Radio />} label="muy bueno" />
                                    <FormControlLabel value="bueno" control={<Radio />} label="bueno" />
                                    <FormControlLabel value="malo" control={<Radio />} label="malo" />
                                    <FormControlLabel value="muy malo" control={<Radio />} label="muy malo" />
                                </RadioGroup>
                            </Grid>*/}

                            <Grid item xs={12} md={12}>
                                <h2>Descripcion del vehiculo</h2>
                                <TextField
                                    error={touched.aut_descripcion && errors.aut_descripcion && true}
                                    margin="dense"
                                    name="aut_descripcion"
                                    required
                                    color="warning"
                                    label="Descripcion del vehiculo"
                                    type="text"
                                    value={values.aut_descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                />
                                <ErrorMessage
                                    name="aut_descripcion"
                                    component={() => (
                                        <div className="input-error">{errors.aut_descripcion}</div>
                                    )}
                                />
                            </Grid>

                            {/*
                            <Grid >
                                <InputLabel id="demo-simple-select-label">Marca del vehiculo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    onChange={handleChange}> 
                                    
                                    {count.length > 0 &&
                                    count.map((count)=>(
                                    <MenuItem value={count.Valor}>{count.Marca} - {count.Año}</MenuItem>
                                    ))}
                                    
                                </Select>
                            </Grid>*/}

                        </Grid>
                        <ColorButton
                            variant="contained"
                            disabled={
                                Object.values(values)[0] === "" ||
                                    Object.values(errors).length > 0
                                    ? true
                                    : false
                            }
                            type="submit"
                            fullWidth
                            endIcon={<AppRegistrationIcon />}
                        >
                            ENVIAR FORMULARIO DE REGISTRO DE VEHICULO
                        </ColorButton>
                    </Form>

                )}
            </Formik>


        </Container>
    );
};
export default RegAuto;