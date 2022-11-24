import axios from "axios";
import URLS from "./URLS"


// GET DATA

export const dataSensorGet = async() => {
    try{
        const response = await axios.get(`${URLS.URL_API}datasensors/`)
        return response.data
    } catch (error){
        console.log(error)
    }
}