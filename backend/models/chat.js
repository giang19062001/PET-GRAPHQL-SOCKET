import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema({
    sender:{
        type: String
    },
    recipient:{
        type: String
    },
    message:{
        type: String
    }
},
{ timestamps: true })

const chatModel = mongoose.model('Chat', chatSchema);
export default chatModel