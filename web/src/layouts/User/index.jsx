import * as React from 'react';
import {Navigate,Outlet} from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {userData} from "../../service/userServices"

const User = () =>{

    const user = JSON.parse(localStorage.getItem("userID")); 
    
    if (!user){
        return <Navigate to="/"/>
    } else {
        return (
            <>
                <Outlet/>
            </>
        )
    }
}

export default User;