import http from './httpService'
import config from "../config.json"


const apiEndpoint=config.apiUrl+'/auth/users/';


export function register(user){
   console.log(user)
return http.post(apiEndpoint,user);
}
