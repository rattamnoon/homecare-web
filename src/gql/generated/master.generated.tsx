import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type MasterFragment = {
  __typename?: "Master";
  id: string;
  parentId?: string | null;
  type: Types.MasterType;
  sequence?: number | null;
  nameTh?: string | null;
  nameEn?: string | null;
  maxScore?: string | null;
  defaultScore?: string | null;
  areaTypeTh?: string | null;
  areaTypeEn?: string | null;
  SLA1H?: number | null;
  SLA1D?: number | null;
  SLA2H?: number | null;
  SLA2D?: number | null;
  SLA3H?: number | null;
  SLA3D?: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type MastersQueryVariables = Types.Exact<{
  types: Array<Types.MasterType> | Types.MasterType;
  searchText?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type MastersQuery = {
  __typename?: "Query";
  masters: Array<{
    __typename?: "Master";
    id: string;
    parentId?: string | null;
    type: Types.MasterType;
    sequence?: number | null;
    nameTh?: string | null;
    nameEn?: string | null;
    maxScore?: string | null;
    defaultScore?: string | null;
    areaTypeTh?: string | null;
    areaTypeEn?: string | null;
    SLA1H?: number | null;
    SLA1D?: number | null;
    SLA2H?: number | null;
    SLA2D?: number | null;
    SLA3H?: number | null;
    SLA3D?: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    children: Array<{
      __typename?: "Master";
      id: string;
      parentId?: string | null;
      type: Types.MasterType;
      sequence?: number | null;
      nameTh?: string | null;
      nameEn?: string | null;
      maxScore?: string | null;
      defaultScore?: string | null;
      areaTypeTh?: string | null;
      areaTypeEn?: string | null;
      SLA1H?: number | null;
      SLA1D?: number | null;
      SLA2H?: number | null;
      SLA2D?: number | null;
      SLA3H?: number | null;
      SLA3D?: number | null;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
    }>;
  }>;
};

export const MasterFragmentDoc = gql`
  fragment Master on Master {
    id
    parentId
    type
    sequence
    nameTh
    nameEn
    maxScore
    defaultScore
    areaTypeTh
    areaTypeEn
    SLA1H
    SLA1D
    SLA2H
    SLA2D
    SLA3H
    SLA3D
    createdAt
    updatedAt
    deletedAt
  }
`;
export const MastersDocument = gql`
  query Masters($types: [MasterType!]!, $searchText: String) {
    masters(types: $types, searchText: $searchText) {
      ...Master
      children {
        ...Master
      }
    }
  }
  ${MasterFragmentDoc}
`;

/**
 * __useMastersQuery__
 *
 * To run a query within a React component, call `useMastersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMastersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMastersQuery({
 *   variables: {
 *      types: // value for 'types'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useMastersQuery(
  baseOptions: Apollo.QueryHookOptions<MastersQuery, MastersQueryVariables> &
    ({ variables: MastersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MastersQuery, MastersQueryVariables>(
    MastersDocument,
    options,
  );
}
export function useMastersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MastersQuery,
    MastersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MastersQuery, MastersQueryVariables>(
    MastersDocument,
    options,
  );
}
export function useMastersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<MastersQuery, MastersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MastersQuery, MastersQueryVariables>(
    MastersDocument,
    options,
  );
}
export type MastersQueryHookResult = ReturnType<typeof useMastersQuery>;
export type MastersLazyQueryHookResult = ReturnType<typeof useMastersLazyQuery>;
export type MastersSuspenseQueryHookResult = ReturnType<
  typeof useMastersSuspenseQuery
>;
export type MastersQueryResult = Apollo.QueryResult<
  MastersQuery,
  MastersQueryVariables
>;
