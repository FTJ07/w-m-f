"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const apollo_server_express_1 = require("apollo-server-express");
const index_1 = require("./graphql/index");
const knex_1 = __importDefault(require("../knex"));
const app = express();
app.listen(3000, () => {
    console.log("app start on 8000");
});
const graphqlServer = new apollo_server_express_1.ApolloServer({
    typeDefs: index_1.typeDefs,
    resolvers: index_1.resolvers,
    context: {
        knex: knex_1.default
    }
});
graphqlServer.applyMiddleware({ app, path: '/graphql' });
