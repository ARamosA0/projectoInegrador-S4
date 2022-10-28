import {  BrowserRouter,
    Routes,
    Route,
    Link} from "react-router-dom"

//Layouts
import Main from "../layouts/Main";
import User from "../layouts/User"

//Pages
import Index from "../pages/Index";
import Ubicacion from "../pages/Ubicacion";
import Inf_Usuario from "../pages/InfoUsuario";
import Auto from "../pages/Auto"
import RegAuto from "../components/nuevoregistroautovalidacion";

const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Main/>}>
                    <Route path="/" element={<Index />}/>
                    <Route path="/ubicacion" element={<Ubicacion />}/>
                </Route>

                <Route element={<User/>}>
                    <Route element={<Main/>}>
                        <Route path="/" element={<Index />}/>
                        <Route path="/usuario" element={<Inf_Usuario/>}/>
                        <Route path="/auto" element={<Auto/>}/>
                        <Route path="/nregauto" element={<RegAuto/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;