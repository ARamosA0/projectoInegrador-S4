import React from "react";
import { loginUser } from "../../service/userServices";
import jwt_decode from "jwt-decode";
import { Grid, TextField, Button, styled } from "@mui/material";
import { Formik, ErrorMessage } from "formik";
import SendIcon from "@mui/icons-material/Send";
import swal from "sweetalert2";

const SesionUser = () => {
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
        email: "",
        password: "",
      }}
      validate={(valores) => {
        let errores = {};
        //validacion nombre
        if (!valores.email) {
          errores.email = "Ingrese su email";
        }
        if (!valores.password) {
          errores.password = "Ingrese su password";
        }
        return errores;
      }}
      onSubmit={async (valores, { resetForm }) => {
        resetForm();
        //funcion iniciar sesion
        try {
          //? login de usuario haciendo post a la api y decodificando con jwt_decode
          const login = await loginUser(valores);
          const decoded = jwt_decode(login.jwt);

          console.log(login)

          const idUser = {
            id : decoded.id,
            name : decoded.name,
            email : decoded.email,
            celular : decoded.celular
          }

          localStorage.setItem("userID", JSON.stringify(idUser));


          const response = await swal.fire(
            "Inicio de sesion exitoso",
            `Bienvenido ${decoded.name}`,
            'success'
          );
          if (response) {
            window.location.replace("");
          }

        } catch (error) {
          console.log(error);
          swal.fire(
            `${
              error.request.status === 401
                ? "No se pudo iniciar sesion"
                : error.message
            }`,
            "Coloque bien su correo o contraseña \n o si no esta registrado registrese primero",
            "error",
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
          <Grid container>
            <Grid item xs={12} md={12}>
              <TextField
                autoFocus
                error={touched.username && errors.username && true}
                margin="dense"
                label="Correo Electronico"
                type="text"
                name="email"
                fullWidth
                variant="filled"
                color="warning"
                required
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
            <Grid item xs={12} md={12}>
              <TextField
                error={touched.password && errors.password && true}
                margin="dense"
                label="Password"
                type="password"
                name="password"
                fullWidth
                variant="filled"
                color="warning"
                required
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
          </Grid>
          <ColorButton
            variant="contained"
            type="submit"
            disabled={
              Object.values(values)[0] === "" ||
              Object.values(errors).length > 0
                ? true
                : false
            }
            fullWidth
            endIcon={<SendIcon />}
          >
            Siguiente
          </ColorButton>
        </form>
      )}
    </Formik>
  );
};
export default SesionUser;