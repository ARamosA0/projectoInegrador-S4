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
        usu_nombres:"",
        usu_email: "",
        usu_password: "",
        usu_celular: ""
      }}
      //para validar los datos
      validate={(valores) => {
        let errores = {};
        //validacion nombre
        if (!valores.usu_nombres) {
          errores.usu_nombres = "Ingrese su nombre";
        }
        if (!valores.usu_email) {
          errores.usu_email = "Ingrese su correo";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            valores.usu_email
          )
        ) {
          errores.usu_email = "Digite bien su correo";
        }
        if (!valores.usu_password) {
          errores.usu_password = "Ingrese su password";
        }

        if (!valores.usu_celular) {
          errores.usu_celular = "Ingrese su Telefono";
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
                error={touched.nombres && errors.nombres && true}
                required
                margin="dense"
                name="usu_nombres"
                label="Nombre Completo"
                color="warning"
                type="text"
                fullWidth
                value={values.usu_nombres}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="nombres"
                component={() => (
                  <div className="input-error">{errors.usu_nombres}</div>
                )}
              />
            </Grid>
            <Grid item xs={6}  md={6}>
              <TextField
                error={touched.usu_email && errors.usu_email && true}
                margin="dense"
                name="usu_email"
                required
                color="warning"
                label="Correo"
                type="email"
                fullWidth
                value={values.usu_email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className="input-error">{errors.usu_email}</div>
                )}
              />
            </Grid>
            <Grid item xs={6}  md={6}>
              <TextField
                error={touched.usu_password && errors.usu_password && true}
                margin="dense"
                name="usu_password"
                required
                color="warning"
                label="Contrasena"
                type="password"
                fullWidth
                value={values.usu_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className="input-error">{errors.usu_password}</div>
                )}
              />
            </Grid>
              <Grid item xs={6}  md={6}>
                <TextField
                  error={touched.usu_celular && errors.usu_celular && true}
                  margin="dense"
                  name="usu_celular"
                  required
                  color="warning"
                  label="Telefono"
                  type="tel"
                  value={values.usu_celular}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ maxLength: 8 }}
                  fullWidth
                />
                <ErrorMessage
                  name="celular"
                  component={() => (
                    <div className="input-error">{errors.usu_celular}</div>
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