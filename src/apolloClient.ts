import {
  ApolloLink,
  FetchResult,
  HttpLink,
  Observable,
  from,
  split,
} from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/client-integration-nextjs";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import dayjs from "dayjs";
import { createClient } from "graphql-ws";
import { JWT } from "next-auth/jwt";
import { getSession, signOut } from "next-auth/react";
import { RefreshTokenDocument } from "./gql/generated/auth.generated";

const isServer = typeof window === "undefined";

export const authClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

const refreshToken = async (token: JWT) => {
  if (token.expiresAt && token.refreshToken) {
    const expiresAt = dayjs.unix(token.expiresAt);
    if (expiresAt.isBefore(dayjs())) {
      const { data } = await authClient.mutate({
        mutation: RefreshTokenDocument,
        context: {
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
          },
        },
      });

      return data.refreshToken;
    }
  }
  return null;
};

const refreshMiddleware = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      const notAuth = graphQLErrors.some(
        ({ message }) => message === "Unauthorized"
      );

      if (!isServer && notAuth) {
        return new Observable<FetchResult<Record<string, unknown>>>(
          (observer) => {
            (async () => {
              try {
                const session = await getSession();
                if (!session || session.error === "RefreshAccessTokenError") {
                  await signOut();
                }

                const newToken = await refreshToken({
                  token: session!.token,
                  expiresAt: session!.expiresAt,
                  refreshToken: session!.refreshToken,
                });

                if (!newToken || newToken.error === "RefreshAccessTokenError") {
                  await signOut();
                  observer.error(new Error("Unauthorized"));
                  return;
                }

                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${newToken.accessToken}`,
                  },
                }));

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                forward(operation).subscribe(subscriber);
              } catch (err) {
                signOut();
                observer.error(err);
              }
            })();
          }
        );
      }
      graphQLErrors?.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, isServer: ${isServer}`
        );
      });

      return forward(operation).map((response) => {
        if (notAuth) response.errors = [];
        return response;
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
);

const authMiddleware = setContext(async (request, previousContext) => {
  const { headers } = previousContext;
  const session = await getSession();
  const token = session?.token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

export const makeClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    from([authMiddleware, refreshMiddleware, httpLink])
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: isServer
      ? ApolloLink.from([
          new SSRMultipartLink({ stripDefer: true }),
          from([authMiddleware, refreshMiddleware, httpLink]),
        ])
      : splitLink,
  });
};
