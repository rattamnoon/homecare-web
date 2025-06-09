export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type Auth = {
  __typename?: "Auth";
  expiresAt: Scalars["Float"]["output"];
  refreshToken: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
  user: User;
};

export type CreateMasterInput = {
  days?: InputMaybe<Scalars["Int"]["input"]>;
  hours?: InputMaybe<Scalars["Int"]["input"]>;
  nameEn?: InputMaybe<Scalars["String"]["input"]>;
  nameTh?: InputMaybe<Scalars["String"]["input"]>;
  sequence?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<MasterType>;
};

export type CreateProjectInput = {
  nameEn: Scalars["String"]["input"];
  nameTh: Scalars["String"]["input"];
};

export type CreateTaskInput = {
  channel: Scalars["String"]["input"];
  code: Scalars["String"]["input"];
  projectId: Scalars["String"]["input"];
  status: TaskStatus;
  unitId: Scalars["String"]["input"];
  unitNumber: Scalars["String"]["input"];
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  employeeId?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastLoginAt?: InputMaybe<Scalars["Date"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type IPaginateLinks = {
  __typename?: "IPaginateLinks";
  first?: Maybe<Scalars["String"]["output"]>;
  last?: Maybe<Scalars["String"]["output"]>;
  next?: Maybe<Scalars["String"]["output"]>;
  previous?: Maybe<Scalars["String"]["output"]>;
};

export type IPaginateMeta = {
  __typename?: "IPaginateMeta";
  currentPage: Scalars["Float"]["output"];
  itemCount: Scalars["Float"]["output"];
  itemsPerPage: Scalars["Float"]["output"];
  totalItems?: Maybe<Scalars["Float"]["output"]>;
  totalPages?: Maybe<Scalars["Float"]["output"]>;
};

export type Master = {
  __typename?: "Master";
  children: Array<Master>;
  createdAt: Scalars["Date"]["output"];
  days?: Maybe<Scalars["Int"]["output"]>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  hours?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  nameEn?: Maybe<Scalars["String"]["output"]>;
  nameTh?: Maybe<Scalars["String"]["output"]>;
  parent?: Maybe<Master>;
  parentId?: Maybe<Scalars["ID"]["output"]>;
  sequence?: Maybe<Scalars["Int"]["output"]>;
  type: MasterType;
  updatedAt: Scalars["Date"]["output"];
};

export enum MasterType {
  Category = "CATEGORY",
  Cause = "CAUSE",
  Contractor = "CONTRACTOR",
  Csat = "CSAT",
  Sla = "SLA",
}

export type Mutation = {
  __typename?: "Mutation";
  createMaster: Master;
  createProject: Project;
  createTask: Task;
  createUser: User;
  login: Auth;
  migrateMasters: Array<Master>;
  migrateProjects: Array<Project>;
  migrateTasks: Array<Task>;
  migrateUsers: Array<User>;
  refreshToken?: Maybe<Auth>;
  removeMaster: Scalars["Boolean"]["output"];
  removeProject: Scalars["Boolean"]["output"];
  removeTask: Scalars["Boolean"]["output"];
  removeUser: Scalars["Boolean"]["output"];
  updateMaster: Master;
  updateProject: Project;
  updateTask: Task;
  updateUser: User;
};

export type MutationCreateMasterArgs = {
  createMasterInput: CreateMasterInput;
};

export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};

export type MutationCreateTaskArgs = {
  createTaskInput: CreateTaskInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationRemoveMasterArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateMasterArgs = {
  updateMasterInput: UpdateMasterInput;
};

export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectInput;
};

export type MutationUpdateTaskArgs = {
  updateTaskInput: UpdateTaskInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["String"]["output"];
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
  units: Array<Unit>;
};

export type Query = {
  __typename?: "Query";
  master: Master;
  masters: Array<Master>;
  me: User;
  project: Project;
  projects: Array<Project>;
  task: Task;
  taskRangeTimes: Array<TaskRangeTimeDto>;
  taskStatuses: Array<TaskStatusDto>;
  tasks: TaskPaginate;
  user: User;
  users: UserPaginate;
};

export type QueryMasterArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTasksArgs = {
  limit?: Scalars["Int"]["input"];
  page?: Scalars["Int"]["input"];
  projectIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  searchText?: InputMaybe<Scalars["String"]["input"]>;
  statuses?: InputMaybe<Array<TaskStatus>>;
  unitIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  limit?: Scalars["Int"]["input"];
  page?: Scalars["Int"]["input"];
  searchText?: InputMaybe<Scalars["String"]["input"]>;
};

export type Task = {
  __typename?: "Task";
  checkInDate: Scalars["Date"]["output"];
  checkInRangeTime: TaskRangeTimeDto;
  code: Scalars["String"]["output"];
  createdAt: Scalars["Date"]["output"];
  customerName?: Maybe<Scalars["String"]["output"]>;
  customerPhone?: Maybe<Scalars["String"]["output"]>;
  customerRequestedRepairDate?: Maybe<Scalars["Date"]["output"]>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  id: Scalars["String"]["output"];
  insuranceDate?: Maybe<Scalars["Date"]["output"]>;
  insuranceDateDefault?: Maybe<Scalars["Date"]["output"]>;
  projectId: Scalars["String"]["output"];
  source?: Maybe<Scalars["String"]["output"]>;
  status: TaskStatusDto;
  transferDate?: Maybe<Scalars["Date"]["output"]>;
  unitId?: Maybe<Scalars["String"]["output"]>;
  unitNumber: Scalars["String"]["output"];
  updatedAt: Scalars["Date"]["output"];
};

export type TaskPaginate = {
  __typename?: "TaskPaginate";
  items: Array<Task>;
  links?: Maybe<IPaginateLinks>;
  meta?: Maybe<IPaginateMeta>;
};

export type TaskRangeTimeDto = {
  __typename?: "TaskRangeTimeDto";
  id: Scalars["String"]["output"];
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
};

export enum TaskStatus {
  Checking = "CHECKING",
  Closed = "CLOSED",
  Finished = "FINISHED",
  Hold = "HOLD",
  InProgress = "IN_PROGRESS",
  Open = "OPEN",
  Pending = "PENDING",
}

export type TaskStatusDto = {
  __typename?: "TaskStatusDto";
  color: Scalars["String"]["output"];
  id: TaskStatus;
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
};

export type Unit = {
  __typename?: "Unit";
  createdAt: Scalars["Date"]["output"];
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  houseNumber?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  project: Project;
  projectId: Scalars["String"]["output"];
  unitNumber?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Date"]["output"];
};

export type UpdateMasterInput = {
  days?: InputMaybe<Scalars["Int"]["input"]>;
  hours?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  nameEn?: InputMaybe<Scalars["String"]["input"]>;
  nameTh?: InputMaybe<Scalars["String"]["input"]>;
  parentId?: InputMaybe<Scalars["ID"]["input"]>;
  sequence?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<MasterType>;
};

export type UpdateProjectInput = {
  id: Scalars["ID"]["input"];
  nameEn?: InputMaybe<Scalars["String"]["input"]>;
  nameTh?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTaskInput = {
  channel?: InputMaybe<Scalars["String"]["input"]>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<TaskStatus>;
  unitId?: InputMaybe<Scalars["String"]["input"]>;
  unitNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  employeeId?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  lastLoginAt?: InputMaybe<Scalars["Date"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["Date"]["output"];
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  email: Scalars["String"]["output"];
  employeeId: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  lastLoginAt: Scalars["Date"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  status: Scalars["String"]["output"];
  updatedAt: Scalars["Date"]["output"];
  username: Scalars["String"]["output"];
};

export type UserPaginate = {
  __typename?: "UserPaginate";
  items: Array<User>;
  links?: Maybe<IPaginateLinks>;
  meta?: Maybe<IPaginateMeta>;
};
