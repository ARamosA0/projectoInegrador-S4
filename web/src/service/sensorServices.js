import axios from "axios";

export const sensorDataPost = async(data) =>{
    try {
        const response = await axios.post('http://127.0.0.1:9000/temperature', data);
        return response
    } catch (error){
        console.log(error)
    }
}