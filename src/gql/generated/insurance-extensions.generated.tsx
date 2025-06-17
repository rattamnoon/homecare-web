import * as Types from "./graphql";

import { gql } from "@apollo/client";
import { ProjectFragmentDoc, UnitFragmentDoc } from "./project.generated";
import { UserFragmentDoc } from "./user.generated";
import { UploadFileFragmentDoc } from "./tasks.generated";
import {
  IPaginateMetaFragmentDoc,
  IPaginateLinksFragmentDoc,
} from "./paginate.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type InsuranceExtensionFragment = {
  __typename?: "InsuranceExtension";
  id: string;
  insuranceDateDefault: Date;
  insuranceDateExpand?: Date | null;
  projectId: string;
  unitId: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt?: Date | null;
  project?: {
    __typename?: "Project";
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
  insuranceDateDefault?: Types.InputMaybe<
    Array<Types.Scalars["String"]["input"]> | Types.Scalars["String"]["input"]
  >;
  insuranceDateExpand?: Types.InputMaybe<
    Array<Types.Scalars["String"]["input"]> | Types.Scalars["String"]["input"]
  >;
  limit: Types.Scalars["Int"]["input"];
  page: Types.Scalars["Int"]["input"];
  projectId?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  searchText?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
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
      insuranceDateDefault: Date;
      insuranceDateExpand?: Date | null;
      projectId: string;
      unitId: string;
      updatedAt: Date;
      createdAt: Date;
      deletedAt?: Date | null;
      project?: {
        __typename?: "Project";
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

export const InsuranceExtensionFragmentDoc = gql`
  fragment InsuranceExtension on InsuranceExtension {
    id
    insuranceDateDefault
    insuranceDateExpand
    projectId
    project {
      ...Project
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
    $insuranceDateDefault: [String!]
    $insuranceDateExpand: [String!]
    $limit: Int!
    $page: Int!
    $projectId: String
    $searchText: String
    $unitIds: [String!]
  ) {
    insuranceExtensions(
      insuranceDateDefault: $insuranceDateDefault
      insuranceDateExpand: $insuranceDateExpand
      limit: $limit
      page: $page
      projectId: $projectId
      searchText: $searchText
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
 *      insuranceDateDefault: // value for 'insuranceDateDefault'
 *      insuranceDateExpand: // value for 'insuranceDateExpand'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *      projectId: // value for 'projectId'
 *      searchText: // value for 'searchText'
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
