import * as Types from "./graphql";

import { gql } from "@apollo/client";
import { ProjectFragmentDoc, UnitFragmentDoc } from "./project.generated";
import { UserFragmentDoc } from "./user.generated";
import { UploadFileFragmentDoc } from "./upload-files.generated";
import {
  IPaginateMetaFragmentDoc,
  IPaginateLinksFragmentDoc,
} from "./paginate.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type InsuranceExtensionFragment = {
  __typename?: "InsuranceExtension";
  id: string;
  insuranceDateDefault?: Date | null;
  insuranceDateExpand?: Date | null;
  projectId: string;
  transferDate?: Date | null;
  unitId: string;
  updatedAt?: Date | null;
  createdAt?: Date | null;
  deletedAt?: Date | null;
  project?: {
    __typename?: "Project";
    a10Date?: Date | null;
    insuranceDate?: Date | null;
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  unit?: {
    __typename?: "Unit";
    id: string;
    projectId: string;
    unitNumber?: string | null;
    houseNumber?: string | null;
  } | null;
  createdBy?: {
    __typename?: "User";
    id: string;
    employeeId: string;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  } | null;
  updatedBy?: {
    __typename?: "User";
    id: string;
    employeeId: string;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  } | null;
  files: Array<{
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

export type InsuranceExtensionsQueryVariables = Types.Exact<{
  limit: Types.Scalars["Int"]["input"];
  page: Types.Scalars["Int"]["input"];
  projectId?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  unitIds?: Types.InputMaybe<
    Array<Types.Scalars["String"]["input"]> | Types.Scalars["String"]["input"]
  >;
}>;

export type InsuranceExtensionsQuery = {
  __typename?: "Query";
  insuranceExtensions: {
    __typename?: "InsuranceExtensionPaginate";
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
      __typename?: "InsuranceExtension";
      id: string;
      insuranceDateDefault?: Date | null;
      insuranceDateExpand?: Date | null;
      projectId: string;
      transferDate?: Date | null;
      unitId: string;
      updatedAt?: Date | null;
      createdAt?: Date | null;
      deletedAt?: Date | null;
      project?: {
        __typename?: "Project";
        a10Date?: Date | null;
        insuranceDate?: Date | null;
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      unit?: {
        __typename?: "Unit";
        id: string;
        projectId: string;
        unitNumber?: string | null;
        houseNumber?: string | null;
      } | null;
      createdBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        username: string;
        firstName?: string | null;
        lastName?: string | null;
        email: string;
        lastLoginAt: Date;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
      } | null;
      updatedBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        username: string;
        firstName?: string | null;
        lastName?: string | null;
        email: string;
        lastLoginAt: Date;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
      } | null;
      files: Array<{
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
    }>;
  };
};

export type CreateOrUpdateInsuranceExtensionMutationVariables = Types.Exact<{
  createUploadFileInput:
    | Array<Types.CreateUploadFileInput>
    | Types.CreateUploadFileInput;
  updateInsuranceExtensionInput: Types.UpdateInsuranceExtensionInput;
}>;

export type CreateOrUpdateInsuranceExtensionMutation = {
  __typename?: "Mutation";
  createOrUpdateInsuranceExtension: {
    __typename?: "InsuranceExtension";
    id: string;
    insuranceDateDefault?: Date | null;
    insuranceDateExpand?: Date | null;
    projectId: string;
    transferDate?: Date | null;
    unitId: string;
    updatedAt?: Date | null;
    createdAt?: Date | null;
    deletedAt?: Date | null;
    project?: {
      __typename?: "Project";
      a10Date?: Date | null;
      insuranceDate?: Date | null;
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    unit?: {
      __typename?: "Unit";
      id: string;
      projectId: string;
      unitNumber?: string | null;
      houseNumber?: string | null;
    } | null;
    createdBy?: {
      __typename?: "User";
      id: string;
      employeeId: string;
      username: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      lastLoginAt: Date;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    } | null;
    updatedBy?: {
      __typename?: "User";
      id: string;
      employeeId: string;
      username: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      lastLoginAt: Date;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    } | null;
    files: Array<{
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
};

export type BulkCreateOrUpdateInsuranceExtensionMutationVariables =
  Types.Exact<{
    insuranceDate: Types.Scalars["Date"]["input"];
    projectId: Types.Scalars["ID"]["input"];
  }>;

export type BulkCreateOrUpdateInsuranceExtensionMutation = {
  __typename?: "Mutation";
  bulkCreateOrUpdateInsuranceExtension: Array<{
    __typename?: "InsuranceExtension";
    id: string;
    insuranceDateDefault?: Date | null;
    insuranceDateExpand?: Date | null;
    projectId: string;
    transferDate?: Date | null;
    unitId: string;
    updatedAt?: Date | null;
    createdAt?: Date | null;
    deletedAt?: Date | null;
    project?: {
      __typename?: "Project";
      a10Date?: Date | null;
      insuranceDate?: Date | null;
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    unit?: {
      __typename?: "Unit";
      id: string;
      projectId: string;
      unitNumber?: string | null;
      houseNumber?: string | null;
    } | null;
    createdBy?: {
      __typename?: "User";
      id: string;
      employeeId: string;
      username: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      lastLoginAt: Date;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    } | null;
    updatedBy?: {
      __typename?: "User";
      id: string;
      employeeId: string;
      username: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      lastLoginAt: Date;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    } | null;
    files: Array<{
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
  }>;
};

export const InsuranceExtensionFragmentDoc = gql`
  fragment InsuranceExtension on InsuranceExtension {
    id
    insuranceDateDefault
    insuranceDateExpand
    projectId
    transferDate
    project {
      ...Project
      a10Date
      insuranceDate
    }
    unitId
    unit {
      ...Unit
    }
    createdBy {
      ...User
    }
    updatedBy {
      ...User
    }
    updatedAt
    createdAt
    deletedAt
    files {
      ...UploadFile
    }
  }
  ${ProjectFragmentDoc}
  ${UnitFragmentDoc}
  ${UserFragmentDoc}
  ${UploadFileFragmentDoc}
`;
export const InsuranceExtensionsDocument = gql`
  query InsuranceExtensions(
    $limit: Int!
    $page: Int!
    $projectId: String
    $unitIds: [String!]
  ) {
    insuranceExtensions(
      limit: $limit
      page: $page
      projectId: $projectId
      unitIds: $unitIds
    ) {
      meta {
        ...IPaginateMeta
      }
      links {
        ...IPaginateLinks
      }
      items {
        ...InsuranceExtension
      }
    }
  }
  ${IPaginateMetaFragmentDoc}
  ${IPaginateLinksFragmentDoc}
  ${InsuranceExtensionFragmentDoc}
`;

/**
 * __useInsuranceExtensionsQuery__
 *
 * To run a query within a React component, call `useInsuranceExtensionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInsuranceExtensionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInsuranceExtensionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *      projectId: // value for 'projectId'
 *      unitIds: // value for 'unitIds'
 *   },
 * });
 */
export function useInsuranceExtensionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    InsuranceExtensionsQuery,
    InsuranceExtensionsQueryVariables
  > &
    (
      | { variables: InsuranceExtensionsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    InsuranceExtensionsQuery,
    InsuranceExtensionsQueryVariables
  >(InsuranceExtensionsDocument, options);
}
export function useInsuranceExtensionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    InsuranceExtensionsQuery,
    InsuranceExtensionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    InsuranceExtensionsQuery,
    InsuranceExtensionsQueryVariables
  >(InsuranceExtensionsDocument, options);
}
export function useInsuranceExtensionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        InsuranceExtensionsQuery,
        InsuranceExtensionsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    InsuranceExtensionsQuery,
    InsuranceExtensionsQueryVariables
  >(InsuranceExtensionsDocument, options);
}
export type InsuranceExtensionsQueryHookResult = ReturnType<
  typeof useInsuranceExtensionsQuery
>;
export type InsuranceExtensionsLazyQueryHookResult = ReturnType<
  typeof useInsuranceExtensionsLazyQuery
>;
export type InsuranceExtensionsSuspenseQueryHookResult = ReturnType<
  typeof useInsuranceExtensionsSuspenseQuery
>;
export type InsuranceExtensionsQueryResult = Apollo.QueryResult<
  InsuranceExtensionsQuery,
  InsuranceExtensionsQueryVariables
>;
export const CreateOrUpdateInsuranceExtensionDocument = gql`
  mutation CreateOrUpdateInsuranceExtension(
    $createUploadFileInput: [CreateUploadFileInput!]!
    $updateInsuranceExtensionInput: UpdateInsuranceExtensionInput!
  ) {
    createOrUpdateInsuranceExtension(
      createUploadFileInput: $createUploadFileInput
      updateInsuranceExtensionInput: $updateInsuranceExtensionInput
    ) {
      ...InsuranceExtension
    }
  }
  ${InsuranceExtensionFragmentDoc}
`;
export type CreateOrUpdateInsuranceExtensionMutationFn =
  Apollo.MutationFunction<
    CreateOrUpdateInsuranceExtensionMutation,
    CreateOrUpdateInsuranceExtensionMutationVariables
  >;

/**
 * __useCreateOrUpdateInsuranceExtensionMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateInsuranceExtensionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateInsuranceExtensionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateInsuranceExtensionMutation, { data, loading, error }] = useCreateOrUpdateInsuranceExtensionMutation({
 *   variables: {
 *      createUploadFileInput: // value for 'createUploadFileInput'
 *      updateInsuranceExtensionInput: // value for 'updateInsuranceExtensionInput'
 *   },
 * });
 */
export function useCreateOrUpdateInsuranceExtensionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateInsuranceExtensionMutation,
    CreateOrUpdateInsuranceExtensionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOrUpdateInsuranceExtensionMutation,
    CreateOrUpdateInsuranceExtensionMutationVariables
  >(CreateOrUpdateInsuranceExtensionDocument, options);
}
export type CreateOrUpdateInsuranceExtensionMutationHookResult = ReturnType<
  typeof useCreateOrUpdateInsuranceExtensionMutation
>;
export type CreateOrUpdateInsuranceExtensionMutationResult =
  Apollo.MutationResult<CreateOrUpdateInsuranceExtensionMutation>;
export type CreateOrUpdateInsuranceExtensionMutationOptions =
  Apollo.BaseMutationOptions<
    CreateOrUpdateInsuranceExtensionMutation,
    CreateOrUpdateInsuranceExtensionMutationVariables
  >;
export const BulkCreateOrUpdateInsuranceExtensionDocument = gql`
  mutation BulkCreateOrUpdateInsuranceExtension(
    $insuranceDate: Date!
    $projectId: ID!
  ) {
    bulkCreateOrUpdateInsuranceExtension(
      insuranceDate: $insuranceDate
      projectId: $projectId
    ) {
      ...InsuranceExtension
    }
  }
  ${InsuranceExtensionFragmentDoc}
`;
export type BulkCreateOrUpdateInsuranceExtensionMutationFn =
  Apollo.MutationFunction<
    BulkCreateOrUpdateInsuranceExtensionMutation,
    BulkCreateOrUpdateInsuranceExtensionMutationVariables
  >;

/**
 * __useBulkCreateOrUpdateInsuranceExtensionMutation__
 *
 * To run a mutation, you first call `useBulkCreateOrUpdateInsuranceExtensionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkCreateOrUpdateInsuranceExtensionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkCreateOrUpdateInsuranceExtensionMutation, { data, loading, error }] = useBulkCreateOrUpdateInsuranceExtensionMutation({
 *   variables: {
 *      insuranceDate: // value for 'insuranceDate'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useBulkCreateOrUpdateInsuranceExtensionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BulkCreateOrUpdateInsuranceExtensionMutation,
    BulkCreateOrUpdateInsuranceExtensionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    BulkCreateOrUpdateInsuranceExtensionMutation,
    BulkCreateOrUpdateInsuranceExtensionMutationVariables
  >(BulkCreateOrUpdateInsuranceExtensionDocument, options);
}
export type BulkCreateOrUpdateInsuranceExtensionMutationHookResult = ReturnType<
  typeof useBulkCreateOrUpdateInsuranceExtensionMutation
>;
export type BulkCreateOrUpdateInsuranceExtensionMutationResult =
  Apollo.MutationResult<BulkCreateOrUpdateInsuranceExtensionMutation>;
export type BulkCreateOrUpdateInsuranceExtensionMutationOptions =
  Apollo.BaseMutationOptions<
    BulkCreateOrUpdateInsuranceExtensionMutation,
    BulkCreateOrUpdateInsuranceExtensionMutationVariables
  >;
