import http from './httpService'
import config from "../config.json"


const apiEndpoint=config.apiUrl+'/store/profile/'


function getImageName(path) {
  const pattern = /([a-zA-Z0-9/]*)[/]([a-zA-Z0-9_-]+)(\.)(jpg|gif|png)/;
  const res = path.match(pattern);

  if (!res) return res;
  
  let imageName = res.slice(-3).join("");
  
  return imageName;
}

export  async function getProfile(){
  const {data}= await http.get(apiEndpoint);

  for(let key in data[0]){
    if(!data[0][key])data[0][key]=""; }

  if(!data[0])return;
  localStorage.setItem('profile',JSON.stringify(data[0]));
 
  if(data[0].picture){
    let imageName=getImageName(data[0].picture);
  let imageurl=config.apiUrl+"/store/media/"+imageName;
  //localStorage.setItem('profileurl',imageurl);
  const r=await http.get(imageurl);
 
  localStorage.setItem('profileurl',r.data.dataurl);
  
}
}

export async  function saveprofile(data){

const profileData=new FormData();
let d={...data}
delete d['id']

if(typeof(d['picture'])!==typeof('')&&d['picture'] ){
  profileData.append('picture',d['picture'],d['picture'].name); }
delete d['picture'];
 
for (let key in d){ profileData.append(key,data[key]);}

if(data.id){
const{data:response}=await http.patch(apiEndpoint+`${data.id}/`,profileData );

for(let key in response){
  if(!response[key])response[key]=""
}
response['id']=data['id']
localStorage.setItem('profile',JSON.stringify(response));

if(response.picture){
  let imageName=getImageName(response.picture);
  let imageurl=config.apiUrl+"/store/media/"+imageName;
  const r=await http.get(imageurl);
  localStorage.setItem('profileurl',r.data.dataurl);

}
}
else {
  if(!d['picture']){profileData.append('picture',new Blob(),"")}
  await http.post(apiEndpoint,profileData);
  await getProfile();   
}
}


export  async function deleteProfilePic(){

  let imageName=getImageName(JSON.parse(localStorage.getItem('profile')).picture);

    await http.delete(config.apiUrl+"/store/media/"+imageName);
localStorage.removeItem('profileurl');
}


