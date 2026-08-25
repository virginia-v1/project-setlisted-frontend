import axios from 'axios';

const api = axios.create ({
    baseURL : "http://localhost:3000/api"
});


api.interceptors.request.use((config)=>{
    const token= localStorage.getItem('authtoken')
    if(token){
        config.headers.Authorization =`Bearer ${token}`
    }

    return config
})

export default api;
 

//not sure if it's complete
