import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    gender:{
        type: Boolean
    },
    avatar:{
        type: String,
        default: ""
    },
    bod:{
        type: Date
    },
    address:{
        type: String
    },
    providerUser: {
        type: String,
    },
    accessToken :{
        type: String
    }
},
{ timestamps: true })

const userModel = mongoose.model('User', userSchema);
export default userModel