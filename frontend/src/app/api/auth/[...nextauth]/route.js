const { default: NextAuth } = require("next-auth/next");
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ADD_USERS, CHECK_LOGIN } from "@/app/graphql/user";
import { getClient } from "@/app/apollo/client";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GG_CLIENT_ID,
      clientSecret:  process.env.NEXTAUTH_GG_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
          const client = getClient();
          const response  = await client.mutate({
            mutation: CHECK_LOGIN,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          })
          const res = response.data.checkLogin;
          console.log('CHECK_LOGIN', res)
          if (res.result == 1) {
            return res.data
          } else {
            throw new Error(res.result);
          }  
      },
    }),
  ],
  pages: {
    signIn: '/pages/login',
  },
  callbacks: {
    async signIn(user) {
      if(user.account.provider == 'google'){
        const client = getClient();
        await client.mutate({
          mutation: ADD_USERS,
          variables: {
            name: user.user.name,
            email: user.user.email,
            image: user.user.image,
            providerUser:"google",
            password: "",
          },
        })
        return true;
      }else if(user.account.provider == 'credentials'){
        return true
      }
    },
    async jwt({ token, account }) {
      console.log('jwt token', token)
      console.log('jwt account ', account )
      if (account ) {
        token.accessToken = account .accessToken ?? token.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('session session', session)
      console.log('session token', token)

      session.accessToken  = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
