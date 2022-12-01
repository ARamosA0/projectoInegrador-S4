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

export const axiPost = async(data) => {
    try{
        const response = await axios.post(`${URLS.URL_API}sensorsvehicle/`, data)
        return response.data
    } catch (error){
        console.log(error)
    }
}

export const axiGet = async() => {
    try{
        const response = await axios.get(`${URLS.URL_API}sensorsvehicle/`)
        return response.data
    } catch (error){
        console.log(error)
    }
}