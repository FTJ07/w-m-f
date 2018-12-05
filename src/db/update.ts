async function  update_password(dbConnection:any,tableName:string,inputParameter:any){
    const [id] = await dbConnection(tableName).insert(inputParameter).returning("mosqueId");
   return id;
}
