import axios from "axios";
import URL_API from "./URLS"

export const createUser = async(user) =>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/users/', user);
        return response.data
    } catch (error){
        console.log(error)
    }
}

export const loginUser = async(user) =>{
    try {
        const response = await axios.get('http://127.0.0.1:8000/users/', user);
        return response.data
    } catch (error){
        console.log(error)
    }
}