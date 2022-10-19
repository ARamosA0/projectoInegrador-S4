import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Formik } from "formik";

// Iconos
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

import "./index.css";

import RegisterUser from "../RegisterUser";
import SesionUser from "../SesionUser";

const RegUsuario = ({ handleClickOpen, open }) => {

  const [value, setValue] = useState("1");

  const handleTabsLogin = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickOpen}
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle
        sx={{
          padding: "5px 2px 10px",
          borderBottom: "1px solid rgba(61, 59, 59, 0.226);",
        }}
      >
        <Grid container alignItems={"center"}>
          <Grid item sx={{ height: "1px" }}>
            <Button
              size="small"
              sx={{ justifyContent: "start", color: "#EB3B3B" }}
              onClick={handleClickOpen}
            >
              <CloseIcon sx={{ fontSize: 26}} />
            </Button>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Typography
              className="title-card2"
              variant="h5"
              gutterBottom
              component="div"
              mb={0}
              color="#EB3B3B"
            >
              Inicia sesion o Registrate
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container textAlign={"center"} justifyContent={"center"}>
          <Grid item md={12}>
            <Typography
              className="subtitle-card"
              variant="h5"
              gutterBottom
              component="div"
              mb={0}
              mt={2}
              color="#2F2C2C"
            >
              Te damos la bienvenida a Taller
            </Typography>
          </Grid>
        </Grid>
        <TabContext value={value}>
          <TabList onChange={handleTabsLogin}>
            <Tab
              label="Iniciar Sesion"
              value="1"
              icon={<LoginIcon />}
              iconPosition="start"
              indicatorcolor="warning"
            />
            <Tab
              label="Registrate"
              value="2"
              icon={<PersonIcon />}
              iconPosition="start"
              indicatorcolor="#FFA34F"
              color="#FFA34F"
            />
          </TabList>
          <TabPanel value="1">
            <SesionUser />
            <div className="div-container">
              <div className="division"></div>
              <span>&nbsp;&nbsp;</span>
              <div className="division"></div>
            </div>
            {/* <ServiciosGoFa init={"Inicia Sesion"} /> */}
          </TabPanel>

          <TabPanel value="2">
            <RegisterUser />
          </TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog>
  );
};

export default RegUsuario;


