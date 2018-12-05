import {gql} from "apollo-server-express";
import {insert_into_table,insert_into_table_return_id} from "../db/insert";
import knex from '../../knex';
import {generateSalt,generatePassword} from '../common/utility';
import {check_duplicate_exist} from '../db/duplicacy';
import {retireve_mosque_by_search,retireve_password} from '../db/retrieve';

export const typeDefs=gql
`
    type Mutation{
        AddLocation(input:LocationInput):String
        AddMosque(input:MosqueInput):String
        AddUser(input:UserInput):String
        UpdatePassword(input:PasswordInput):String
    }

    type Query{
        GetMosques(query:String):String
        GetMosqueBySearchKeyword(query:String):String

    }

    type Schema{
        mutation:Mutation
        query:Query
    }

    type Mosque{
        mosqueName:String!
        mosqueDetails:String!
    }

    input LocationInput{
        locationName:String!
    }

    input MosqueInput{
        mosqueName:String!
        mosqueDetails:String!
        searchTag:String!
        locationId:Int!
        locationName:String!
    }

    input UserInput{
        userName:String!
        userEmail:String!
        userPhone:String
        userPassword:String!
    }

    input PasswordInput{
        currentPassword:String!
        newPassword:String!
    }


`

export const resolvers = {
    Mutation:{
        AddLocation:async (obj,{input},context,info)=>{
            let isLocationExist = false;
            isLocationExist = await check_duplicate_exist(context.knex,'location','locationId','locationName',input.locationName); 
            if(!isLocationExist){
                return await insert_into_table(context.knex,'location',input," Added Succesffly","Location couldnt be added");
            }else{
                return "Location already exist";
            }       
        },
        AddMosque:async(obj,{input},context,info)=>{
           
           const id = await insert_into_table_return_id(context.knex,'mosque',{mosqueName:input.mosqueName,mosqueDetails:input.mosqueDetails});
           const seeds = input.searchTag.split(',').map((item)=>{
               return {mosqueId:id,locationId:input.locationId,searchTag:item}
           })
           seeds.push({mosqueId:id,locationId:input.locationId,searchTag:input.locationName});
           console.log(seeds);
           return await insert_into_table(context.knex,'search',seeds,"Mosque Added Succesffly","Mosque couldnt be added");

        },
        AddUser:async(obj,{input},context,info)=>{
           
             const saltedValue =  await generateSalt(parseInt(process.env.SALTED_VALUE));
            
             const hashedPassword = await generatePassword(input.userPassword,saltedValue);  
             input.userPassword = hashedPassword;

             let isDuplicateExist = false;
             isDuplicateExist =  await check_duplicate_exist(context.knex,'user','userId','userEmail',input.userEmail); 
             if(!isDuplicateExist){
               return  insert_into_table(context.knex,'user',input,'User added','User doesnt add')
             }else{
                return "This email does exist try other email";
             }    
    
        },
        UpdatePassword:async(obj,{input},context,info)=>{
           
      
         }
    },

    Query:{
        GetMosqueBySearchKeyword:(obj,{query},context,info)=>{
           
           return retireve_mosque_by_search(context.knex,query);
        },
        GetMosques:(obj,{input},context,info)=>{
            return knex.prototype.name;
        }

    }
}