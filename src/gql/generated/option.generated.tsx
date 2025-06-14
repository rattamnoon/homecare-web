import * as Types from "./graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type TaskOptionsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TaskOptionsQuery = {
  __typename?: "Query";
  rangeTimes: Array<{
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameEn: string;
    nameTh: string;
  }>;
  statuses: Array<{
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  }>;
  sources: Array<{
    __typename?: "TaskSourceDto";
    id: string;
    nameTh: string;
    nameEn: string;
    color?: string | null;
  }>;
  priorities: Array<{
    __typename?: "TaskPriorityDto";
    id: number;
    nameTh: string;
    nameEn: string;
    color: string;
  }>;
};

export const TaskOptionsDocument = gql`
  query TaskOptions {
    rangeTimes: taskRangeTimes {
      id
      nameEn
      nameTh
    }
    statuses: taskStatuses {
      id
      nameTh
      nameEn
      color
    }
    sources: taskSources {
      id
      nameTh
      nameEn
      color
    }
    priorities: taskPriorities {
      id
      nameTh
      nameEn
      color
    }
  }
`;

/**
 * __useTaskOptionsQuery__
 *
 * To run a query within a React component, call `useTaskOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTaskOptionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TaskOptionsQuery,
    TaskOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TaskOptionsQuery, TaskOptionsQueryVariables>(
    TaskOptionsDocument,
    options,
  );
}
export function useTaskOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TaskOptionsQuery,
    TaskOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TaskOptionsQuery, TaskOptionsQueryVariables>(
    TaskOptionsDocument,
    options,
  );
}
export function useTaskOptionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TaskOptionsQuery,
        TaskOptionsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TaskOptionsQuery, TaskOptionsQueryVariables>(
    TaskOptionsDocument,
    options,
  );
}
export type TaskOptionsQueryHookResult = ReturnType<typeof useTaskOptionsQuery>;
export type TaskOptionsLazyQueryHookResult = ReturnType<
  typeof useTaskOptionsLazyQuery
>;
export type TaskOptionsSuspenseQueryHookResult = ReturnType<
  typeof useTaskOptionsSuspenseQuery
>;
export type TaskOptionsQueryResult = Apollo.QueryResult<
  TaskOptionsQuery,
  TaskOptionsQueryVariables
>;
