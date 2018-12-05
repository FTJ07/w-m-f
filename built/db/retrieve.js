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
const utility_1 = require("../common/utility");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function retireve_mosque_by_search_key(dbConnection, queryParam) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(queryParam);
        let result = yield dbConnection('location')
            .distinct()
            .select('mosque.mosqueName', 'mosque.mosqueId', 'mosque.mosqueDetails')
            .leftJoin('search', 'location.locationId', 'search.locationId')
            .leftJoin('mosque', 'mosque.mosqueId', 'search.mosqueId')
            .where('location.locationName', 'like', queryParam + "%");
        if (result.length == 0) {
            result = yield dbConnection('search')
                .distinct()
                .select('mosque.mosqueName', 'mosque.mosqueId', 'mosque.mosqueDetails')
                .leftJoin('mosque', 'mosque.mosqueId', 'search.mosqueId')
                .where('search.searchTag', 'like', queryParam + "%");
        }
        console.log(result);
        return result;
    });
}
exports.retireve_mosque_by_search_key = retireve_mosque_by_search_key;
function retireve_mosque_by_id(dbConnection, queryParam) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(queryParam);
        let [result] = yield dbConnection('mosque')
            .select('mosque.mosqueName', 'mosque.mosqueId', 'mosque.mosqueDetails')
            .where('mosque.mosqueId', queryParam);
        return result;
    });
}
exports.retireve_mosque_by_id = retireve_mosque_by_id;
function retireve_password(dbConnection, currentPlainPassword, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [user] = yield dbConnection('user').select('*').where('userId', userId);
        const result = yield utility_1.comparePassword(currentPlainPassword, user.userPassword);
        return result;
    });
}
exports.retireve_password = retireve_password;
function get_user_token(dbConnection, userEmail, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const [user] = yield dbConnection('user').select('*').where('userEmail', userEmail);
        if (user == undefined || user == null) {
            return "Email is not found";
        }
        const isValidCustomer = yield retireve_password(dbConnection, userPassword, user.userId);
        if (isValidCustomer) {
            return jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 1800 });
        }
        return "Doesn't match with password";
    });
}
exports.get_user_token = get_user_token;
