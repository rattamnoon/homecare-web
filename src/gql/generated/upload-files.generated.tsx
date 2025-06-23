import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UploadFileFragment = {
  __typename?: "UploadFile";
  id: string;
  refId?: string | null;
  fileId?: string | null;
  fileType: Types.UploadFileType;
  fileName?: string | null;
  fileFolder?: string | null;
  filePath?: string | null;
  fileBucket?: string | null;
  fileExtension?: string | null;
  fileUrl: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type CreateUploadFileMutationVariables = Types.Exact<{
  createUploadFileInput:
    | Array<Types.CreateUploadFileInput>
    | Types.CreateUploadFileInput;
}>;

export type CreateUploadFileMutation = {
  __typename?: "Mutation";
  createUploadFile: Array<{
    __typename?: "UploadFile";
    id: string;
    refId?: string | null;
    fileId?: string | null;
    fileType: Types.UploadFileType;
    fileName?: string | null;
    fileFolder?: string | null;
    filePath?: string | null;
    fileBucket?: string | null;
    fileExtension?: string | null;
    fileUrl: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }>;
};

export const UploadFileFragmentDoc = gql`
  fragment UploadFile on UploadFile {
    id
    refId
    fileId
    fileType
    fileName
    fileFolder
    filePath
    fileBucket
    fileExtension
    fileUrl
    isPublic
    createdAt
    updatedAt
    deletedAt
  }
`;
export const CreateUploadFileDocument = gql`
  mutation CreateUploadFile($createUploadFileInput: [CreateUploadFileInput!]!) {
    createUploadFile(createUploadFileInput: $createUploadFileInput) {
      ...UploadFile
    }
  }
  ${UploadFileFragmentDoc}
`;
export type CreateUploadFileMutationFn = Apollo.MutationFunction<
  CreateUploadFileMutation,
  CreateUploadFileMutationVariables
>;

/**
 * __useCreateUploadFileMutation__
 *
 * To run a mutation, you first call `useCreateUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadFileMutation, { data, loading, error }] = useCreateUploadFileMutation({
 *   variables: {
 *      createUploadFileInput: // value for 'createUploadFileInput'
 *   },
 * });
 */
export function useCreateUploadFileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUploadFileMutation,
    CreateUploadFileMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUploadFileMutation,
    CreateUploadFileMutationVariables
  >(CreateUploadFileDocument, options);
}
export type CreateUploadFileMutationHookResult = ReturnType<
  typeof useCreateUploadFileMutation
>;
export type CreateUploadFileMutationResult =
  Apollo.MutationResult<CreateUploadFileMutation>;
export type CreateUploadFileMutationOptions = Apollo.BaseMutationOptions<
  CreateUploadFileMutation,
  CreateUploadFileMutationVariables
>;
