import {comparePassword} from "../common/utility";

export async function  retireve_mosque_by_search(dbConnection:any,queryParam:string){
  console.log(queryParam);
    const result = await
     dbConnection('location')
     .distinct()
     .select('mosque.mosqueName','mosque.mosqueId','mosque.mosqueDetails')
     .leftJoin('search','location.locationId','search.locationId')
     .leftJoin('mosque','mosque.mosqueId','search.mosqueId')
     .where('location.locationName','like',queryParam+"%")
   

    if(result.length==0)  
    {
      let result =await dbConnection('search')
      .distinct()
      .select('mosque.mosqueName','mosque.mosqueId','mosque.mosqueDetails')
      .leftJoin('mosque','mosque.mosqueId','search.mosqueId')
      .where('search.searchTag','like',queryParam+"%");
      console.log(result);
    }
    
   return "rows";
}



export async function  retireve_password(dbConnection:any,currentPlainPassword:string,userId:number){
const [user] = await dbConnection('user').select('*').where('userId',userId);
const result = await comparePassword(currentPlainPassword,user.userPassword);
return result;
}
