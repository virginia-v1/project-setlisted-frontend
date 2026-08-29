import axios from 'axios';

const api = axios.create ({
    baseURL : "https://setlisted.onrender.com"
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
//baseURL changed to onRender link 
