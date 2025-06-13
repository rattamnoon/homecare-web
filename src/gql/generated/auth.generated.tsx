import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AuthFragment = {
  __typename?: "Auth";
  token: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    __typename?: "User";
    id: string;
    employeeId: string;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    lastLoginAt: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  };
};

export type LoginMutationVariables = Types.Exact<{
  username: Types.Scalars["String"]["input"];
  password: Types.Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "Auth";
    token: string;
    refreshToken: string;
    expiresAt: number;
    user: {
      __typename?: "User";
      id: string;
      employeeId: string;
      username: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      lastLoginAt: Date;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    };
  };
};

export type RefreshTokenMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken?: {
    __typename?: "Auth";
    token: string;
    refreshToken: string;
    expiresAt: number;
    user: {
      __typename?: "User";
      id: string;
      employeeId: string;
      username: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      lastLoginAt: Date;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    };
  } | null;
};

export const AuthFragmentDoc = gql`
  fragment Auth on Auth {
    token
    refreshToken
    expiresAt
    user {
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
  }
`;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...Auth
    }
  }
  ${AuthFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken {
      ...Auth
    }
  }
  ${AuthFragmentDoc}
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
