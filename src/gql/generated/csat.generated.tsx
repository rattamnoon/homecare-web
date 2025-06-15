import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CsatFragment = {
  __typename?: "Csat";
  id: string;
  taskId: string;
  taskDetailId: string;
  questionId: string;
  score: number;
  comment?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type CreateCsatMutationVariables = Types.Exact<{
  createCsatInput: Array<Types.CreateCsatInput> | Types.CreateCsatInput;
  taskDetailId: Types.Scalars["ID"]["input"];
  csatComment?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type CreateCsatMutation = {
  __typename?: "Mutation";
  createCsat: Array<{
    __typename?: "Csat";
    id: string;
    taskId: string;
    taskDetailId: string;
    questionId: string;
    score: number;
    comment?: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }>;
};

export const CsatFragmentDoc = gql`
  fragment Csat on Csat {
    id
    taskId
    taskDetailId
    questionId
    score
    comment
    createdAt
    updatedAt
    deletedAt
  }
`;
export const CreateCsatDocument = gql`
  mutation CreateCsat(
    $createCsatInput: [CreateCsatInput!]!
    $taskDetailId: ID!
    $csatComment: String
  ) {
    createCsat(
      createCsatInput: $createCsatInput
      taskDetailId: $taskDetailId
      CSATComment: $csatComment
    ) {
      ...Csat
    }
  }
  ${CsatFragmentDoc}
`;
export type CreateCsatMutationFn = Apollo.MutationFunction<
  CreateCsatMutation,
  CreateCsatMutationVariables
>;

/**
 * __useCreateCsatMutation__
 *
 * To run a mutation, you first call `useCreateCsatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCsatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCsatMutation, { data, loading, error }] = useCreateCsatMutation({
 *   variables: {
 *      createCsatInput: // value for 'createCsatInput'
 *      taskDetailId: // value for 'taskDetailId'
 *      csatComment: // value for 'csatComment'
 *   },
 * });
 */
export function useCreateCsatMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCsatMutation,
    CreateCsatMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCsatMutation, CreateCsatMutationVariables>(
    CreateCsatDocument,
    options,
  );
}
export type CreateCsatMutationHookResult = ReturnType<
  typeof useCreateCsatMutation
>;
export type CreateCsatMutationResult =
  Apollo.MutationResult<CreateCsatMutation>;
export type CreateCsatMutationOptions = Apollo.BaseMutationOptions<
  CreateCsatMutation,
  CreateCsatMutationVariables
>;
