import axios from 'axios'


const httpClient = axios.create({
    timeout: 5000, // request timeout
    headers: { 'Content-Type': 'application/json' }
})

// request interceptor
httpClient.interceptors.request.use(config => {
    return config
}, error => {
    console.log(error);
    Promise.reject(error)
})

// respone interceptor
httpClient.interceptors.response.use(
    response => {
        console.log("--------------resp" + response);

        if(response.data.status==-1){
           localStorage.setItem('ZDisLogin',0);
          
        }
        return response.data;
        

        // if (res.code === '4000'|| res.code === '28000100') {
        //   console.log('***********需要授权************')
        //   return Promise.reject(response)
        // } else if (res.code != '0') {

        //   return Promise.reject(response)
        // } else {
        //   if(res.data||res.data===0){
        //     return res.data
        //   }else{
        //     return res
        //   }
        // }
    }, error => {
        console.log('err ------------' + error) // for debug
        return Promise.reject(error)
    })

export default httpClient