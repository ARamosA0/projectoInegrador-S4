import axios from "axios";
import URL_API from "./URLS"


export const createUser = async(user) =>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/register/', user);
        return response
    } catch (error){
        console.log(error)
    }
}

export const loginUser = async(user) =>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/login/', 
            user,  
            { withCredentials: true });
        return response.data
    } catch (error){
        console.log(error)
    }
    // const response = await fetch('http://127.0.0.1:8000/login/', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         credentials: 'include',
    //         body: JSON.stringify(user)
    //     });
    // return response.data
    
}

export const loginOut = async(user) =>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/logout/', user);
        return response.data
    } catch (error){
        console.log(error)
    }
}

export const userData = async() => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/users/');
        return response
    } catch (error){
        console.log(error)
    }
}