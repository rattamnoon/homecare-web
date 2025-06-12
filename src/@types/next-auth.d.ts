import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: string;
    refreshToken: string;
    expiresAt: number;
    id: string;
    employeeId: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  }
  interface Session {
    token: string;
    refreshToken: string;
    expiresAt: number;
    error?: string | null;
    user: {
      id: string;
      employeeId: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    refreshToken: string;
    id?: string;
    employeeId?: string;
    username?: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string;
    error?: string | null;
    expiresAt: number;
  }
}
