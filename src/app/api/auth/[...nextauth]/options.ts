import User from "@/models/userSchema";
import { connect } from "@/utils/connectDB";
import { NextAuthOptions } from "next-auth";
import bcryptjs from "bcryptjs";
import CredentialsProviders from "next-auth/providers/credentials";

async function login(credentials: any) {
  try {
    connect();
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error("No user found");
    }

    // If the password is correct return the user object, otherwise throw an error
    const validatePassword = await bcryptjs.compare(
      credentials.password,
      user.password
    );
    if (!validatePassword) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    console.log("Error in auth", error);
    throw new Error("Something went twrong");
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProviders({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email address",
          required: true,
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("credentials", { credentials });
          const data = await login(credentials);
          return data;
        } catch (error) {
          console.log(error, "Error in next auth");
          throw new Error("Failed to authenticate");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user._id;
      }
      console.log('token=>>>>', token)
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log('session=>>>>>', session)
      return session;
    },
  },
};
