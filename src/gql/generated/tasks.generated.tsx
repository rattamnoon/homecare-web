import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type TaskFragment = {
  __typename?: "Task";
  id: string;
  code: string;
  projectId: string;
  unitId?: string | null;
  unitNumber: string;
  status: Types.TaskStatus;
  source?: string | null;
  customerName?: string | null;
  customerPhone?: string | null;
  checkInDate: any;
  checkInRangeTime: string;
  insuranceDateDefault?: any | null;
  insuranceDate?: any | null;
  transferDate?: any | null;
  customerRequestedRepairDate?: any | null;
  createdAt: any;
  updatedAt: any;
  deletedAt?: any | null;
};

export type TasksQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TasksQuery = {
  __typename?: "Query";
  tasks: Array<{
    __typename?: "Task";
    id: string;
    code: string;
    projectId: string;
    unitId?: string | null;
    unitNumber: string;
    status: Types.TaskStatus;
    source?: string | null;
    customerName?: string | null;
    customerPhone?: string | null;
    checkInDate: any;
    checkInRangeTime: string;
    insuranceDateDefault?: any | null;
    insuranceDate?: any | null;
    transferDate?: any | null;
    customerRequestedRepairDate?: any | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
  }>;
};

export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    code
    projectId
    unitId
    unitNumber
    status
    source
    customerName
    customerPhone
    checkInDate
    checkInRangeTime
    insuranceDateDefault
    insuranceDate
    transferDate
    customerRequestedRepairDate
    createdAt
    updatedAt
    deletedAt
  }
`;
export const TasksDocument = gql`
  query Tasks {
    tasks {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTasksQuery(
  baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    options,
  );
}
export function useTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    options,
  );
}
export function useTasksSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<TasksQuery, TasksQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    options,
  );
}
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksSuspenseQueryHookResult = ReturnType<
  typeof useTasksSuspenseQuery
>;
export type TasksQueryResult = Apollo.QueryResult<
  TasksQuery,
  TasksQueryVariables
>;
