
import userModel from '../models/user.js';
import { generateToken, hashPassword, comparePassword } from '../service/auth.js';
    
export async function addUser(args) {
    const user = await userModel.findOne({email: args.email})
    if(user){
        return {
            result : 0,
            data : user
        }
    }else{
        const password = await hashPassword(args.password)
        const accessToken = generateToken(args)
        const newUser = new userModel({ ...args, password: password, accessToken: accessToken, phone: ""})
        await newUser.save()
        return  {
            result : 1,
            data : newUser
        }
    }
}

export async function checkLogin(email, password) {
    const user = await userModel.findOne({email: email})
    if(user){
        const checkPass = await comparePassword(password, user.password)
        if(checkPass){
            return {
                result : 1,
                data : user
            }
        }else{
            return {
                result : -2,
                data : null
            }
        }
    }else{
        return {
            result : -1,
            data : null
        }
    }
}


