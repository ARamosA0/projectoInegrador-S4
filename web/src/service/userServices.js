import axios from "axios";
import URLS from "./URLS"


export const createUser = async(user) =>{
    try {
        const response = await axios.post(`${URLS.URL_API}register/`, user);
        return response
    } catch (error){
        console.log(error)
    }
}

export const loginUser = async(user) =>{
    try {
        const response = await axios.post(`${URLS.URL_API}login/`, 
            user,  
            { withCredentials: true });
        return response.data
    } catch (error){
        console.log(error)
    }
    
}

export const loginOut = async(user) =>{
    try {
        const response = await axios.post(`${URLS.URL_API}logout/`, user);
        return response.data
    } catch (error){
        console.log(error)
    }
}

export const userData = async(id) => {
    try {
        const response = await axios.get(`${URLS.URL_API}usuario/${id}`);
        return response.data
    } catch (error){
        console.log(error)
    }
}