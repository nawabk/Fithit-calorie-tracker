import axios from 'axios';


const instance = axios.create({
    baseURL:"http://localhost:6001/fit/rest/",
    
});



export default instance;