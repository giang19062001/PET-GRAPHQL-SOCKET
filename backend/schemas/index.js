export const typeDefs = `#graphql
type User{
    _id: String,
    name: String,
    email: String,
    phone: String,
    password: String,
    gender: Boolean,
    image: String,
    bod: String,
    address: String,
    accessToken: String
}
type Chat{
    _id: String,
    sender: String,
    recipient: String,
    message: String,
    createdAt: String,
    updatedAt: Boolean,
}
type Query {
    users: [User],
    chats(sender: String!, recipient: String): [Chat],

} 
type Mutation{
  # user
  addUser( name: String!, email: String!, image: String, providerUser: String!, password: String!) : ResultUser,
  checkLogin( email: String!, password: String!): ResultUser
}

type ResultUser {
  result: Int,
  data: User
}
type Subscription {
  notification: String
}
`


// có thể tự định nghĩa type cho graphql giống như type Message
