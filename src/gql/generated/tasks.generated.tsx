import * as Types from "./graphql";

import { gql } from "@apollo/client";
import {
  IPaginateMetaFragmentDoc,
  IPaginateLinksFragmentDoc,
} from "./paginate.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type TaskFragment = {
  __typename?: "Task";
  id: string;
  code: string;
  projectId: string;
  unitId?: string | null;
  unitNumber?: string | null;
  customerName?: string | null;
  customerPhone?: string | null;
  checkInDate?: any | null;
  insuranceDateDefault?: any | null;
  insuranceDate?: any | null;
  transferDate?: any | null;
  customerRequestedRepairDate?: any | null;
  createdAt: any;
  updatedAt: any;
  deletedAt?: any | null;
  status: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameEn: string;
    nameTh: string;
    color: string;
  };
  source?: {
    __typename?: "TaskSourceDto";
    id: string;
    nameEn: string;
    nameTh: string;
    color?: string | null;
  } | null;
  checkInRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameEn: string;
    nameTh: string;
  } | null;
  project: {
    __typename?: "Project";
    id: string;
    nameTh: string;
    nameEn: string;
  };
  unit?: {
    __typename?: "Unit";
    id: string;
    projectId: string;
    unitNumber?: string | null;
    houseNumber?: string | null;
  } | null;
  area?: { __typename?: "Master"; id: string; nameEn?: string | null } | null;
  building?: {
    __typename?: "Master";
    id: string;
    nameEn?: string | null;
  } | null;
  floor?: { __typename?: "Master"; id: string; nameEn?: string | null } | null;
};

export type TaskStatusDtoFragment = {
  __typename?: "TaskStatusDto";
  id: Types.TaskStatus;
  nameEn: string;
  nameTh: string;
  color: string;
};

export type TasksQueryVariables = Types.Exact<{
  type: Types.TaskType;
  page: Types.Scalars["Int"]["input"];
  limit: Types.Scalars["Int"]["input"];
  searchText?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  statuses?: Types.InputMaybe<Array<Types.TaskStatus> | Types.TaskStatus>;
  projectId?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  unitIds?: Types.InputMaybe<
    Array<Types.Scalars["String"]["input"]> | Types.Scalars["String"]["input"]
  >;
}>;

export type TasksQuery = {
  __typename?: "Query";
  tasks: {
    __typename?: "TaskPaginate";
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
      __typename?: "Task";
      id: string;
      code: string;
      projectId: string;
      unitId?: string | null;
      unitNumber?: string | null;
      customerName?: string | null;
      customerPhone?: string | null;
      checkInDate?: any | null;
      insuranceDateDefault?: any | null;
      insuranceDate?: any | null;
      transferDate?: any | null;
      customerRequestedRepairDate?: any | null;
      createdAt: any;
      updatedAt: any;
      deletedAt?: any | null;
      status: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameEn: string;
        nameTh: string;
        color: string;
      };
      source?: {
        __typename?: "TaskSourceDto";
        id: string;
        nameEn: string;
        nameTh: string;
        color?: string | null;
      } | null;
      checkInRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameEn: string;
        nameTh: string;
      } | null;
      project: {
        __typename?: "Project";
        id: string;
        nameTh: string;
        nameEn: string;
      };
      unit?: {
        __typename?: "Unit";
        id: string;
        projectId: string;
        unitNumber?: string | null;
        houseNumber?: string | null;
      } | null;
      area?: {
        __typename?: "Master";
        id: string;
        nameEn?: string | null;
      } | null;
      building?: {
        __typename?: "Master";
        id: string;
        nameEn?: string | null;
      } | null;
      floor?: {
        __typename?: "Master";
        id: string;
        nameEn?: string | null;
      } | null;
    }>;
  };
};

export type TaskStatusesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TaskStatusesQuery = {
  __typename?: "Query";
  taskStatuses: Array<{
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameEn: string;
    nameTh: string;
    color: string;
  }>;
};

export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    code
    projectId
    unitId
    unitNumber
    status {
      id
      nameEn
      nameTh
      color
    }
    source {
      id
      nameEn
      nameTh
      color
    }
    customerName
    customerPhone
    checkInDate
    checkInRangeTime {
      id
      nameEn
      nameTh
    }
    insuranceDateDefault
    insuranceDate
    transferDate
    customerRequestedRepairDate
    createdAt
    updatedAt
    deletedAt
    project {
      id
      nameTh
      nameEn
    }
    unit {
      id
      projectId
      unitNumber
      houseNumber
    }
    area {
      id
      nameEn
      nameEn
    }
    building {
      id
      nameEn
      nameEn
    }
    floor {
      id
      nameEn
      nameEn
    }
  }
`;
export const TaskStatusDtoFragmentDoc = gql`
  fragment TaskStatusDto on TaskStatusDto {
    id
    nameEn
    nameTh
    color
  }
`;
export const TasksDocument = gql`
  query Tasks(
    $type: TaskType!
    $page: Int!
    $limit: Int!
    $searchText: String
    $statuses: [TaskStatus!]
    $projectId: String
    $unitIds: [String!]
  ) {
    tasks(
      type: $type
      page: $page
      limit: $limit
      searchText: $searchText
      statuses: $statuses
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
        ...Task
      }
    }
  }
  ${IPaginateMetaFragmentDoc}
  ${IPaginateLinksFragmentDoc}
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
 *      type: // value for 'type'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      searchText: // value for 'searchText'
 *      statuses: // value for 'statuses'
 *      projectId: // value for 'projectId'
 *      unitIds: // value for 'unitIds'
 *   },
 * });
 */
export function useTasksQuery(
  baseOptions: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables> &
    ({ variables: TasksQueryVariables; skip?: boolean } | { skip: boolean }),
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
export const TaskStatusesDocument = gql`
  query TaskStatuses {
    taskStatuses {
      ...TaskStatusDto
    }
  }
  ${TaskStatusDtoFragmentDoc}
`;

/**
 * __useTaskStatusesQuery__
 *
 * To run a query within a React component, call `useTaskStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTaskStatusesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TaskStatusesQuery,
    TaskStatusesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TaskStatusesQuery, TaskStatusesQueryVariables>(
    TaskStatusesDocument,
    options,
  );
}
export function useTaskStatusesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TaskStatusesQuery,
    TaskStatusesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TaskStatusesQuery, TaskStatusesQueryVariables>(
    TaskStatusesDocument,
    options,
  );
}
export function useTaskStatusesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TaskStatusesQuery,
        TaskStatusesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TaskStatusesQuery, TaskStatusesQueryVariables>(
    TaskStatusesDocument,
    options,
  );
}
export type TaskStatusesQueryHookResult = ReturnType<
  typeof useTaskStatusesQuery
>;
export type TaskStatusesLazyQueryHookResult = ReturnType<
  typeof useTaskStatusesLazyQuery
>;
export type TaskStatusesSuspenseQueryHookResult = ReturnType<
  typeof useTaskStatusesSuspenseQuery
>;
export type TaskStatusesQueryResult = Apollo.QueryResult<
  TaskStatusesQuery,
  TaskStatusesQueryVariables
>;
