import http from './httpService'
import config from "../config.json"

const apiEndpoint=config.apiUrl+'/store/userlikes/'

export function like(movie){
    if(movie.likeId){
    return http.put(apiEndpoint+`${movie.likeId}/`,{like:!movie.like} );
    }else{
        return http.post(apiEndpoint,{like:!movie.like,movie:movie.id})
    }
}