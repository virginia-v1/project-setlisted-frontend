import axios from 'axios';

const api = axios.create ({
    baseURL : "http://localhost:3000/api"
});

export default api;
 

//not sure if it's complete
