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
const utility_1 = require("../common/utility");
function retireve_mosque_by_search(dbConnection, queryParam) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(queryParam);
        const result = yield dbConnection('location')
            .distinct()
            .select('mosque.mosqueName', 'mosque.mosqueId', 'mosque.mosqueDetails')
            .leftJoin('search', 'location.locationId', 'search.locationId')
            .leftJoin('mosque', 'mosque.mosqueId', 'search.mosqueId')
            .where('location.locationName', 'like', queryParam + "%");
        if (result.length == 0) {
            let result = yield dbConnection('search')
                .distinct()
                .select('mosque.mosqueName', 'mosque.mosqueId', 'mosque.mosqueDetails')
                .leftJoin('mosque', 'mosque.mosqueId', 'search.mosqueId')
                .where('search.searchTag', 'like', queryParam + "%");
            console.log(result);
        }
        return "rows";
    });
}
exports.retireve_mosque_by_search = retireve_mosque_by_search;
function retireve_password(dbConnection, currentPlainPassword, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [user] = yield dbConnection('user').select('*').where('userId', userId);
        const result = yield utility_1.comparePassword(currentPlainPassword, user.userPassword);
        return result;
    });
}
exports.retireve_password = retireve_password;
