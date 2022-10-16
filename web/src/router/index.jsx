import {  BrowserRouter,
    Routes,
    Route,
    Link} from "react-router-dom"

//Layouts
import Main from "../layouts/Main";

//Pages
import Index from "../pages/Index";
import Log from "../pages/Log";
import Telemetria from "../pages/Telemetria";
import Ubicacion from "../pages/Ubicacion";


const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Main/>}>
                    <Route path="/" element={<Index />}/>
                    <Route path="/ubicacion" element={<Ubicacion />}/>
                    <Route path="/telemetria" element={<Telemetria/>}/>
                    <Route path="/log" element={<Log/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;