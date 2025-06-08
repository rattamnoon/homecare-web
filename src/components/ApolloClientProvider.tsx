"use client";

import { makeClient } from "@/apolloClient";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { PropsWithChildren } from "react";

export const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
