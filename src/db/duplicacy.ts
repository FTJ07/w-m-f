export async function  check_duplicate_exist(
    dbConnection:any,
    tableName:string,
    selectedColumn:string,
    checkColumn:any,
    checkValue:any
     ){
    let isExist = false;     
    const [result] = await dbConnection(tableName).select(selectedColumn).where(checkColumn,checkValue);
    if(result != undefined)
    isExist = true;
    return isExist;
}
