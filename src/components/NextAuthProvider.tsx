"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export const NextAuthProvider = ({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
