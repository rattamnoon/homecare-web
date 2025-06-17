import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CallingFragment = {
  __typename?: "Calling";
  id: string;
  taskDetailId: string;
  callDate: Date;
  callOrder: number;
  callComment?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  taskDetail?: { __typename?: "TaskDetail"; id: string; code: string } | null;
};

export type CallingsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CallingsQuery = {
  __typename?: "Query";
  callings: Array<{
    __typename?: "Calling";
    id: string;
    taskDetailId: string;
    callDate: Date;
    callOrder: number;
    callComment?: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    taskDetail?: { __typename?: "TaskDetail"; id: string; code: string } | null;
  }>;
};

export const CallingFragmentDoc = gql`
  fragment Calling on Calling {
    id
    taskDetailId
    taskDetail {
      id
      code
    }
    callDate
    callOrder
    callComment
    createdAt
    updatedAt
    deletedAt
  }
`;
export const CallingsDocument = gql`
  query Callings {
    callings {
      ...Calling
    }
  }
  ${CallingFragmentDoc}
`;

/**
 * __useCallingsQuery__
 *
 * To run a query within a React component, call `useCallingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCallingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCallingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCallingsQuery(
  baseOptions?: Apollo.QueryHookOptions<CallingsQuery, CallingsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CallingsQuery, CallingsQueryVariables>(
    CallingsDocument,
    options,
  );
}
export function useCallingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CallingsQuery,
    CallingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CallingsQuery, CallingsQueryVariables>(
    CallingsDocument,
    options,
  );
}
export function useCallingsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<CallingsQuery, CallingsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CallingsQuery, CallingsQueryVariables>(
    CallingsDocument,
    options,
  );
}
export type CallingsQueryHookResult = ReturnType<typeof useCallingsQuery>;
export type CallingsLazyQueryHookResult = ReturnType<
  typeof useCallingsLazyQuery
>;
export type CallingsSuspenseQueryHookResult = ReturnType<
  typeof useCallingsSuspenseQuery
>;
export type CallingsQueryResult = Apollo.QueryResult<
  CallingsQuery,
  CallingsQueryVariables
>;
