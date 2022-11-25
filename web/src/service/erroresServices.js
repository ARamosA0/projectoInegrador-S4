import axios from "axios";
import URLS from "./URLS"

export const errmanualpost = async(data)=>{
    try {
        const response = await axios.post(`${URLS.URL_API}errmanual/`, data);   
             return response.data
         } catch (error){
             console.log(error)
         }
}