import {gql} from "apollo-server-express";

import knex from '../../knex';
export const typeDefs=gql
`
    type Mutation{
        AddLocation(locationInput:Location):String
    }

    type Query{
        hello:String
    }

    input Location{
        locationName:String
    }


    type Schema{
        mutation:Mutation
        query:Query
    }
`

export const resolvers = {
    Mutation:{
        AddLocation:async (obj,{locationInput:{locationName}},context,info)=>{
            const isLocationExist = await context.knex('location').select("locationId").where("locationName",locationName);
            console.log(isLocationExist);
            if(isLocationExist.length<0){
                const {rowCount}= await context.knex('location').insert({locationName:locationName});
                if (rowCount>0)
                return "Location has been successfully inserted";
            }else{
                return "Location already exist";
            }
           
 
        }
    },

    Query:{
        hello:()=>{
            return knex.prototype.name;
        }
    }
}