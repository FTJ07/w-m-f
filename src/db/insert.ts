async function  insert_into_table(
    dbConnection:any,
    tableName:string,
    inputParameter:any,
    sucessMsg:string,
    ErrMsg:string){
    const {rowCount} = await dbConnection(tableName).insert(inputParameter);
    if (rowCount>0){
        return sucessMsg;
    }
    
    else{
        return ErrMsg;
    }  
}


async function  insert_into_table_return_id(dbConnection:any,tableName:string,inputParameter:any){
    const [id] = await dbConnection(tableName).insert(inputParameter).returning("mosqueId");
   return id;
}


export {insert_into_table,insert_into_table_return_id}