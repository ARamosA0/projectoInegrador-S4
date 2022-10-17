import {  BrowserRouter,
    Routes,
    Route,
    Link} from "react-router-dom"

//Layouts
import Main from "../layouts/Main";

//Pages
import Index from "../pages/Index";
import Ubicacion from "../pages/Ubicacion";
import Inf_Usuario from "../components/InfoUsuario";
import Reg_auto from "../components/Reg_autos";
import Auto from "../pages/Auto"

const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Main/>}>
                    <Route path="/" element={<Index />}/>
                    <Route path="/ubicacion" element={<Ubicacion />}/>
                    <Route path="/usuario" element={<Inf_Usuario/>}/>
                    <Route path="/regauto" element={<Reg_auto/>}/>
                    <Route path="/auto" element={<Auto/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;