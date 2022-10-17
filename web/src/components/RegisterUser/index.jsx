import React from "react";
// import { createUserAxios } from "../../service/userService";
import { Grid, TextField, Button, styled } from "@mui/material";
import { Formik, ErrorMessage } from "formik";
import swal from "sweetalert2";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const RegisterUser = () => {
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

  return (
    <Formik
      initialValues={{
        //valores inciales del formulario
        nombre:"",
        email: "",
        password: "",
        telefono: ""
      }}
      //para validar los datos
      validate={(valores) => {
        let errores = {};
        //validacion nombre
        if (!valores.nombre) {
          errores.nombre = "Ingrese su nombre";
        }
        if (!valores.email) {
          errores.email = "Ingrese su correo";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            valores.email
          )
        ) {
          errores.email = "Digite bien su correo";
        }
        if (!valores.password) {
          errores.password = "Ingrese su password";
        }

        if (!valores.telefono) {
          errores.telefono = "Ingrese su Telefono";
        }
        return errores;
      }}
      //para enviar el formulario
      onSubmit={async (valores, { resetForm }) => {
        //valores son los valores de los inputs donde se muestra en un objeto
        resetForm();
        //funcion para crear usuario
        console.log(valores)
        try {
          await createUserAxios(valores)
          swal({
            icon: "success",
            title: "Cuenta creada",
            text: "Inicie sesion para continuar",
          });
        } catch (error) {
          swal({
            icon: "error",
            title: `${error.message}`,
            text: "Intenta de nuevo dentro de unos minutos",
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}  md={6}>
              <TextField
                error={touched.nombre && errors.nombre && true}
                required
                margin="dense"
                name="nombre"
                label="Nombre Completo"
                color="warning"
                type="text"
                fullWidth
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="nombre"
                component={() => (
                  <div className="input-error">{errors.nombre}</div>
                )}
              />
            </Grid>
            <Grid item xs={6}  md={6}>
              <TextField
                error={touched.email && errors.email && true}
                margin="dense"
                name="email"
                required
                color="warning"
                label="Correo"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className="input-error">{errors.email}</div>
                )}
              />
            </Grid>
            <Grid item xs={6}  md={6}>
              <TextField
                error={touched.password && errors.password && true}
                margin="dense"
                name="password"
                required
                color="warning"
                label="Contrasena"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className="input-error">{errors.password}</div>
                )}
              />
            </Grid>
              <Grid item xs={6}  md={6}>
                <TextField
                  error={touched.telefono && errors.telefono && true}
                  margin="dense"
                  name="telefono"
                  required
                  color="warning"
                  label="Telefono"
                  type="tel"
                  value={values.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ maxLength: 9 }}
                  fullWidth
                />
                <ErrorMessage
                  name="telefono"
                  component={() => (
                    <div className="input-error">{errors.telefono}</div>
                  )}
                />
              </Grid>
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
            Registrate
          </ColorButton>
        </form>
      )}
    </Formik>
  );
};
export default RegisterUser;