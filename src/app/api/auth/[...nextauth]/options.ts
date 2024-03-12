import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProviders from "next-auth/providers/credentials";

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
        // You can define what to do when a user logs in with their username and password.
        const data = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (!data.ok) throw new Error("Could not authenticate");
        return data.json();
      },
    }),
  ],
};
