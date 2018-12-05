"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const insert_1 = require("../db/insert");
const utility_1 = require("../common/utility");
const duplicacy_1 = require("../db/duplicacy");
const retrieve_1 = require("../db/retrieve");
exports.typeDefs = apollo_server_express_1.gql `
    type Mutation{
        AddLocation(input:LocationInput):String
        AddMosque(input:MosqueInput):String
        AddUser(input:UserInput):String
        UpdatePassword(input:PasswordInput):String
    }

    type Query{
        GetMosque(query:Int):Mosque
        GetMosqueBySearchKeyword(query:String):[Mosque]
        GetUserToken(userEmail:String,userPassword:String):String
        
    }

    type Schema{
        mutation:Mutation
        query:Query
    }



    type Mosque{
        mosqueId:Int
        mosqueName:String
        mosqueDetails:String
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


`;
exports.resolvers = {
    Mutation: {
        AddLocation: (obj, { input }, context, info) => __awaiter(this, void 0, void 0, function* () {
            let isLocationExist = false;
            isLocationExist = yield duplicacy_1.check_duplicate_exist(context.knex, 'location', 'locationId', 'locationName', input.locationName);
            if (!isLocationExist) {
                return yield insert_1.insert_into_table(context.knex, 'location', input, " Added Succesffly", "Location couldnt be added");
            }
            else {
                return "Location already exist";
            }
        }),
        AddMosque: (obj, { input }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const id = yield insert_1.insert_into_table_return_id(context.knex, 'mosque', { mosqueName: input.mosqueName, mosqueDetails: input.mosqueDetails });
            const seeds = input.searchTag.split(',').map((item) => {
                return { mosqueId: id, locationId: input.locationId, searchTag: item };
            });
            seeds.push({ mosqueId: id, locationId: input.locationId, searchTag: input.locationName });
            console.log(seeds);
            return yield insert_1.insert_into_table(context.knex, 'search', seeds, "Mosque Added Succesffly", "Mosque couldnt be added");
        }),
        AddUser: (obj, { input }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const saltedValue = yield utility_1.generateSalt(parseInt(process.env.SALTED_VALUE));
            const hashedPassword = yield utility_1.generatePassword(input.userPassword, saltedValue);
            input.userPassword = hashedPassword;
            let isDuplicateExist = false;
            isDuplicateExist = yield duplicacy_1.check_duplicate_exist(context.knex, 'user', 'userId', 'userEmail', input.userEmail);
            if (!isDuplicateExist) {
                return insert_1.insert_into_table(context.knex, 'user', input, 'User added', 'User doesnt add');
            }
            else {
                return "This email does exist try other email";
            }
        }),
        UpdatePassword: (obj, { input }, context, info) => __awaiter(this, void 0, void 0, function* () {
        })
    },
    Query: {
        GetMosqueBySearchKeyword: (obj, { query }, context, info) => {
            return retrieve_1.retireve_mosque_by_search_key(context.knex, query);
        },
        GetMosque: (obj, { query }, context, info) => {
            return retrieve_1.retireve_mosque_by_id(context.knex, query);
        },
        GetUserToken: (obj, { userEmail, userPassword }, context, info) => {
            return retrieve_1.get_user_token(context.knex, userEmail, userPassword);
        }
    }
};
