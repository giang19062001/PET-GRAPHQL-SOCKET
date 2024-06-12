import {  gql } from '@apollo/client';
export const GET_CHATS = gql`
query Chats($sender: String!, $recipient: String) {
  chats(sender: $sender, recipient: $recipient) {
    sender
    recipient
    message
    createdAt
    _id
  }
}
`;

