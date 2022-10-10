

// Import Material
import {Container, Grid, Divider} from "@mui/material"

// Import CSS
import "./index.css"

// Maps
import { MapContainer, TileLayer, useMap , Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "../../assets/marker.png"

const Ubicacion = () =>{

    const position = [-16.345638, -71.564495]


    return (
        <>
            <Container maxWidth="md">
                <div className="title-container">
                    <h1>Encuentranos En </h1>
                    <hr className="title-divider"/>
                    <Divider light />
                </div>
                <Grid container className="map-container">
                    <Grid item xs={12}>
                        <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="map-cont">
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker position={position}>
                            <Popup>
                              Estamos aca
                            </Popup>
                          </Marker>
                        </MapContainer>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}

export default Ubicacion;