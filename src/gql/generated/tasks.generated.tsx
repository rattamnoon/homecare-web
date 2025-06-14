import * as Types from "./graphql";

import { gql } from "@apollo/client";
import { MasterFragmentDoc } from "./master.generated";
import {
  IPaginateMetaFragmentDoc,
  IPaginateLinksFragmentDoc,
} from "./paginate.generated";
import { UserFragmentDoc } from "./user.generated";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type TaskStatusFragment = {
  __typename?: "TaskStatusDto";
  id: Types.TaskStatus;
  nameTh: string;
  nameEn: string;
  color: string;
};

export type TaskSourceFragment = {
  __typename?: "TaskSourceDto";
  id: string;
  nameTh: string;
  nameEn: string;
  color?: string | null;
};

export type TaskRangeTimeFragment = {
  __typename?: "TaskRangeTimeDto";
  id: string;
  nameTh: string;
  nameEn: string;
};

export type TaskFragment = {
  __typename?: "Task";
  id: string;
  code: string;
  projectId: string;
  unitId?: string | null;
  unitNumber?: string | null;
  customerName?: string | null;
  customerPhone?: string | null;
  checkInDate?: Date | null;
  insuranceDateDefault?: Date | null;
  insuranceDate?: Date | null;
  transferDate?: Date | null;
  customerRequestedRepairDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  status: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  };
  source?: {
    __typename?: "TaskSourceDto";
    id: string;
    nameTh: string;
    nameEn: string;
    color?: string | null;
  } | null;
  checkInRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
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
  } | null;
  building?: {
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
  } | null;
  floor?: {
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
  } | null;
  details: Array<{ __typename?: "TaskDetail"; id: string; code: string }>;
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
  sources?: Types.InputMaybe<
    Array<Types.Scalars["String"]["input"]> | Types.Scalars["String"]["input"]
  >;
  checkInDate?: Types.InputMaybe<
    Array<Types.Scalars["String"]["input"]> | Types.Scalars["String"]["input"]
  >;
  createdAt?: Types.InputMaybe<
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
      checkInDate?: Date | null;
      insuranceDateDefault?: Date | null;
      insuranceDate?: Date | null;
      transferDate?: Date | null;
      customerRequestedRepairDate?: Date | null;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
      status: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameTh: string;
        nameEn: string;
        color: string;
      };
      source?: {
        __typename?: "TaskSourceDto";
        id: string;
        nameTh: string;
        nameEn: string;
        color?: string | null;
      } | null;
      checkInRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
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
      } | null;
      building?: {
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
      } | null;
      floor?: {
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
      } | null;
      details: Array<{ __typename?: "TaskDetail"; id: string; code: string }>;
    }>;
  };
};

export type UploadFileFragment = {
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
};

