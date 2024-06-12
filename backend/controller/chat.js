import chatModel from "../models/chat.js"
export async function addChat(data) {
    const newChat = new chatModel(data)
    await newChat.save()
    return true
}

