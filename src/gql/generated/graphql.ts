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
  Date: { input: Date; output: Date };
};

export type Auth = {
  __typename?: "Auth";
  expiresAt: Scalars["Float"]["output"];
  refreshToken: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
  user: User;
};

export type Calling = {
  __typename?: "Calling";
  callComment?: Maybe<Scalars["String"]["output"]>;
  callDate: Scalars["Date"]["output"];
  callOrder: Scalars["Int"]["output"];
  createdAt: Scalars["Date"]["output"];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  deletedBy?: Maybe<User>;
  id: Scalars["ID"]["output"];
  taskDetail?: Maybe<TaskDetail>;
  taskDetailId: Scalars["String"]["output"];
  updatedAt: Scalars["Date"]["output"];
  updatedBy?: Maybe<User>;
};

export type CreateCallingInput = {
  callComment?: InputMaybe<Scalars["String"]["input"]>;
  callDate?: InputMaybe<Scalars["Date"]["input"]>;
  callOrder?: InputMaybe<Scalars["Int"]["input"]>;
  taskDetailId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateCsatInput = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  questionId?: InputMaybe<Scalars["String"]["input"]>;
  score?: InputMaybe<Scalars["Int"]["input"]>;
  taskDetailId?: InputMaybe<Scalars["String"]["input"]>;
  taskId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateMasterInput = {
  SLA1D?: InputMaybe<Scalars["Int"]["input"]>;
  SLA1H?: InputMaybe<Scalars["Int"]["input"]>;
  SLA2D?: InputMaybe<Scalars["Int"]["input"]>;
  SLA2H?: InputMaybe<Scalars["Int"]["input"]>;
  SLA3D?: InputMaybe<Scalars["Int"]["input"]>;
  SLA3H?: InputMaybe<Scalars["Int"]["input"]>;
  areaTypeEn?: InputMaybe<Scalars["String"]["input"]>;
  areaTypeTh?: InputMaybe<Scalars["String"]["input"]>;
  defaultScore?: InputMaybe<Scalars["Int"]["input"]>;
  maxScore?: InputMaybe<Scalars["Int"]["input"]>;
  nameEn?: InputMaybe<Scalars["String"]["input"]>;
  nameTh?: InputMaybe<Scalars["String"]["input"]>;
  sequence?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<MasterType>;
};

export type CreateProjectInput = {
  nameEn: Scalars["String"]["input"];
  nameTh: Scalars["String"]["input"];
};

export type CreateTaskDetailInput = {
  CSATComment?: InputMaybe<Scalars["String"]["input"]>;
  appointmentDate?: InputMaybe<Scalars["Date"]["input"]>;
  appointmentRepairDate?: InputMaybe<Scalars["Date"]["input"]>;
  appointmentRepairRemark?: InputMaybe<Scalars["String"]["input"]>;
  appointmentRepairTime?: InputMaybe<Scalars["String"]["input"]>;
  appointmentTime?: InputMaybe<Scalars["String"]["input"]>;
  assignInDate?: InputMaybe<Scalars["Date"]["input"]>;
  assignRangeTime?: InputMaybe<Scalars["String"]["input"]>;
  assignedDate?: InputMaybe<Scalars["Date"]["input"]>;
  calledDate?: InputMaybe<Scalars["Date"]["input"]>;
  categoryId?: InputMaybe<Scalars["String"]["input"]>;
  causeId?: InputMaybe<Scalars["String"]["input"]>;
  closedDate?: InputMaybe<Scalars["Date"]["input"]>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  contractorId?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  files: Array<CreateUploadFileInput>;
  finishedDate?: InputMaybe<Scalars["Date"]["input"]>;
  homecareId?: InputMaybe<Scalars["String"]["input"]>;
  homecareInDate?: InputMaybe<Scalars["Date"]["input"]>;
  homecareRangeTime?: InputMaybe<Scalars["String"]["input"]>;
  homecareRemark?: InputMaybe<Scalars["String"]["input"]>;
  homecareStatus?: InputMaybe<TaskStatus>;
  inprogressDate?: InputMaybe<Scalars["Date"]["input"]>;
  isCSAT?: InputMaybe<Scalars["Boolean"]["input"]>;
  isReinprogress?: InputMaybe<Scalars["Boolean"]["input"]>;
  priority?: Scalars["Int"]["input"];
  reinprogressCode?: InputMaybe<Scalars["String"]["input"]>;
  reinprogressDate?: InputMaybe<Scalars["Date"]["input"]>;
  reinprogressId?: InputMaybe<Scalars["String"]["input"]>;
  slaId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<TaskStatus>;
  subCategoryId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateTaskDetailReportLogInput = {
  callbackDate?: InputMaybe<Scalars["Date"]["input"]>;
  checkInDate?: InputMaybe<Scalars["Date"]["input"]>;
  checkInRangeTime?: InputMaybe<Scalars["String"]["input"]>;
  remark?: InputMaybe<Scalars["String"]["input"]>;
  taskDetailAssignId?: InputMaybe<Scalars["String"]["input"]>;
  taskDetailId?: InputMaybe<Scalars["String"]["input"]>;
  type: TaskStatus;
};

export type CreateTaskInput = {
  areaId?: InputMaybe<Scalars["String"]["input"]>;
  buildingId?: InputMaybe<Scalars["String"]["input"]>;
  checkInDate?: InputMaybe<Scalars["Date"]["input"]>;
  checkInRangeTime: Scalars["String"]["input"];
  customerName?: InputMaybe<Scalars["String"]["input"]>;
  customerPhone?: InputMaybe<Scalars["String"]["input"]>;
  customerRequestedRepairDate?: InputMaybe<Scalars["Date"]["input"]>;
  floorId?: InputMaybe<Scalars["String"]["input"]>;
  insuranceDate?: InputMaybe<Scalars["Date"]["input"]>;
  insuranceDateDefault?: InputMaybe<Scalars["Date"]["input"]>;
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  source: Scalars["String"]["input"];
  status?: TaskStatus;
  transferDate?: InputMaybe<Scalars["Date"]["input"]>;
  type?: InputMaybe<TaskType>;
  unitId?: InputMaybe<Scalars["String"]["input"]>;
  unitNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUploadFileInput = {
  fileBucket?: InputMaybe<Scalars["String"]["input"]>;
  fileExtension?: InputMaybe<Scalars["String"]["input"]>;
  fileFolder?: InputMaybe<Scalars["String"]["input"]>;
  fileId?: InputMaybe<Scalars["String"]["input"]>;
  fileName?: InputMaybe<Scalars["String"]["input"]>;
  filePath?: InputMaybe<Scalars["String"]["input"]>;
  fileType?: InputMaybe<UploadFileType>;
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
  refId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  employeeId?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastLoginAt?: InputMaybe<Scalars["Date"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type Csat = {
  __typename?: "Csat";
  comment?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Date"]["output"];
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  id: Scalars["ID"]["output"];
  questionId: Scalars["String"]["output"];
  score: Scalars["Int"]["output"];
  taskDetailId: Scalars["String"]["output"];
  taskId: Scalars["String"]["output"];
  updatedAt: Scalars["Date"]["output"];
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

export type InsuranceExtension = {
  __typename?: "InsuranceExtension";
  createdAt?: Maybe<Scalars["Date"]["output"]>;
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  deletedBy?: Maybe<User>;
  files: Array<UploadFile>;
  houseNumber?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  insuranceDateDefault?: Maybe<Scalars["Date"]["output"]>;
  insuranceDateExpand?: Maybe<Scalars["Date"]["output"]>;
  project?: Maybe<Project>;
  projectId: Scalars["String"]["output"];
  transferDate?: Maybe<Scalars["Date"]["output"]>;
  unit?: Maybe<Unit>;
  unitId: Scalars["String"]["output"];
  unitNumber?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["Date"]["output"]>;
  updatedBy?: Maybe<User>;
};

export type InsuranceExtensionPaginate = {
  __typename?: "InsuranceExtensionPaginate";
  items: Array<InsuranceExtension>;
  links?: Maybe<IPaginateLinks>;
  meta?: Maybe<IPaginateMeta>;
};

export type LegacyMigration = {
  __typename?: "LegacyMigration";
  syncDate: Scalars["Date"]["output"];
  total: Scalars["Int"]["output"];
};

export type Master = {
  __typename?: "Master";
  SLA1D?: Maybe<Scalars["Int"]["output"]>;
  SLA1H?: Maybe<Scalars["Int"]["output"]>;
  SLA2D?: Maybe<Scalars["Int"]["output"]>;
  SLA2H?: Maybe<Scalars["Int"]["output"]>;
  SLA3D?: Maybe<Scalars["Int"]["output"]>;
  SLA3H?: Maybe<Scalars["Int"]["output"]>;
  areaTypeEn?: Maybe<Scalars["String"]["output"]>;
  areaTypeTh?: Maybe<Scalars["String"]["output"]>;
  children: Array<Master>;
  createdAt: Scalars["Date"]["output"];
  defaultScore?: Maybe<Scalars["Int"]["output"]>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  id: Scalars["ID"]["output"];
  maxScore?: Maybe<Scalars["Int"]["output"]>;
  nameEn?: Maybe<Scalars["String"]["output"]>;
  nameTh?: Maybe<Scalars["String"]["output"]>;
  parent?: Maybe<Master>;
  parentId?: Maybe<Scalars["ID"]["output"]>;
  sequence?: Maybe<Scalars["Int"]["output"]>;
  type: MasterType;
  updatedAt: Scalars["Date"]["output"];
};

/** ประเภทของข้อมูลหลัก */
export enum MasterType {
  Area = "AREA",
  Category = "CATEGORY",
  Cause = "CAUSE",
  Central = "CENTRAL",
  Contractor = "CONTRACTOR",
  Csat = "CSAT",
  Service = "SERVICE",
  Sla = "SLA",
}

export type Mutation = {
  __typename?: "Mutation";
  bulkCreateOrUpdateInsuranceExtension: Array<InsuranceExtension>;
  createCalling: Calling;
  createCsat: Array<Csat>;
  createLegacyMigration: LegacyMigration;
  createMaster: Master;
  createOrUpdateInsuranceExtension: InsuranceExtension;
  createProject: Project;
  createTask: Task;
  createTaskDetailReinprogress: TaskDetail;
  createTaskDetailReportLog: TaskDetailReportLog;
  createTaskDetailReportLogWithAssign: TaskDetailReportLog;
  createUploadFile: UploadFile;
  createUser: User;
  login: Auth;
  refreshToken?: Maybe<Auth>;
  removeCalling: Scalars["Boolean"]["output"];
  removeCsat: Csat;
  removeInsuranceExtension: Scalars["Boolean"]["output"];
  removeMaster: Scalars["Boolean"]["output"];
  removeProject: Scalars["Boolean"]["output"];
  removeTask: Scalars["Boolean"]["output"];
  removeUploadFile: Scalars["Boolean"]["output"];
  removeUser: Scalars["Boolean"]["output"];
  updateCalling: Calling;
  updateCsat: Csat;
  updateMaster: Master;
  updateProject: Project;
  updateTask: Task;
  updateTaskDetail: TaskDetail;
  updateUploadFile: UploadFile;
  updateUser: User;
};

export type MutationBulkCreateOrUpdateInsuranceExtensionArgs = {
  insuranceDate: Scalars["Date"]["input"];
  projectId: Scalars["ID"]["input"];
};

export type MutationCreateCallingArgs = {
  createCallingInput: CreateCallingInput;
};

export type MutationCreateCsatArgs = {
  CSATComment?: InputMaybe<Scalars["String"]["input"]>;
  createCsatInput: Array<CreateCsatInput>;
  taskDetailId: Scalars["ID"]["input"];
};

export type MutationCreateMasterArgs = {
  createMasterInput: CreateMasterInput;
};

export type MutationCreateOrUpdateInsuranceExtensionArgs = {
  createUploadFileInput: Array<CreateUploadFileInput>;
  updateInsuranceExtensionInput: UpdateInsuranceExtensionInput;
};

export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};

export type MutationCreateTaskArgs = {
  createTaskDetailInput: Array<CreateTaskDetailInput>;
  createTaskInput: CreateTaskInput;
};

export type MutationCreateTaskDetailReinprogressArgs = {
  taskDetailId: Scalars["String"]["input"];
};

export type MutationCreateTaskDetailReportLogArgs = {
  createTaskDetailReportLogInput: CreateTaskDetailReportLogInput;
  createUploadFileInput?: InputMaybe<Array<CreateUploadFileInput>>;
};

export type MutationCreateTaskDetailReportLogWithAssignArgs = {
  createTaskDetailReportLogInput: CreateTaskDetailReportLogInput;
  createUploadFileInput?: InputMaybe<Array<CreateUploadFileInput>>;
};

export type MutationCreateUploadFileArgs = {
  createUploadFileInput: CreateUploadFileInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationRemoveCallingArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveCsatArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveInsuranceExtensionArgs = {
  id: Scalars["ID"]["input"];
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

export type MutationRemoveUploadFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRemoveUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateCallingArgs = {
  updateCallingInput: UpdateCallingInput;
};

export type MutationUpdateCsatArgs = {
  updateCsatInput: UpdateCsatInput;
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

export type MutationUpdateTaskDetailArgs = {
  updateTaskDetailInput: UpdateTaskDetailInput;
};

export type MutationUpdateUploadFileArgs = {
  updateUploadFileInput: UpdateUploadFileInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Project = {
  __typename?: "Project";
  /** วันที่จดทะเบียนนิติฯ */
  a10Date?: Maybe<Scalars["Date"]["output"]>;
  id: Scalars["String"]["output"];
  /** วันที่ประกันนิติฯ */
  insuranceDate?: Maybe<Scalars["Date"]["output"]>;
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
  units: Array<Unit>;
};

export type Query = {
  __typename?: "Query";
  allActiveUsers: Array<User>;
  calling: Calling;
  callings: Array<Calling>;
  csat: Csat;
  csats: Array<Csat>;
  insuranceExtension: InsuranceExtension;
  insuranceExtensions: InsuranceExtensionPaginate;
  master: Master;
  masters: Array<Master>;
  me: User;
  project: Project;
  projects: Array<Project>;
  task: Task;
  taskDetails: TaskDetailPaginate;
  taskPriorities: Array<TaskPriorityDto>;
  taskRangeTimes: Array<TaskRangeTimeDto>;
  taskSources: Array<TaskSourceDto>;
  taskStatuses: Array<TaskStatusDto>;
  tasks: TaskPaginate;
  units: Array<Unit>;
  uploadFile: UploadFile;
  uploadFiles: Array<UploadFile>;
  user: User;
  users: UserPaginate;
};

export type QueryCallingArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCallingsArgs = {
  taskDetailId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCsatArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryInsuranceExtensionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryInsuranceExtensionsArgs = {
  limit?: Scalars["Int"]["input"];
  page?: Scalars["Int"]["input"];
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  unitIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryMasterArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryMastersArgs = {
  searchText?: InputMaybe<Scalars["String"]["input"]>;
  types?: Array<MasterType>;
};

export type QueryProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTaskDetailsArgs = {
  finishedDate?: InputMaybe<Array<Scalars["Date"]["input"]>>;
  isCSAT?: InputMaybe<Scalars["Boolean"]["input"]>;
  isCall?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: Scalars["Int"]["input"];
  page?: Scalars["Int"]["input"];
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  searchText?: InputMaybe<Scalars["String"]["input"]>;
  statuses?: InputMaybe<Array<TaskStatus>>;
  type?: TaskType;
  unitIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryTasksArgs = {
  checkInDate?: InputMaybe<Array<Scalars["String"]["input"]>>;
  createdAt?: InputMaybe<Array<Scalars["String"]["input"]>>;
  limit?: Scalars["Int"]["input"];
  page?: Scalars["Int"]["input"];
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  searchText?: InputMaybe<Scalars["String"]["input"]>;
  sources?: InputMaybe<Array<Scalars["String"]["input"]>>;
  statuses?: InputMaybe<Array<TaskStatus>>;
  type?: TaskType;
  unitIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryUnitsArgs = {
  projectId: Scalars["String"]["input"];
};

export type QueryUploadFileArgs = {
  id: Scalars["ID"]["input"];
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
  area?: Maybe<Master>;
  areaId?: Maybe<Scalars["String"]["output"]>;
  building?: Maybe<Master>;
  buildingId?: Maybe<Scalars["String"]["output"]>;
  checkInDate?: Maybe<Scalars["Date"]["output"]>;
  checkInRangeTime?: Maybe<TaskRangeTimeDto>;
  code: Scalars["String"]["output"];
  createdAt: Scalars["Date"]["output"];
  createdBy?: Maybe<User>;
  customerName?: Maybe<Scalars["String"]["output"]>;
  customerPhone?: Maybe<Scalars["String"]["output"]>;
  customerRequestedRepairDate?: Maybe<Scalars["Date"]["output"]>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  deletedBy?: Maybe<User>;
  details: Array<TaskDetail>;
  floor?: Maybe<Master>;
  floorId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  insuranceDate?: Maybe<Scalars["Date"]["output"]>;
  insuranceDateDefault?: Maybe<Scalars["Date"]["output"]>;
  project: Project;
  projectId: Scalars["String"]["output"];
  source?: Maybe<TaskSourceDto>;
  status: TaskStatusDto;
  transferDate?: Maybe<Scalars["Date"]["output"]>;
  type: TaskType;
  unit?: Maybe<Unit>;
  unitId?: Maybe<Scalars["String"]["output"]>;
  unitNumber?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Date"]["output"];
  updatedBy?: Maybe<User>;
};

export type TaskDetail = {
  __typename?: "TaskDetail";
  CSATComment?: Maybe<Scalars["String"]["output"]>;
  appointmentDate?: Maybe<Scalars["Date"]["output"]>;
  appointmentRepairDate?: Maybe<Scalars["Date"]["output"]>;
  appointmentRepairRemark?: Maybe<Scalars["String"]["output"]>;
  appointmentRepairTime?: Maybe<Scalars["String"]["output"]>;
  appointmentTime?: Maybe<Scalars["String"]["output"]>;
  assignInDate?: Maybe<Scalars["Date"]["output"]>;
  assignRangeTime?: Maybe<TaskRangeTimeDto>;
  assignedDate?: Maybe<Scalars["Date"]["output"]>;
  assigns: Array<TaskDetailAssign>;
  calledDate?: Maybe<Scalars["Date"]["output"]>;
  callings: Array<Calling>;
  category?: Maybe<Master>;
  categoryId?: Maybe<Scalars["String"]["output"]>;
  cause?: Maybe<Master>;
  causeId?: Maybe<Scalars["String"]["output"]>;
  closedDate?: Maybe<Scalars["Date"]["output"]>;
  code: Scalars["String"]["output"];
  contractor?: Maybe<Master>;
  contractorId?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Date"]["output"];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  deletedBy?: Maybe<User>;
  description?: Maybe<Scalars["String"]["output"]>;
  finishedDate?: Maybe<Scalars["Date"]["output"]>;
  homecare?: Maybe<User>;
  homecareId?: Maybe<Scalars["String"]["output"]>;
  homecareInDate?: Maybe<Scalars["Date"]["output"]>;
  homecareInRangeTime?: Maybe<TaskRangeTimeDto>;
  homecareRemark?: Maybe<Scalars["String"]["output"]>;
  homecareStatus?: Maybe<TaskStatusDto>;
  id: Scalars["ID"]["output"];
  images: Array<UploadFile>;
  inprogressDate?: Maybe<Scalars["Date"]["output"]>;
  isCSAT?: Maybe<Scalars["Boolean"]["output"]>;
  isReinprogress?: Maybe<Scalars["Boolean"]["output"]>;
  logs: Array<TaskDetail>;
  priority?: Maybe<TaskPriorityDto>;
  reinprogressCode?: Maybe<Scalars["String"]["output"]>;
  reinprogressDate?: Maybe<Scalars["Date"]["output"]>;
  reinprogressId?: Maybe<Scalars["String"]["output"]>;
  reportLogs: Array<TaskDetailReportLog>;
  sla?: Maybe<Master>;
  slaId?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<TaskStatusDto>;
  subCategory?: Maybe<Master>;
  subCategoryId?: Maybe<Scalars["String"]["output"]>;
  task: Task;
  taskId: Scalars["String"]["output"];
  updatedAt: Scalars["Date"]["output"];
  updatedBy?: Maybe<User>;
};

export type TaskDetailAssign = {
  __typename?: "TaskDetailAssign";
  SLA?: Maybe<Scalars["Int"]["output"]>;
  SLAEndDate?: Maybe<Scalars["Date"]["output"]>;
  SLAStartDate?: Maybe<Scalars["Date"]["output"]>;
  SLAWorkHour?: Maybe<Scalars["Int"]["output"]>;
  assetComment?: Maybe<Scalars["String"]["output"]>;
  code: Scalars["String"]["output"];
  createdAt: Scalars["Date"]["output"];
  createdBy?: Maybe<User>;
  customerNameFinish?: Maybe<Scalars["String"]["output"]>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  deletedBy?: Maybe<User>;
  finishedDate?: Maybe<Scalars["Date"]["output"]>;
  finishedType?: Maybe<TaskStatusDto>;
  id: Scalars["ID"]["output"];
  images: Array<UploadFile>;
  isAssetCustomer?: Maybe<Scalars["Boolean"]["output"]>;
  logs: Array<TaskDetailAssign>;
  reassignedInDate?: Maybe<Scalars["Date"]["output"]>;
  reassignedRangeTime?: Maybe<TaskRangeTimeDto>;
  reassignedRemark?: Maybe<Scalars["String"]["output"]>;
  remark?: Maybe<Scalars["String"]["output"]>;
  reportLogs: Array<TaskDetailReportLog>;
  requestedDate?: Maybe<Scalars["Date"]["output"]>;
  requestedRangeTime?: Maybe<TaskRangeTimeDto>;
  staff?: Maybe<User>;
  staffId?: Maybe<Scalars["String"]["output"]>;
  staffStatus?: Maybe<TaskStatusDto>;
  status?: Maybe<TaskStatusDto>;
  taskDetailId: Scalars["String"]["output"];
  updatedAt: Scalars["Date"]["output"];
  updatedBy?: Maybe<User>;
};

export type TaskDetailPaginate = {
  __typename?: "TaskDetailPaginate";
  items: Array<TaskDetail>;
  links?: Maybe<IPaginateLinks>;
  meta?: Maybe<IPaginateMeta>;
};

export type TaskDetailReportLog = {
  __typename?: "TaskDetailReportLog";
  assign?: Maybe<TaskDetailAssign>;
  callbackDate?: Maybe<Scalars["Date"]["output"]>;
  checkInDate?: Maybe<Scalars["Date"]["output"]>;
  checkInRangeTime?: Maybe<TaskRangeTimeDto>;
  createdAt: Scalars["Date"]["output"];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  deletedBy?: Maybe<User>;
  id: Scalars["ID"]["output"];
  images: Array<UploadFile>;
  remark?: Maybe<Scalars["String"]["output"]>;
  task?: Maybe<Task>;
  taskDetailAssignId?: Maybe<Scalars["String"]["output"]>;
  taskDetailId?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<TaskStatusDto>;
  updatedAt: Scalars["Date"]["output"];
  updatedBy?: Maybe<User>;
};

export type TaskPaginate = {
  __typename?: "TaskPaginate";
  items: Array<Task>;
  links?: Maybe<IPaginateLinks>;
  meta?: Maybe<IPaginateMeta>;
};

export type TaskPriorityDto = {
  __typename?: "TaskPriorityDto";
  color: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
};

export type TaskRangeTimeDto = {
  __typename?: "TaskRangeTimeDto";
  id: Scalars["String"]["output"];
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
};

export type TaskSourceDto = {
  __typename?: "TaskSourceDto";
  color?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
};

export enum TaskStatus {
  AnswerThePhone = "ANSWER_THE_PHONE",
  ApprovedHold = "APPROVED_HOLD",
  ApproveFinishHomecare = "APPROVE_FINISH_HOMECARE",
  ApproveHoldHomecare = "APPROVE_HOLD_HOMECARE",
  Assigned = "ASSIGNED",
  Before = "BEFORE",
  BeforeChecking = "BEFORE_CHECKING",
  Callback = "CALLBACK",
  ChangeDate = "CHANGE_DATE",
  Checking = "CHECKING",
  Closed = "CLOSED",
  ConfirmReAssigned = "CONFIRM_RE_ASSIGNED",
  CustomerChangeDate = "CUSTOMER_CHANGE_DATE",
  CustomerFinished = "CUSTOMER_FINISHED",
  Doing = "DOING",
  Finished = "FINISHED",
  Hold = "HOLD",
  HomecareFinished = "HOMECARE_FINISHED",
  InProgress = "IN_PROGRESS",
  MissedCall = "MISSED_CALL",
  MissedWorkCall = "MISSED_WORK_CALL",
  Open = "OPEN",
  OverServiceLevelAgreement = "OVER_SERVICE_LEVEL_AGREEMENT",
  Pending = "PENDING",
  Protection = "PROTECTION",
  RejectFinishedHomecare = "REJECT_FINISHED_HOMECARE",
  RejectHold = "REJECT_HOLD",
  ReAssigned = "RE_ASSIGNED",
  ReInProgress = "RE_IN_PROGRESS",
  WaitingConclude = "WAITING_CONCLUDE",
  WaitingConstruction = "WAITING_CONSTRUCTION",
  WaitingConstructionMaterial = "WAITING_CONSTRUCTION_MATERIAL",
  WaitingConstructionWork = "WAITING_CONSTRUCTION_WORK",
  WaitingCustomerAppointment = "WAITING_CUSTOMER_APPOINTMENT",
  WaitingCustomerCall = "WAITING_CUSTOMER_CALL",
  WaitingHomecare = "WAITING_HOMECARE",
  WorkNotReceived = "WORK_NOT_RECEIVED",
  WorkReceived = "WORK_RECEIVED",
}

export type TaskStatusDto = {
  __typename?: "TaskStatusDto";
  color: Scalars["String"]["output"];
  id: TaskStatus;
  nameEn: Scalars["String"]["output"];
  nameTh: Scalars["String"]["output"];
};

export enum TaskType {
  Central = "CENTRAL",
  Repair = "REPAIR",
  Service = "SERVICE",
}

export type Unit = {
  __typename?: "Unit";
  createdAt: Scalars["Date"]["output"];
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  houseNumber?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  project: Project;
  projectId: Scalars["String"]["output"];
  transferDate?: Maybe<Scalars["Date"]["output"]>;
  unitNumber?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Date"]["output"];
};

export type UpdateCallingInput = {
  callComment?: InputMaybe<Scalars["String"]["input"]>;
  callDate?: InputMaybe<Scalars["Date"]["input"]>;
  callOrder?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["ID"]["input"];
  taskDetailId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCsatInput = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  questionId?: InputMaybe<Scalars["String"]["input"]>;
  score?: InputMaybe<Scalars["Int"]["input"]>;
  taskDetailId?: InputMaybe<Scalars["String"]["input"]>;
  taskId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateInsuranceExtensionInput = {
  id: Scalars["ID"]["input"];
  insuranceDateDefault?: InputMaybe<Scalars["Date"]["input"]>;
  insuranceDateExpand?: InputMaybe<Scalars["Date"]["input"]>;
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  unitId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateMasterInput = {
  SLA1D?: InputMaybe<Scalars["Int"]["input"]>;
  SLA1H?: InputMaybe<Scalars["Int"]["input"]>;
  SLA2D?: InputMaybe<Scalars["Int"]["input"]>;
  SLA2H?: InputMaybe<Scalars["Int"]["input"]>;
  SLA3D?: InputMaybe<Scalars["Int"]["input"]>;
  SLA3H?: InputMaybe<Scalars["Int"]["input"]>;
  areaTypeEn?: InputMaybe<Scalars["String"]["input"]>;
  areaTypeTh?: InputMaybe<Scalars["String"]["input"]>;
  defaultScore?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  maxScore?: InputMaybe<Scalars["Int"]["input"]>;
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

export type UpdateTaskDetailInput = {
  CSATComment?: InputMaybe<Scalars["String"]["input"]>;
  appointmentDate?: InputMaybe<Scalars["Date"]["input"]>;
  appointmentRepairDate?: InputMaybe<Scalars["Date"]["input"]>;
  appointmentRepairRemark?: InputMaybe<Scalars["String"]["input"]>;
  appointmentRepairTime?: InputMaybe<Scalars["String"]["input"]>;
  appointmentTime?: InputMaybe<Scalars["String"]["input"]>;
  assignInDate?: InputMaybe<Scalars["Date"]["input"]>;
  assignRangeTime?: InputMaybe<Scalars["String"]["input"]>;
  assignedDate?: InputMaybe<Scalars["Date"]["input"]>;
  calledDate?: InputMaybe<Scalars["Date"]["input"]>;
  categoryId?: InputMaybe<Scalars["String"]["input"]>;
  causeId?: InputMaybe<Scalars["String"]["input"]>;
  closedDate?: InputMaybe<Scalars["Date"]["input"]>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  contractorId?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  files?: InputMaybe<Array<CreateUploadFileInput>>;
  finishedDate?: InputMaybe<Scalars["Date"]["input"]>;
  homecareId?: InputMaybe<Scalars["String"]["input"]>;
  homecareInDate?: InputMaybe<Scalars["Date"]["input"]>;
  homecareRangeTime?: InputMaybe<Scalars["String"]["input"]>;
  homecareRemark?: InputMaybe<Scalars["String"]["input"]>;
  homecareStatus?: InputMaybe<TaskStatus>;
  id: Scalars["ID"]["input"];
  inprogressDate?: InputMaybe<Scalars["Date"]["input"]>;
  isCSAT?: InputMaybe<Scalars["Boolean"]["input"]>;
  isReinprogress?: InputMaybe<Scalars["Boolean"]["input"]>;
  priority?: InputMaybe<Scalars["Int"]["input"]>;
  reinprogressCode?: InputMaybe<Scalars["String"]["input"]>;
  reinprogressDate?: InputMaybe<Scalars["Date"]["input"]>;
  reinprogressId?: InputMaybe<Scalars["String"]["input"]>;
  slaId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<TaskStatus>;
  subCategoryId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTaskInput = {
  areaId?: InputMaybe<Scalars["String"]["input"]>;
  buildingId?: InputMaybe<Scalars["String"]["input"]>;
  checkInDate?: InputMaybe<Scalars["Date"]["input"]>;
  checkInRangeTime?: InputMaybe<Scalars["String"]["input"]>;
  customerName?: InputMaybe<Scalars["String"]["input"]>;
  customerPhone?: InputMaybe<Scalars["String"]["input"]>;
  customerRequestedRepairDate?: InputMaybe<Scalars["Date"]["input"]>;
  floorId?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  insuranceDate?: InputMaybe<Scalars["Date"]["input"]>;
  insuranceDateDefault?: InputMaybe<Scalars["Date"]["input"]>;
  projectId?: InputMaybe<Scalars["String"]["input"]>;
  source?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<TaskStatus>;
  transferDate?: InputMaybe<Scalars["Date"]["input"]>;
  type?: InputMaybe<TaskType>;
  unitId?: InputMaybe<Scalars["String"]["input"]>;
  unitNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUploadFileInput = {
  fileBucket?: InputMaybe<Scalars["String"]["input"]>;
  fileExtension?: InputMaybe<Scalars["String"]["input"]>;
  fileFolder?: InputMaybe<Scalars["String"]["input"]>;
  fileId?: InputMaybe<Scalars["String"]["input"]>;
  fileName?: InputMaybe<Scalars["String"]["input"]>;
  filePath?: InputMaybe<Scalars["String"]["input"]>;
  fileType?: InputMaybe<UploadFileType>;
  id: Scalars["ID"]["input"];
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
  refId?: InputMaybe<Scalars["String"]["input"]>;
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

export type UploadFile = {
  __typename?: "UploadFile";
  createdAt: Scalars["Date"]["output"];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["Date"]["output"]>;
  deletedBy?: Maybe<User>;
  fileBucket?: Maybe<Scalars["String"]["output"]>;
  fileExtension?: Maybe<Scalars["String"]["output"]>;
  fileFolder?: Maybe<Scalars["String"]["output"]>;
  fileId?: Maybe<Scalars["String"]["output"]>;
  fileName?: Maybe<Scalars["String"]["output"]>;
  filePath?: Maybe<Scalars["String"]["output"]>;
  fileType: UploadFileType;
  fileUrl: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isPublic: Scalars["Boolean"]["output"];
  refId?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["Date"]["output"];
  updatedBy?: Maybe<User>;
};

/** ประเภทของไฟล์ที่อัพโหลด */
export enum UploadFileType {
  AssignmentBefore = "ASSIGNMENT_BEFORE",
  AssignmentCompleted = "ASSIGNMENT_COMPLETED",
  AssignmentInProgress = "ASSIGNMENT_IN_PROGRESS",
  AssignmentProtection = "ASSIGNMENT_PROTECTION",
  AssignmentUploadCompleted = "ASSIGNMENT_UPLOAD_COMPLETED",
  Central = "CENTRAL",
  Customer = "CUSTOMER",
  InsuranceExpansion = "INSURANCE_EXPANSION",
  Other = "OTHER",
  Service = "SERVICE",
  Signature = "SIGNATURE",
  Task = "TASK",
}

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
