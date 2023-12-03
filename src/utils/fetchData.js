import axios from "axios";  

const API_ENDPOINT = process.env.REACT_APP_API_URL;
export const fetchData = async () => {
    try{
        const response = await axios.get(API_ENDPOINT);
        return response.data;
    }catch(err){
        throw err;
    }
}