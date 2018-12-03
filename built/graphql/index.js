"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const insert_1 = require("../common/insert");
const knex_1 = __importDefault(require("../../knex"));
exports.typeDefs = apollo_server_express_1.gql `
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
`;
exports.resolvers = {
    Mutation: {
        AddLocation: (obj, { input }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const isLocationExist = yield context.knex('location').select("locationId").where("locationName", input.locationName);
            console.log(isLocationExist.length);
            if (isLocationExist.length == 0) {
                return yield insert_1.insert_into_table(context.knex, 'location', input, " Added Succesffly", "Location couldnt be added");
            }
            else {
                return "Location already exist";
            }
        }),
        AddMosque: (obj, { input }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const id = yield insert_1.insert_into_table_return_id(context.knex, 'mosque', { mosqueName: input.mosqueName, mosqueDetails: input.mosqueDetails });
            const seeds = input.searchTag.split(',').map((item) => {
                return { mosqueId: id, locationName: input.locationName, searchTag: item };
            });
            console.log(seeds);
            return yield insert_1.insert_into_table(context.knex, 'search', seeds, "Mosque Added Succesffly", "Mosque couldnt be added");
        })
    },
    Query: {
        hello: () => {
            return knex_1.default.prototype.name;
        }
    }
};
