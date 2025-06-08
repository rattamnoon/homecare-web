import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UnitFragment = {
  __typename?: "Unit";
  id: string;
  projectId: string;
  unitNumber?: string | null;
  houseNumber?: string | null;
};

export type ProjectFragment = {
  __typename?: "Project";
  id: string;
  nameTh: string;
  nameEn: string;
  units: Array<{
    __typename?: "Unit";
    id: string;
    projectId: string;
    unitNumber?: string | null;
    houseNumber?: string | null;
  }>;
};

export type ProjectsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProjectsQuery = {
  __typename?: "Query";
  projects: Array<{
    __typename?: "Project";
    id: string;
    nameTh: string;
    nameEn: string;
    units: Array<{
      __typename?: "Unit";
      id: string;
      projectId: string;
      unitNumber?: string | null;
      houseNumber?: string | null;
    }>;
  }>;
};

export const UnitFragmentDoc = gql`
  fragment Unit on Unit {
    id
    projectId
    unitNumber
    houseNumber
  }
`;
export const ProjectFragmentDoc = gql`
  fragment Project on Project {
    id
    nameTh
    nameEn
    units {
      ...Unit
    }
  }
  ${UnitFragmentDoc}
`;
export const ProjectsDocument = gql`
  query Projects {
    projects {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  );
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectsQuery,
    ProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  );
}
export function useProjectsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProjectsQuery, ProjectsQueryVariables>(
    ProjectsDocument,
    options,
  );
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<
  typeof useProjectsLazyQuery
>;
export type ProjectsSuspenseQueryHookResult = ReturnType<
  typeof useProjectsSuspenseQuery
>;
export type ProjectsQueryResult = Apollo.QueryResult<
  ProjectsQuery,
  ProjectsQueryVariables
>;
