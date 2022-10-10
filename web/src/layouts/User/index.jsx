import * as React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const User = () =>{
    return(
        <>
            <Navbar></Navbar>
            <Outlet />
            <Footer></Footer>
        </>
    )
}

export default User;