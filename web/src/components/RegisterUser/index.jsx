import React from "react";
import { createUser } from "../../service/userServices"; 
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
        name:"",
        email: "",
        celular: "",
        password: ""
      }}
      //para validar los datos
      validate={(valores) => {
        let errores = {};
        //validacion nombre
        if (!valores.name) {
          errores.name = "Ingrese su nombre";
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

        if (!valores.celular) {
          errores.celular = "Ingrese su Telefono";
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
          await createUser(valores)
          swal.fire(
            'Cuenta creada',
            'Inicie sesion para continuar',
            'success'
          );
        } catch (error) {
          swal.fire(
            "Intenta de nuevo dentro de unos minutos",
            `${error.message}`,
            "error"
          );
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
                error={touched.name && errors.name && true}
                required
                margin="dense"
                name="name"
                label="Nombre Completo"
                color="warning"
                type="text"
                fullWidth
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="name"
                component={() => (
                  <div className="input-error">{errors.name}</div>
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
                  error={touched.celular && errors.celular && true}
                  margin="dense"
                  name="celular"
                  required
                  color="warning"
                  label="Telefono"
                  type="tel"
                  value={values.celular}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ maxLength: 9 }}
                  fullWidth
                />
                <ErrorMessage
                  name="celular"
                  component={() => (
                    <div className="input-error">{errors.celular}</div>
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