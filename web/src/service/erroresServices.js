import axios from "axios";
import URL_API from "./URLS"

export const errmanualpost = async(data)=>{
    try {
        const response = await axios.post('http://127.0.0.1:8000/errmanual/', data);   
             return response.data
         } catch (error){
             console.log(error)
         }
}