export type TaskDetailAssignFragment = {
  __typename?: "TaskDetailAssign";
  id: string;
  code: string;
  status?: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  } | null;
  staffStatus?: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  } | null;
  staff?: {
    __typename?: "User";
    id: string;
    employeeId: string;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
  requestRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  reAssignRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  finishType?: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  } | null;
  images: Array<{
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

export type TaskDetailFragment = {
  __typename?: "TaskDetail";
  id: string;
  taskId: string;
  code: string;
  priority?: number | null;
  description?: string | null;
  categoryId?: string | null;
  subCategoryId?: string | null;
  slaId?: string | null;
  causeId?: string | null;
  contractorId?: string | null;
  homecareId?: string | null;
  homecareInDate?: Date | null;
  homecareComment?: string | null;
  assignInDate?: Date | null;
  appointmentDate?: Date | null;
  appointmentTime?: string | null;
  appointmentRepairDate?: Date | null;
  appointmentRepairTime?: string | null;
  appointmentRepairComment?: string | null;
  callingDate?: Date | null;
  assignDate?: Date | null;
  inProgressDate?: Date | null;
  reProcessDate?: Date | null;
  finishDate?: Date | null;
  closeDate?: Date | null;
  isCSAT?: boolean | null;
  CSATComment?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  status?: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  } | null;
  homecareStatus?: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  } | null;
  homecareInRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  assignRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  images: Array<{
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
  category?: {
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
  } | null;
  subCategory?: {
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
  } | null;
  homecare?: {
    __typename?: "User";
    id: string;
    employeeId: string;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    lastLoginAt: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  } | null;
  cause?: {
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
  } | null;
  contractor?: {
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
  } | null;
  sla?: {
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
    parent?: {
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
    } | null;
  } | null;
  assigns: Array<{
    __typename?: "TaskDetailAssign";
    id: string;
    code: string;
    status?: {
      __typename?: "TaskStatusDto";
      id: Types.TaskStatus;
      nameTh: string;
      nameEn: string;
      color: string;
    } | null;
    staffStatus?: {
      __typename?: "TaskStatusDto";
      id: Types.TaskStatus;
      nameTh: string;
      nameEn: string;
      color: string;
    } | null;
    staff?: {
      __typename?: "User";
      id: string;
      employeeId: string;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
    requestRangeTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    reAssignRangeTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    finishType?: {
      __typename?: "TaskStatusDto";
      id: Types.TaskStatus;
      nameTh: string;
      nameEn: string;
      color: string;
    } | null;
    images: Array<{
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

export type TaskQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type TaskQuery = {
  __typename?: "Query";
  task: {
    __typename?: "Task";
    id: string;
    code: string;
    projectId: string;
    unitId?: string | null;
    unitNumber?: string | null;
    customerName?: string | null;
    customerPhone?: string | null;
    checkInDate?: Date | null;
    insuranceDateDefault?: Date | null;
    insuranceDate?: Date | null;
    transferDate?: Date | null;
    customerRequestedRepairDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    details: Array<{
      __typename?: "TaskDetail";
      id: string;
      code: string;
      taskId: string;
      priority?: number | null;
      description?: string | null;
      categoryId?: string | null;
      subCategoryId?: string | null;
      slaId?: string | null;
      causeId?: string | null;
      contractorId?: string | null;
      homecareId?: string | null;
      homecareInDate?: Date | null;
      homecareComment?: string | null;
      assignInDate?: Date | null;
      appointmentDate?: Date | null;
      appointmentTime?: string | null;
      appointmentRepairDate?: Date | null;
      appointmentRepairTime?: string | null;
      appointmentRepairComment?: string | null;
      callingDate?: Date | null;
      assignDate?: Date | null;
      inProgressDate?: Date | null;
      reProcessDate?: Date | null;
      finishDate?: Date | null;
      closeDate?: Date | null;
      isCSAT?: boolean | null;
      CSATComment?: string | null;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
      status?: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameTh: string;
        nameEn: string;
        color: string;
      } | null;
      homecareStatus?: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameTh: string;
        nameEn: string;
        color: string;
      } | null;
      homecareInRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      assignRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      images: Array<{
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
      category?: {
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
      } | null;
      subCategory?: {
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
      } | null;
      homecare?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        username: string;
        firstName?: string | null;
        lastName?: string | null;
        email: string;
        lastLoginAt: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
      } | null;
      cause?: {
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
      } | null;
      contractor?: {
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
      } | null;
      sla?: {
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
        parent?: {
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
        } | null;
      } | null;
      assigns: Array<{
        __typename?: "TaskDetailAssign";
        id: string;
        code: string;
        status?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        staffStatus?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        staff?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
        requestRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        reAssignRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        finishType?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        images: Array<{
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
    }>;
    status: {
      __typename?: "TaskStatusDto";
      id: Types.TaskStatus;
      nameTh: string;
      nameEn: string;
      color: string;
    };
    source?: {
      __typename?: "TaskSourceDto";
      id: string;
      nameTh: string;
      nameEn: string;
      color?: string | null;
    } | null;
    checkInRangeTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
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
    } | null;
    building?: {
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
    } | null;
    floor?: {
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
    } | null;
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

export type CreateTaskMutationVariables = Types.Exact<{
  createTaskInput: Types.CreateTaskInput;
  createTaskDetailInput:
    | Array<Types.CreateTaskDetailInput>
    | Types.CreateTaskDetailInput;
}>;

export type CreateTaskMutation = {
  __typename?: "Mutation";
  createTask: {
    __typename?: "Task";
    id: string;
    code: string;
    projectId: string;
    unitId?: string | null;
    unitNumber?: string | null;
    customerName?: string | null;
    customerPhone?: string | null;
    checkInDate?: Date | null;
    insuranceDateDefault?: Date | null;
    insuranceDate?: Date | null;
    transferDate?: Date | null;
    customerRequestedRepairDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    status: {
      __typename?: "TaskStatusDto";
      id: Types.TaskStatus;
      nameTh: string;
      nameEn: string;
      color: string;
    };
    source?: {
      __typename?: "TaskSourceDto";
      id: string;
      nameTh: string;
      nameEn: string;
      color?: string | null;
    } | null;
    checkInRangeTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
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
    } | null;
    building?: {
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
    } | null;
    floor?: {
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
    } | null;
    details: Array<{ __typename?: "TaskDetail"; id: string; code: string }>;
  };
};

export const TaskStatusFragmentDoc = gql`
  fragment TaskStatus on TaskStatusDto {
    id
    nameTh
    nameEn
    color
  }
`;
export const TaskSourceFragmentDoc = gql`
  fragment TaskSource on TaskSourceDto {
    id
    nameTh
    nameEn
    color
  }
`;
export const TaskRangeTimeFragmentDoc = gql`
  fragment TaskRangeTime on TaskRangeTimeDto {
    id
    nameTh
    nameEn
  }
`;
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    code
    projectId
    unitId
    unitNumber
    status {
      ...TaskStatus
    }
    source {
      ...TaskSource
    }
    customerName
    customerPhone
    checkInDate
    checkInRangeTime {
      ...TaskRangeTime
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
      ...Master
    }
    building {
      ...Master
    }
    floor {
      ...Master
    }
    details {
      id
      code
    }
  }
  ${TaskStatusFragmentDoc}
  ${TaskSourceFragmentDoc}
  ${TaskRangeTimeFragmentDoc}
  ${MasterFragmentDoc}
`;
export const TaskStatusDtoFragmentDoc = gql`
  fragment TaskStatusDto on TaskStatusDto {
    id
    nameEn
    nameTh
    color
  }
`;
export const UploadFileFragmentDoc = gql`
  fragment UploadFile on UploadFile {
    id
    refId
    fileId
    fileType
    fileName
    fileFolder
    filePath
    fileBucket
    fileExtension
    fileUrl
    isPublic
    createdAt
    updatedAt
    deletedAt
  }
`;
export const TaskDetailAssignFragmentDoc = gql`
  fragment TaskDetailAssign on TaskDetailAssign {
    id
    code
    status {
      ...TaskStatus
    }
    staffStatus {
      ...TaskStatus
    }
    staff {
      id
      employeeId
      firstName
      lastName
    }
    requestRangeTime {
      ...TaskRangeTime
    }
    reAssignRangeTime {
      ...TaskRangeTime
    }
    finishType {
      ...TaskStatus
    }
    images {
      ...UploadFile
    }
  }
  ${TaskStatusFragmentDoc}
  ${TaskRangeTimeFragmentDoc}
  ${UploadFileFragmentDoc}
`;
export const TaskDetailFragmentDoc = gql`
  fragment TaskDetail on TaskDetail {
    id
    taskId
    code
    status {
      ...TaskStatus
    }
    homecareStatus {
      ...TaskStatus
    }
    priority
    description
    categoryId
    subCategoryId
    slaId
    causeId
    contractorId
    homecareId
    homecareInDate
    homecareComment
    assignInDate
    appointmentDate
    appointmentTime
    appointmentRepairDate
    appointmentRepairTime
    appointmentRepairComment
    callingDate
    assignDate
    inProgressDate
    reProcessDate
    finishDate
    closeDate
    isCSAT
    CSATComment
    createdAt
    updatedAt
    deletedAt
    homecareInRangeTime {
      ...TaskRangeTime
    }
    assignRangeTime {
      ...TaskRangeTime
    }
    images {
      ...UploadFile
    }
    category {
      ...Master
    }
    subCategory {
      ...Master
    }
    homecare {
      ...User
    }
    cause {
      ...Master
    }
    contractor {
      ...Master
    }
    sla {
      ...Master
      parent {
        ...Master
      }
    }
    assigns {
      ...TaskDetailAssign
    }
  }
  ${TaskStatusFragmentDoc}
  ${TaskRangeTimeFragmentDoc}
  ${UploadFileFragmentDoc}
  ${MasterFragmentDoc}
  ${UserFragmentDoc}
  ${TaskDetailAssignFragmentDoc}
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
    $sources: [String!]
    $checkInDate: [String!]
    $createdAt: [String!]
  ) {
    tasks(
      type: $type
      page: $page
      limit: $limit
      searchText: $searchText
      statuses: $statuses
      projectId: $projectId
      unitIds: $unitIds
      sources: $sources
      checkInDate: $checkInDate
      createdAt: $createdAt
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
 *      sources: // value for 'sources'
 *      checkInDate: // value for 'checkInDate'
 *      createdAt: // value for 'createdAt'
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
export const TaskDocument = gql`
  query Task($id: ID!) {
    task(id: $id) {
      ...Task
      details {
        ...TaskDetail
      }
    }
  }
  ${TaskFragmentDoc}
  ${TaskDetailFragmentDoc}
`;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(
  baseOptions: Apollo.QueryHookOptions<TaskQuery, TaskQueryVariables> &
    ({ variables: TaskQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
}
export function useTaskLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TaskQuery, TaskQueryVariables>(
    TaskDocument,
    options,
  );
}
export function useTaskSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<TaskQuery, TaskQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TaskQuery, TaskQueryVariables>(
    TaskDocument,
    options,
  );
}
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskSuspenseQueryHookResult = ReturnType<
  typeof useTaskSuspenseQuery
>;
export type TaskQueryResult = Apollo.QueryResult<TaskQuery, TaskQueryVariables>;
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
export const CreateTaskDocument = gql`
  mutation CreateTask(
    $createTaskInput: CreateTaskInput!
    $createTaskDetailInput: [CreateTaskDetailInput!]!
  ) {
    createTask(
      createTaskInput: $createTaskInput
      createTaskDetailInput: $createTaskDetailInput
    ) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;
export type CreateTaskMutationFn = Apollo.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      createTaskInput: // value for 'createTaskInput'
 *      createTaskDetailInput: // value for 'createTaskDetailInput'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    CreateTaskDocument,
    options,
  );
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult =
  Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
