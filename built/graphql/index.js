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
const knex_1 = __importDefault(require("../../knex"));
exports.typeDefs = apollo_server_express_1.gql `
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
`;
exports.resolvers = {
    Mutation: {
        AddLocation: (obj, { locationInput: { locationName } }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const isLocationExist = yield context.knex('location').select("locationId").where("locationName", locationName);
            console.log(isLocationExist);
            if (isLocationExist.length < 0) {
                const { rowCount } = yield context.knex('location').insert({ locationName: locationName });
                if (rowCount > 0)
                    return "Location has been successfully inserted";
            }
            else {
                return "Location already exist";
            }
        })
    },
    Query: {
        hello: () => {
            return knex_1.default.prototype.name;
        }
    }
};
