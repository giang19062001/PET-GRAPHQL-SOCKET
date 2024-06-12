
import { PubSub } from 'graphql-subscriptions';
import userModel from '../models/user.js';
import {  addUser, checkLogin } from '../controller/user.js';
import { addChat } from '../controller/chat.js';
import chatModel from '../models/chat.js';

const pubsub = new PubSub();

export const resolvers = {

    Query: {
        //user
        users: async (parent, args, context) => {
            const users = await userModel.find()
            return users
        },
        //chat
        chats: async (parent, args, context) => {
            const chatSender = await chatModel.find({sender: args.sender, recipient : args.recipient})
            const chatReci = await chatModel.find({sender: args.recipient, recipient : args.sender})
            const chatTotal = [...chatSender, ...chatReci]
            return chatTotal
        }
    },
    Mutation: {
        //user
        addUser: async (parent, args, context) => {
            const result = await addUser(args)
            return result
        },
        checkLogin: async (parent, args, context) => {
            const { email: email, password: password } = args
            const result = await checkLogin(email, password)
            console.log(result)
            return result
        },

    },
    Subscription: {
        notification: {
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
        }
    },
}
