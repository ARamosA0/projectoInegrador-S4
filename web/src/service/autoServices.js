import axios from "axios";
import URLS from "./URLS"

export const registerCar = async(auto) =>{
    try {
        const response = await axios.post(`${URLS.URL_API}vehicles/`, auto);
        return response.data
    } catch (error){
        console.log(error)
        return error
    }
}

export const getCar = async(userId) =>{
    try {
        const response = await axios.get(`${URLS.URL_API}auto/${userId}`);
        return response.data
    } catch (error){
        console.log(error)
    }
}



export const editCar = async(id, auto) =>{
    try {
        const response = await axios.put(`${URLS.URL_API}vehicles/${id}`, auto);
        
             return response.data
         } catch (error){
             console.log(error)
         }
}

export const marcas = async()=>{
    try {
        const response = await axios.get(`${URLS.URL_API}marcas/`);
        
             return response.data
         } catch (error){
             console.log(error)
         }
}

export const deleteCar = async(id, auto) =>{
    try {
        const response = await axios.delete(`${URLS.URL_API}vehicles/${id}`, auto);
        
             return response.data
         } catch (error){
             console.log(error)
         }
}


export const geterrmanual= async(id, auto) =>{
    try {
        const response = await axios.get(`${URLS.URL_API}errormanual/${id}`, auto);
        
             return response.data
         } catch (error){
             console.log(error)
         }
}