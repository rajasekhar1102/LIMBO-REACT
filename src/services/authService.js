import http from './httpService'
import config from "../config.json"
import jwtDecode from 'jwt-decode';

const apiEndpoint=config.apiUrl+'/auth/jwt/create/';

export function loginWithJwt(token){
    localStorage.setItem("access", token.access);
      localStorage.setItem("refresh", token.refresh);
}
export async function login(user)
{
 
    const {data}=await http.post(apiEndpoint,user);
    localStorage.access = data.access;
      localStorage.refresh = data.refresh;
  
}

export function logout(){
    // localStorage.removeItem("access");
    // localStorage.removeItem("refresh");
    localStorage.clear();
}

export function getCurrentUser(){

    try{
        const jwt=localStorage.getItem('access');
    return jwtDecode(jwt);
       }catch(er){return null;}

}

export function getJwt(){
    return  localStorage.getItem('access');
}

http.setJwt(getJwt());