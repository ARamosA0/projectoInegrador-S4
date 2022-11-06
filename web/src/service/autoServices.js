import axios from "axios";
import URlS from "./URLS"

export const registerCar = async(auto) =>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/vehicles/', auto);
        return response.data
    } catch (error){
        console.log(error)
        return error
    }
}

export const getCar = async(userId) =>{
    try {
        const response = await axios.get(`http://127.0.0.1:8000/auto/${userId}`);
        return response.data
    } catch (error){
        console.log(error)
    }
}



export const editCar = async(id, auto) =>{
    try {
        const response = await axios.put(`http://127.0.0.1:8000/vehicles/${id}`, auto);
        
             return response.data
         } catch (error){
             console.log(error)
         }
}

export const marcas = async()=>{
    try {
        const response = await axios.get('http://127.0.0.1:8000/marcas');
        
             return response.data
         } catch (error){
             console.log(error)
         }
}