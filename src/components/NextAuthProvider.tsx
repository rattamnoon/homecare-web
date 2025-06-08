'use client';

import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import type { Session } from 'next-auth';

export const NextAuthProvider = ({
  session,
  children,
}: PropsWithChildren<{ session: Session | null }>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
