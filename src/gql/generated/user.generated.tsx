import * as Types from "./graphql";

import { gql } from "@apollo/client";
import {
  IPaginateMetaFragmentDoc,
  IPaginateLinksFragmentDoc,
} from "./paginate.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UserFragment = {
  __typename?: "User";
  id: string;
  employeeId: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  lastLoginAt: any;
  status: string;
  createdAt: any;
  updatedAt: any;
  deletedAt?: any | null;
};

export type UsersQueryVariables = Types.Exact<{
  page: Types.Scalars["Int"]["input"];
  limit: Types.Scalars["Int"]["input"];
  searchText?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type UsersQuery = {
  __typename?: "Query";
  users: {
    __typename?: "UserPaginate";
    meta?: {
      __typename?: "IPaginateMeta";
      totalItems?: number | null;
      itemCount: number;
      itemsPerPage: number;
      totalPages?: number | null;
      currentPage: number;
    } | null;
    links?: {
      __typename?: "IPaginateLinks";
      first?: string | null;
      previous?: string | null;
      next?: string | null;
      last?: string | null;
    } | null;
    items: Array<{
      __typename?: "User";
      id: string;
      employeeId: string;
      username: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      lastLoginAt: any;
      status: string;
      createdAt: any;
      updatedAt: any;
      deletedAt?: any | null;
    }>;
  };
};

export const UserFragmentDoc = gql`
  fragment User on User {
    id
    employeeId
    username
    firstName
    lastName
    email
    lastLoginAt
    status
    createdAt
    updatedAt
    deletedAt
  }
`;
export const UsersDocument = gql`
  query Users($page: Int!, $limit: Int!, $searchText: String) {
    users(page: $page, limit: $limit, searchText: $searchText) {
      meta {
        ...IPaginateMeta
      }
      links {
        ...IPaginateLinks
      }
      items {
        ...User
      }
    }
  }
  ${IPaginateMetaFragmentDoc}
  ${IPaginateLinksFragmentDoc}
  ${UserFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables> &
    ({ variables: UsersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<
  typeof useUsersSuspenseQuery
>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
