import { withAuth } from "next-auth/middleware";
import { Routes } from "./config/routes";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: Routes.Login,
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
