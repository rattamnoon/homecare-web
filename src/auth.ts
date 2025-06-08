import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { authClient } from "./apolloClient";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  RefreshTokenDocument,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from "./gql/auth.generated";

const requestRefreshOfAccessToken = async (token: JWT) => {
  try {
    const { data } = await authClient.mutate<
      RefreshTokenMutation,
      RefreshTokenMutationVariables
    >({
      mutation: RefreshTokenDocument,
      context: {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      },
    });

    return {
      ...token,
      token: data?.refreshToken?.token ?? token.token,
      refreshToken: data?.refreshToken?.refreshToken ?? token.refreshToken,
      expiresAt: data?.refreshToken?.expiresAt ?? token.expiresAt,
      id: data?.refreshToken?.user.id,
      employeeId: data?.refreshToken?.user.employeeId,
      username: data?.refreshToken?.user.username,
      firstName: data?.refreshToken?.user.firstName,
      lastName: data?.refreshToken?.user.lastName,
      email: data?.refreshToken?.user.email,
    };
  } catch (error) {
    console.error(error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { data } = await authClient.mutate<
            LoginMutation,
            LoginMutationVariables
          >({
            mutation: LoginDocument,
            variables: {
              username: credentials?.username ?? "",
              password: credentials?.password ?? "",
            },
          });

          if (!data?.login) {
            throw new Error("Username or password is incorrect");
          }

          return {
            token: data.login.token,
            refreshToken: data.login.refreshToken,
            expiresAt: data.login.expiresAt,
            id: data.login.user.id,
            employeeId: data.login.user.employeeId,
            username: data.login.user.username,
            firstName: data.login.user.firstName ?? null,
            lastName: data.login.user.lastName ?? null,
            email: data.login.user.email,
          };
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Server error, please try again later");
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.token = token.token;
      session.refreshToken = token.refreshToken;
      session.user.id = token.id ?? "";
      session.user.employeeId = token.employeeId ?? "";
      session.user.username = token.username ?? "";
      session.user.firstName = token.firstName ?? "";
      session.user.lastName = token.lastName ?? "";
      session.user.email = token.email ?? "";
      session.error = token.error as "RefreshAccessTokenError";

      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.token = user.token;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
        token.id = user.id;
        token.employeeId = user.employeeId;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;

        return token;
      }

      if (Date.now() < token.expiresAt) {
        return token;
      }

      try {
        return requestRefreshOfAccessToken(token);
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
