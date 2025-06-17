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

export type CallingsQueryVariables = Types.Exact<{
  taskDetailId?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

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

export type CreateCallingMutationVariables = Types.Exact<{
  createCallingInput: Types.CreateCallingInput;
}>;

export type CreateCallingMutation = {
  __typename?: "Mutation";
  createCalling: {
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
  query Callings($taskDetailId: String) {
    callings(taskDetailId: $taskDetailId) {
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
 *      taskDetailId: // value for 'taskDetailId'
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
export const CreateCallingDocument = gql`
  mutation CreateCalling($createCallingInput: CreateCallingInput!) {
    createCalling(createCallingInput: $createCallingInput) {
      ...Calling
    }
  }
  ${CallingFragmentDoc}
`;
export type CreateCallingMutationFn = Apollo.MutationFunction<
  CreateCallingMutation,
  CreateCallingMutationVariables
>;

/**
 * __useCreateCallingMutation__
 *
 * To run a mutation, you first call `useCreateCallingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCallingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCallingMutation, { data, loading, error }] = useCreateCallingMutation({
 *   variables: {
 *      createCallingInput: // value for 'createCallingInput'
 *   },
 * });
 */
export function useCreateCallingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCallingMutation,
    CreateCallingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCallingMutation,
    CreateCallingMutationVariables
  >(CreateCallingDocument, options);
}
export type CreateCallingMutationHookResult = ReturnType<
  typeof useCreateCallingMutation
>;
export type CreateCallingMutationResult =
  Apollo.MutationResult<CreateCallingMutation>;
export type CreateCallingMutationOptions = Apollo.BaseMutationOptions<
  CreateCallingMutation,
  CreateCallingMutationVariables
>;
