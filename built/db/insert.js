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
function insert_into_table(dbConnection, tableName, inputParameter, sucessMsg, ErrMsg) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rowCount } = yield dbConnection(tableName).insert(inputParameter);
        if (rowCount > 0) {
            return sucessMsg;
        }
        else {
            return ErrMsg;
        }
    });
}
exports.insert_into_table = insert_into_table;
function insert_into_table_return_id(dbConnection, tableName, inputParameter) {
    return __awaiter(this, void 0, void 0, function* () {
        const [id] = yield dbConnection(tableName).insert(inputParameter).returning("mosqueId");
        return id;
    });
}
exports.insert_into_table_return_id = insert_into_table_return_id;
