import {  BrowserRouter,
    Routes,
    Route,
    Link} from "react-router-dom"

//Pages
import Index from "../pages/Index";

//Layouts
import Main from "../layouts/Main";

const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Main/>}>
                    <Route path="/" element={<Index />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;