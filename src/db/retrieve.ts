import {comparePassword} from "../common/utility";
import jwt from 'jsonwebtoken';

export async function  retireve_mosque_by_search_key(dbConnection:any,queryParam:string){
  console.log(queryParam);
    let result = await
     dbConnection('location')
     .distinct()
     .select('mosque.mosqueName','mosque.mosqueId','mosque.mosqueDetails')
     .leftJoin('search','location.locationId','search.locationId')
     .leftJoin('mosque','mosque.mosqueId','search.mosqueId')
     .where('location.locationName','like',queryParam+"%")
   

    if(result.length==0)  
    {
       result =await dbConnection('search')
      .distinct()
      .select('mosque.mosqueName','mosque.mosqueId','mosque.mosqueDetails')
      .leftJoin('mosque','mosque.mosqueId','search.mosqueId')
      .where('search.searchTag','like',queryParam+"%");
     
    }
    console.log(result);
   return result;
}


export async function  retireve_mosque_by_id(dbConnection:any,queryParam:string){
  console.log(queryParam);
    let [result] = await
     dbConnection('mosque')
     .select('mosque.mosqueName','mosque.mosqueId','mosque.mosqueDetails')
     .where('mosque.mosqueId',queryParam);
   return result;
}


export async function  retireve_password(dbConnection:any,currentPlainPassword:string,userId:number){
const [user] = await dbConnection('user').select('*').where('userId',userId);
const result = await comparePassword(currentPlainPassword,user.userPassword);
return result;
}


export async function  get_user_token(dbConnection:any,userEmail:string,userPassword:string,){

  const [user] = await dbConnection('user').select('*').where('userEmail',userEmail);
  if(user==undefined || user==null){
    return "Email is not found";
  }
  const isValidCustomer = await retireve_password(dbConnection,userPassword,user.userId);
  if(isValidCustomer){
    return jwt.sign({id:user.id},process.env.SECRET_KEY,{expiresIn:1800});
  }

  return "Doesn't match with password";
  }