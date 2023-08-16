import http from './httpService'
import config from "../config.json"

const apiEndpoint=config.apiUrl+'/store/movies';

export function getMovies(){
return http.get(apiEndpoint);
}

export function deleteMovie(movieId){
  return  http.delete(apiEndpoint+`/${movieId}/`);
}

export function getMovie(movieId){
  return http.get(apiEndpoint+`/${movieId}/`);
}

export function saveMovie(data){
const movieData={...data};
movieData['genre']=Number(data['genreId']);
delete movieData['genreId'];
delete movieData['id'];
movieData['like']=false;

if(data.id){
return http.put(apiEndpoint+`/${data.id}/`,movieData );
}else {
  return http.post(apiEndpoint+"/",movieData);
}

}