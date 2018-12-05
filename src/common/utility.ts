import bcrypt from 'bcrypt';

export const generateSalt = async(saltRounds:number)=>{
       return await bcrypt.genSalt(saltRounds);
}

export const generatePassword = async(pass:string,salt:string)=>{
    return await bcrypt.hash(pass,salt);
}


export const comparePassword = async(plainPassword:string,hashedPassword:string)=>{
    return await bcrypt.compare(plainPassword,hashedPassword);
}
