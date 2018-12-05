require('dotenv').config()
const express = require('express');
import {ApolloServer} from 'apollo-server-express';
import {typeDefs,resolvers} from "./graphql/index";
import knex from '../knex';

const app = express();

app.listen(3000,()=>{
    console.log("app start on 8000");
})

const graphqlServer = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    context:{
    
            knex:knex
        
    }
    
});
graphqlServer.applyMiddleware({app,path:'/graphql'})