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
};

export type ProjectsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProjectsQuery = {
  __typename?: "Query";
  projects: Array<{
    __typename?: "Project";
    id: string;
    nameTh: string;
    nameEn: string;
  }>;
};

export type ProjectQueryVariables = Types.Exact<{
  projectId: Types.Scalars["ID"]["input"];
}>;

export type ProjectQuery = {
  __typename?: "Query";
  project: {
    __typename?: "Project";
    a10Date?: Date | null;
    insuranceDate?: Date | null;
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
};

export type UnitsQueryVariables = Types.Exact<{
  projectId: Types.Scalars["String"]["input"];
}>;

export type UnitsQuery = {
  __typename?: "Query";
  units: Array<{
    __typename?: "Unit";
    id: string;
    projectId: string;
    unitNumber?: string | null;
    houseNumber?: string | null;
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
  }
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
export const ProjectDocument = gql`
  query Project($projectId: ID!) {
    project(id: $projectId) {
      ...Project
      a10Date
      insuranceDate
      units {
        ...Unit
      }
    }
  }
  ${ProjectFragmentDoc}
  ${UnitFragmentDoc}
`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables> &
    ({ variables: ProjectQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    options,
  );
}
export function useProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProjectQuery,
    ProjectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    options,
  );
}
export function useProjectSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProjectQuery, ProjectQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProjectQuery, ProjectQueryVariables>(
    ProjectDocument,
    options,
  );
}
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectSuspenseQueryHookResult = ReturnType<
  typeof useProjectSuspenseQuery
>;
export type ProjectQueryResult = Apollo.QueryResult<
  ProjectQuery,
  ProjectQueryVariables
>;
export const UnitsDocument = gql`
  query Units($projectId: String!) {
    units(projectId: $projectId) {
      ...Unit
    }
  }
  ${UnitFragmentDoc}
`;

/**
 * __useUnitsQuery__
 *
 * To run a query within a React component, call `useUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUnitsQuery(
  baseOptions: Apollo.QueryHookOptions<UnitsQuery, UnitsQueryVariables> &
    ({ variables: UnitsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UnitsQuery, UnitsQueryVariables>(
    UnitsDocument,
    options,
  );
}
export function useUnitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UnitsQuery, UnitsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UnitsQuery, UnitsQueryVariables>(
    UnitsDocument,
    options,
  );
}
export function useUnitsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UnitsQuery, UnitsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UnitsQuery, UnitsQueryVariables>(
    UnitsDocument,
    options,
  );
}
export type UnitsQueryHookResult = ReturnType<typeof useUnitsQuery>;
export type UnitsLazyQueryHookResult = ReturnType<typeof useUnitsLazyQuery>;
export type UnitsSuspenseQueryHookResult = ReturnType<
  typeof useUnitsSuspenseQuery
>;
export type UnitsQueryResult = Apollo.QueryResult<
  UnitsQuery,
  UnitsQueryVariables
>;
