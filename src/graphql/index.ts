import {gql} from "apollo-server-express";
import {insert_into_table,insert_into_table_return_id} from "../common/insert";
import knex from '../../knex';
export const typeDefs=gql
`
    type Mutation{
        AddLocation(input:LocationInput):String
        AddMosque(input:MosqueInput):String
        AddUser:String
    }

    type Query{
        hello:String
    }

    input LocationInput{
        locationName:String!
    }

    input MosqueInput{
        mosqueName:String!
        mosqueDetails:String!
        searchTag:String!
        locationName:String!
    }

    type Schema{
        mutation:Mutation
        query:Query
    }
`

export const resolvers = {
    Mutation:{
        AddLocation:async (obj,{input},context,info)=>{
            const isLocationExist = await context.knex('location').select("locationId").where("locationName",input.locationName);
            console.log(isLocationExist.length);
            if(isLocationExist.length==0){
                return await insert_into_table(context.knex,'location',input," Added Succesffly","Location couldnt be added");
            }else{
                return "Location already exist";
            }       
        },
        AddMosque:async(obj,{input},context,info)=>{
           
           const id = await insert_into_table_return_id(context.knex,'mosque',{mosqueName:input.mosqueName,mosqueDetails:input.mosqueDetails});
           const seeds = input.searchTag.split(',').map((item)=>{
               return {mosqueId:id,locationName:input.locationName,searchTag:item}
           })
           console.log(seeds);
           return await insert_into_table(context.knex,'search',seeds,"Mosque Added Succesffly","Mosque couldnt be added");

        }
    },

    Query:{
        hello:()=>{
            return knex.prototype.name;
        }
    }
}