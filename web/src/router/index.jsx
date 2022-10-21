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
import Auto from "../pages/Auto"
import RegAuto from "../components/nuevoregistroautovalidacion";

const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Main/>}>
                    <Route path="/" element={<Index />}/>
                    <Route path="/ubicacion" element={<Ubicacion />}/>
                    <Route path="/usuario" element={<Inf_Usuario/>}/>
                    <Route path="/auto" element={<Auto/>}/>
                    <Route path="/nregauto" element={<RegAuto/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;