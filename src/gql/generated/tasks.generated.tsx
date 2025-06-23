import * as Types from "./graphql";

import { gql } from "@apollo/client";
import { MasterFragmentDoc } from "./master.generated";
import {
  IPaginateMetaFragmentDoc,
  IPaginateLinksFragmentDoc,
} from "./paginate.generated";
import { UploadFileFragmentDoc } from "./upload-files.generated";
import { UserFragmentDoc } from "./user.generated";
import { CallingFragmentDoc } from "./callings.generated";
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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

export type TaskDetailAssignFragment = {
  __typename?: "TaskDetailAssign";
  id: string;
  code: string;
  SLA?: number | null;
  SLAEndDate?: Date | null;
  SLAStartDate?: Date | null;
  SLAWorkHour?: number | null;
  assetComment?: string | null;
  remark?: string | null;
  createdAt: Date;
  customerNameFinish?: string | null;
  isAssetCustomer?: boolean | null;
  requestedDate?: Date | null;
  reassignedInDate?: Date | null;
  reassignedRemark?: string | null;
  finishedDate?: Date | null;
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
  requestedRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  reassignedRangeTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  finishedType?: {
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
  createdBy?: {
    __typename?: "User";
    id: string;
    employeeId: string;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
  updatedBy?: {
    __typename?: "User";
    id: string;
    employeeId: string;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
};

export type TaskPriorityFragment = {
  __typename?: "TaskPriorityDto";
  color: string;
  id: number;
  nameEn: string;
  nameTh: string;
};

export type TaskDetailReportLogFragment = {
  __typename?: "TaskDetailReportLog";
  callbackDate?: Date | null;
  checkInDate?: Date | null;
  remark?: string | null;
  createdAt: Date;
  deletedAt?: Date | null;
  id: string;
  taskDetailAssignId?: string | null;
  taskDetailId?: string | null;
  updatedAt: Date;
  type?: {
    __typename?: "TaskStatusDto";
    id: Types.TaskStatus;
    nameTh: string;
    nameEn: string;
    color: string;
  } | null;
  checkInRangeTime?: {
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
};

export type TaskDetailFragment = {
  __typename?: "TaskDetail";
  id: string;
  taskId: string;
  code: string;
  description?: string | null;
  categoryId?: string | null;
  subCategoryId?: string | null;
  slaId?: string | null;
  causeId?: string | null;
  contractorId?: string | null;
  homecareId?: string | null;
  homecareInDate?: Date | null;
  homecareRemark?: string | null;
  assignInDate?: Date | null;
  appointmentDate?: Date | null;
  appointmentRepairDate?: Date | null;
  appointmentRepairRemark?: string | null;
  calledDate?: Date | null;
  assignedDate?: Date | null;
  inprogressDate?: Date | null;
  reinprogressId?: string | null;
  reinprogressCode?: string | null;
  reinprogressDate?: Date | null;
  isReinprogress?: boolean | null;
  finishedDate?: Date | null;
  closedDate?: Date | null;
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
  task: {
    __typename?: "Task";
    id: string;
    projectId: string;
    unitId?: string | null;
    unitNumber?: string | null;
    customerName?: string | null;
    customerPhone?: string | null;
    checkInDate?: Date | null;
    project: {
      __typename?: "Project";
      id: string;
      nameTh: string;
      nameEn: string;
    };
    unit?: {
      __typename?: "Unit";
      id: string;
      unitNumber?: string | null;
      houseNumber?: string | null;
    } | null;
    checkInRangeTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
  };
  appointmentTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
  } | null;
  appointmentRepairTime?: {
    __typename?: "TaskRangeTimeDto";
    id: string;
    nameTh: string;
    nameEn: string;
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
  priority?: {
    __typename?: "TaskPriorityDto";
    color: string;
    id: number;
    nameEn: string;
    nameTh: string;
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
    maxScore?: number | null;
    defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
    SLA?: number | null;
    SLAEndDate?: Date | null;
    SLAStartDate?: Date | null;
    SLAWorkHour?: number | null;
    assetComment?: string | null;
    remark?: string | null;
    createdAt: Date;
    customerNameFinish?: string | null;
    isAssetCustomer?: boolean | null;
    requestedDate?: Date | null;
    reassignedInDate?: Date | null;
    reassignedRemark?: string | null;
    finishedDate?: Date | null;
    logs: Array<{
      __typename?: "TaskDetailAssign";
      id: string;
      code: string;
      SLA?: number | null;
      SLAEndDate?: Date | null;
      SLAStartDate?: Date | null;
      SLAWorkHour?: number | null;
      assetComment?: string | null;
      remark?: string | null;
      createdAt: Date;
      customerNameFinish?: string | null;
      isAssetCustomer?: boolean | null;
      requestedDate?: Date | null;
      reassignedInDate?: Date | null;
      reassignedRemark?: string | null;
      finishedDate?: Date | null;
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
      requestedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      reassignedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      finishedType?: {
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
      createdBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
      updatedBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    }>;
    reportLogs: Array<{
      __typename?: "TaskDetailReportLog";
      callbackDate?: Date | null;
      checkInDate?: Date | null;
      remark?: string | null;
      createdAt: Date;
      deletedAt?: Date | null;
      id: string;
      taskDetailAssignId?: string | null;
      taskDetailId?: string | null;
      updatedAt: Date;
      type?: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameTh: string;
        nameEn: string;
        color: string;
      } | null;
      checkInRangeTime?: {
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
    }>;
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
    requestedRangeTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    reassignedRangeTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    finishedType?: {
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
    createdBy?: {
      __typename?: "User";
      id: string;
      employeeId: string;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
    updatedBy?: {
      __typename?: "User";
      id: string;
      employeeId: string;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  }>;
  reportLogs: Array<{
    __typename?: "TaskDetailReportLog";
    callbackDate?: Date | null;
    checkInDate?: Date | null;
    remark?: string | null;
    createdAt: Date;
    deletedAt?: Date | null;
    id: string;
    taskDetailAssignId?: string | null;
    taskDetailId?: string | null;
    updatedAt: Date;
    type?: {
      __typename?: "TaskStatusDto";
      id: Types.TaskStatus;
      nameTh: string;
      nameEn: string;
      color: string;
    } | null;
    checkInRangeTime?: {
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
  }>;
  callings: Array<{
    __typename?: "Calling";
    id: string;
    taskDetailId: string;
    callDate: Date;
    callOrder: number;
    callComment?: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    taskDetail?: { __typename?: "TaskDetail"; id: string; code: string } | null;
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
      description?: string | null;
      categoryId?: string | null;
      subCategoryId?: string | null;
      slaId?: string | null;
      causeId?: string | null;
      contractorId?: string | null;
      homecareId?: string | null;
      homecareInDate?: Date | null;
      homecareRemark?: string | null;
      assignInDate?: Date | null;
      appointmentDate?: Date | null;
      appointmentRepairDate?: Date | null;
      appointmentRepairRemark?: string | null;
      calledDate?: Date | null;
      assignedDate?: Date | null;
      inprogressDate?: Date | null;
      reinprogressId?: string | null;
      reinprogressCode?: string | null;
      reinprogressDate?: Date | null;
      isReinprogress?: boolean | null;
      finishedDate?: Date | null;
      closedDate?: Date | null;
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
      task: {
        __typename?: "Task";
        id: string;
        projectId: string;
        unitId?: string | null;
        unitNumber?: string | null;
        customerName?: string | null;
        customerPhone?: string | null;
        checkInDate?: Date | null;
        project: {
          __typename?: "Project";
          id: string;
          nameTh: string;
          nameEn: string;
        };
        unit?: {
          __typename?: "Unit";
          id: string;
          unitNumber?: string | null;
          houseNumber?: string | null;
        } | null;
        checkInRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
      };
      appointmentTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      appointmentRepairTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
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
      priority?: {
        __typename?: "TaskPriorityDto";
        color: string;
        id: number;
        nameEn: string;
        nameTh: string;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
          maxScore?: number | null;
          defaultScore?: number | null;
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
        SLA?: number | null;
        SLAEndDate?: Date | null;
        SLAStartDate?: Date | null;
        SLAWorkHour?: number | null;
        assetComment?: string | null;
        remark?: string | null;
        createdAt: Date;
        customerNameFinish?: string | null;
        isAssetCustomer?: boolean | null;
        requestedDate?: Date | null;
        reassignedInDate?: Date | null;
        reassignedRemark?: string | null;
        finishedDate?: Date | null;
        logs: Array<{
          __typename?: "TaskDetailAssign";
          id: string;
          code: string;
          SLA?: number | null;
          SLAEndDate?: Date | null;
          SLAStartDate?: Date | null;
          SLAWorkHour?: number | null;
          assetComment?: string | null;
          remark?: string | null;
          createdAt: Date;
          customerNameFinish?: string | null;
          isAssetCustomer?: boolean | null;
          requestedDate?: Date | null;
          reassignedInDate?: Date | null;
          reassignedRemark?: string | null;
          finishedDate?: Date | null;
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
          requestedRangeTime?: {
            __typename?: "TaskRangeTimeDto";
            id: string;
            nameTh: string;
            nameEn: string;
          } | null;
          reassignedRangeTime?: {
            __typename?: "TaskRangeTimeDto";
            id: string;
            nameTh: string;
            nameEn: string;
          } | null;
          finishedType?: {
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
          createdBy?: {
            __typename?: "User";
            id: string;
            employeeId: string;
            firstName?: string | null;
            lastName?: string | null;
          } | null;
          updatedBy?: {
            __typename?: "User";
            id: string;
            employeeId: string;
            firstName?: string | null;
            lastName?: string | null;
          } | null;
        }>;
        reportLogs: Array<{
          __typename?: "TaskDetailReportLog";
          callbackDate?: Date | null;
          checkInDate?: Date | null;
          remark?: string | null;
          createdAt: Date;
          deletedAt?: Date | null;
          id: string;
          taskDetailAssignId?: string | null;
          taskDetailId?: string | null;
          updatedAt: Date;
          type?: {
            __typename?: "TaskStatusDto";
            id: Types.TaskStatus;
            nameTh: string;
            nameEn: string;
            color: string;
          } | null;
          checkInRangeTime?: {
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
        }>;
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
        requestedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        reassignedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        finishedType?: {
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
        createdBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
        updatedBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      }>;
      reportLogs: Array<{
        __typename?: "TaskDetailReportLog";
        callbackDate?: Date | null;
        checkInDate?: Date | null;
        remark?: string | null;
        createdAt: Date;
        deletedAt?: Date | null;
        id: string;
        taskDetailAssignId?: string | null;
        taskDetailId?: string | null;
        updatedAt: Date;
        type?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        checkInRangeTime?: {
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
      }>;
      callings: Array<{
        __typename?: "Calling";
        id: string;
        taskDetailId: string;
        callDate: Date;
        callOrder: number;
        callComment?: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
        taskDetail?: {
          __typename?: "TaskDetail";
          id: string;
          code: string;
        } | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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

export type UpdateTaskMutationVariables = Types.Exact<{
  updateTaskInput: Types.UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
  __typename?: "Mutation";
  updateTask: {
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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

export type UpdateClosedTaskMutationVariables = Types.Exact<{
  closedRemark: Types.Scalars["String"]["input"];
  id: Types.Scalars["ID"]["input"];
}>;

export type UpdateClosedTaskMutation = {
  __typename?: "Mutation";
  updateClosedTask: {
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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

export type UpdateTaskDetailMutationVariables = Types.Exact<{
  updateTaskDetailInput: Types.UpdateTaskDetailInput;
}>;

export type UpdateTaskDetailMutation = {
  __typename?: "Mutation";
  updateTaskDetail: {
    __typename?: "TaskDetail";
    id: string;
    taskId: string;
    code: string;
    description?: string | null;
    categoryId?: string | null;
    subCategoryId?: string | null;
    slaId?: string | null;
    causeId?: string | null;
    contractorId?: string | null;
    homecareId?: string | null;
    homecareInDate?: Date | null;
    homecareRemark?: string | null;
    assignInDate?: Date | null;
    appointmentDate?: Date | null;
    appointmentRepairDate?: Date | null;
    appointmentRepairRemark?: string | null;
    calledDate?: Date | null;
    assignedDate?: Date | null;
    inprogressDate?: Date | null;
    reinprogressId?: string | null;
    reinprogressCode?: string | null;
    reinprogressDate?: Date | null;
    isReinprogress?: boolean | null;
    finishedDate?: Date | null;
    closedDate?: Date | null;
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
    task: {
      __typename?: "Task";
      id: string;
      projectId: string;
      unitId?: string | null;
      unitNumber?: string | null;
      customerName?: string | null;
      customerPhone?: string | null;
      checkInDate?: Date | null;
      project: {
        __typename?: "Project";
        id: string;
        nameTh: string;
        nameEn: string;
      };
      unit?: {
        __typename?: "Unit";
        id: string;
        unitNumber?: string | null;
        houseNumber?: string | null;
      } | null;
      checkInRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
    };
    appointmentTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    appointmentRepairTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
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
    priority?: {
      __typename?: "TaskPriorityDto";
      color: string;
      id: number;
      nameEn: string;
      nameTh: string;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
      SLA?: number | null;
      SLAEndDate?: Date | null;
      SLAStartDate?: Date | null;
      SLAWorkHour?: number | null;
      assetComment?: string | null;
      remark?: string | null;
      createdAt: Date;
      customerNameFinish?: string | null;
      isAssetCustomer?: boolean | null;
      requestedDate?: Date | null;
      reassignedInDate?: Date | null;
      reassignedRemark?: string | null;
      finishedDate?: Date | null;
      logs: Array<{
        __typename?: "TaskDetailAssign";
        id: string;
        code: string;
        SLA?: number | null;
        SLAEndDate?: Date | null;
        SLAStartDate?: Date | null;
        SLAWorkHour?: number | null;
        assetComment?: string | null;
        remark?: string | null;
        createdAt: Date;
        customerNameFinish?: string | null;
        isAssetCustomer?: boolean | null;
        requestedDate?: Date | null;
        reassignedInDate?: Date | null;
        reassignedRemark?: string | null;
        finishedDate?: Date | null;
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
        requestedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        reassignedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        finishedType?: {
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
        createdBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
        updatedBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      }>;
      reportLogs: Array<{
        __typename?: "TaskDetailReportLog";
        callbackDate?: Date | null;
        checkInDate?: Date | null;
        remark?: string | null;
        createdAt: Date;
        deletedAt?: Date | null;
        id: string;
        taskDetailAssignId?: string | null;
        taskDetailId?: string | null;
        updatedAt: Date;
        type?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        checkInRangeTime?: {
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
      }>;
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
      requestedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      reassignedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      finishedType?: {
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
      createdBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
      updatedBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    }>;
    reportLogs: Array<{
      __typename?: "TaskDetailReportLog";
      callbackDate?: Date | null;
      checkInDate?: Date | null;
      remark?: string | null;
      createdAt: Date;
      deletedAt?: Date | null;
      id: string;
      taskDetailAssignId?: string | null;
      taskDetailId?: string | null;
      updatedAt: Date;
      type?: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameTh: string;
        nameEn: string;
        color: string;
      } | null;
      checkInRangeTime?: {
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
    }>;
    callings: Array<{
      __typename?: "Calling";
      id: string;
      taskDetailId: string;
      callDate: Date;
      callOrder: number;
      callComment?: string | null;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
      taskDetail?: {
        __typename?: "TaskDetail";
        id: string;
        code: string;
      } | null;
    }>;
  };
};

export type CreateTaskDetailReportLogMutationVariables = Types.Exact<{
  createTaskDetailReportLogInput: Types.CreateTaskDetailReportLogInput;
  createUploadFileInput?: Types.InputMaybe<
    Array<Types.CreateUploadFileInput> | Types.CreateUploadFileInput
  >;
}>;

export type CreateTaskDetailReportLogMutation = {
  __typename?: "Mutation";
  createTaskDetailReportLog: { __typename?: "TaskDetailReportLog"; id: string };
};

export type CreateTaskDetailReportLogWithAssignMutationVariables = Types.Exact<{
  createTaskDetailReportLogInput: Types.CreateTaskDetailReportLogInput;
  createUploadFileInput?: Types.InputMaybe<
    Array<Types.CreateUploadFileInput> | Types.CreateUploadFileInput
  >;
}>;

export type CreateTaskDetailReportLogWithAssignMutation = {
  __typename?: "Mutation";
  createTaskDetailReportLogWithAssign: {
    __typename?: "TaskDetailReportLog";
    id: string;
  };
};

export type TaskDetailsQueryVariables = Types.Exact<{
  type: Types.TaskType;
  statuses?: Types.InputMaybe<Array<Types.TaskStatus> | Types.TaskStatus>;
  searchText?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  projectId?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  unitIds?: Types.InputMaybe<
    Array<Types.Scalars["String"]["input"]> | Types.Scalars["String"]["input"]
  >;
  page: Types.Scalars["Int"]["input"];
  limit: Types.Scalars["Int"]["input"];
  isCall?: Types.InputMaybe<Types.Scalars["Boolean"]["input"]>;
  isCsat?: Types.InputMaybe<Types.Scalars["Boolean"]["input"]>;
  finishedDate?: Types.InputMaybe<
    Array<Types.Scalars["Date"]["input"]> | Types.Scalars["Date"]["input"]
  >;
}>;

export type TaskDetailsQuery = {
  __typename?: "Query";
  taskDetails: {
    __typename?: "TaskDetailPaginate";
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
      __typename?: "TaskDetail";
      id: string;
      taskId: string;
      code: string;
      description?: string | null;
      categoryId?: string | null;
      subCategoryId?: string | null;
      slaId?: string | null;
      causeId?: string | null;
      contractorId?: string | null;
      homecareId?: string | null;
      homecareInDate?: Date | null;
      homecareRemark?: string | null;
      assignInDate?: Date | null;
      appointmentDate?: Date | null;
      appointmentRepairDate?: Date | null;
      appointmentRepairRemark?: string | null;
      calledDate?: Date | null;
      assignedDate?: Date | null;
      inprogressDate?: Date | null;
      reinprogressId?: string | null;
      reinprogressCode?: string | null;
      reinprogressDate?: Date | null;
      isReinprogress?: boolean | null;
      finishedDate?: Date | null;
      closedDate?: Date | null;
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
      task: {
        __typename?: "Task";
        id: string;
        projectId: string;
        unitId?: string | null;
        unitNumber?: string | null;
        customerName?: string | null;
        customerPhone?: string | null;
        checkInDate?: Date | null;
        project: {
          __typename?: "Project";
          id: string;
          nameTh: string;
          nameEn: string;
        };
        unit?: {
          __typename?: "Unit";
          id: string;
          unitNumber?: string | null;
          houseNumber?: string | null;
        } | null;
        checkInRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
      };
      appointmentTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      appointmentRepairTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
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
      priority?: {
        __typename?: "TaskPriorityDto";
        color: string;
        id: number;
        nameEn: string;
        nameTh: string;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
          maxScore?: number | null;
          defaultScore?: number | null;
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
        SLA?: number | null;
        SLAEndDate?: Date | null;
        SLAStartDate?: Date | null;
        SLAWorkHour?: number | null;
        assetComment?: string | null;
        remark?: string | null;
        createdAt: Date;
        customerNameFinish?: string | null;
        isAssetCustomer?: boolean | null;
        requestedDate?: Date | null;
        reassignedInDate?: Date | null;
        reassignedRemark?: string | null;
        finishedDate?: Date | null;
        logs: Array<{
          __typename?: "TaskDetailAssign";
          id: string;
          code: string;
          SLA?: number | null;
          SLAEndDate?: Date | null;
          SLAStartDate?: Date | null;
          SLAWorkHour?: number | null;
          assetComment?: string | null;
          remark?: string | null;
          createdAt: Date;
          customerNameFinish?: string | null;
          isAssetCustomer?: boolean | null;
          requestedDate?: Date | null;
          reassignedInDate?: Date | null;
          reassignedRemark?: string | null;
          finishedDate?: Date | null;
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
          requestedRangeTime?: {
            __typename?: "TaskRangeTimeDto";
            id: string;
            nameTh: string;
            nameEn: string;
          } | null;
          reassignedRangeTime?: {
            __typename?: "TaskRangeTimeDto";
            id: string;
            nameTh: string;
            nameEn: string;
          } | null;
          finishedType?: {
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
          createdBy?: {
            __typename?: "User";
            id: string;
            employeeId: string;
            firstName?: string | null;
            lastName?: string | null;
          } | null;
          updatedBy?: {
            __typename?: "User";
            id: string;
            employeeId: string;
            firstName?: string | null;
            lastName?: string | null;
          } | null;
        }>;
        reportLogs: Array<{
          __typename?: "TaskDetailReportLog";
          callbackDate?: Date | null;
          checkInDate?: Date | null;
          remark?: string | null;
          createdAt: Date;
          deletedAt?: Date | null;
          id: string;
          taskDetailAssignId?: string | null;
          taskDetailId?: string | null;
          updatedAt: Date;
          type?: {
            __typename?: "TaskStatusDto";
            id: Types.TaskStatus;
            nameTh: string;
            nameEn: string;
            color: string;
          } | null;
          checkInRangeTime?: {
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
        }>;
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
        requestedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        reassignedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        finishedType?: {
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
        createdBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
        updatedBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      }>;
      reportLogs: Array<{
        __typename?: "TaskDetailReportLog";
        callbackDate?: Date | null;
        checkInDate?: Date | null;
        remark?: string | null;
        createdAt: Date;
        deletedAt?: Date | null;
        id: string;
        taskDetailAssignId?: string | null;
        taskDetailId?: string | null;
        updatedAt: Date;
        type?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        checkInRangeTime?: {
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
      }>;
      callings: Array<{
        __typename?: "Calling";
        id: string;
        taskDetailId: string;
        callDate: Date;
        callOrder: number;
        callComment?: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null;
        taskDetail?: {
          __typename?: "TaskDetail";
          id: string;
          code: string;
        } | null;
      }>;
    }>;
  };
};

export type CreateTaskDetailReinprogressMutationVariables = Types.Exact<{
  taskDetailId: Types.Scalars["String"]["input"];
}>;

export type CreateTaskDetailReinprogressMutation = {
  __typename?: "Mutation";
  createTaskDetailReinprogress: {
    __typename?: "TaskDetail";
    id: string;
    taskId: string;
    code: string;
    description?: string | null;
    categoryId?: string | null;
    subCategoryId?: string | null;
    slaId?: string | null;
    causeId?: string | null;
    contractorId?: string | null;
    homecareId?: string | null;
    homecareInDate?: Date | null;
    homecareRemark?: string | null;
    assignInDate?: Date | null;
    appointmentDate?: Date | null;
    appointmentRepairDate?: Date | null;
    appointmentRepairRemark?: string | null;
    calledDate?: Date | null;
    assignedDate?: Date | null;
    inprogressDate?: Date | null;
    reinprogressId?: string | null;
    reinprogressCode?: string | null;
    reinprogressDate?: Date | null;
    isReinprogress?: boolean | null;
    finishedDate?: Date | null;
    closedDate?: Date | null;
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
    task: {
      __typename?: "Task";
      id: string;
      projectId: string;
      unitId?: string | null;
      unitNumber?: string | null;
      customerName?: string | null;
      customerPhone?: string | null;
      checkInDate?: Date | null;
      project: {
        __typename?: "Project";
        id: string;
        nameTh: string;
        nameEn: string;
      };
      unit?: {
        __typename?: "Unit";
        id: string;
        unitNumber?: string | null;
        houseNumber?: string | null;
      } | null;
      checkInRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
    };
    appointmentTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    appointmentRepairTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
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
    priority?: {
      __typename?: "TaskPriorityDto";
      color: string;
      id: number;
      nameEn: string;
      nameTh: string;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
      SLA?: number | null;
      SLAEndDate?: Date | null;
      SLAStartDate?: Date | null;
      SLAWorkHour?: number | null;
      assetComment?: string | null;
      remark?: string | null;
      createdAt: Date;
      customerNameFinish?: string | null;
      isAssetCustomer?: boolean | null;
      requestedDate?: Date | null;
      reassignedInDate?: Date | null;
      reassignedRemark?: string | null;
      finishedDate?: Date | null;
      logs: Array<{
        __typename?: "TaskDetailAssign";
        id: string;
        code: string;
        SLA?: number | null;
        SLAEndDate?: Date | null;
        SLAStartDate?: Date | null;
        SLAWorkHour?: number | null;
        assetComment?: string | null;
        remark?: string | null;
        createdAt: Date;
        customerNameFinish?: string | null;
        isAssetCustomer?: boolean | null;
        requestedDate?: Date | null;
        reassignedInDate?: Date | null;
        reassignedRemark?: string | null;
        finishedDate?: Date | null;
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
        requestedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        reassignedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        finishedType?: {
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
        createdBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
        updatedBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      }>;
      reportLogs: Array<{
        __typename?: "TaskDetailReportLog";
        callbackDate?: Date | null;
        checkInDate?: Date | null;
        remark?: string | null;
        createdAt: Date;
        deletedAt?: Date | null;
        id: string;
        taskDetailAssignId?: string | null;
        taskDetailId?: string | null;
        updatedAt: Date;
        type?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        checkInRangeTime?: {
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
      }>;
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
      requestedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      reassignedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      finishedType?: {
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
      createdBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
      updatedBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    }>;
    reportLogs: Array<{
      __typename?: "TaskDetailReportLog";
      callbackDate?: Date | null;
      checkInDate?: Date | null;
      remark?: string | null;
      createdAt: Date;
      deletedAt?: Date | null;
      id: string;
      taskDetailAssignId?: string | null;
      taskDetailId?: string | null;
      updatedAt: Date;
      type?: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameTh: string;
        nameEn: string;
        color: string;
      } | null;
      checkInRangeTime?: {
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
    }>;
    callings: Array<{
      __typename?: "Calling";
      id: string;
      taskDetailId: string;
      callDate: Date;
      callOrder: number;
      callComment?: string | null;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
      taskDetail?: {
        __typename?: "TaskDetail";
        id: string;
        code: string;
      } | null;
    }>;
  };
};

export type CreateTaskDetailMutationVariables = Types.Exact<{
  taskId: Types.Scalars["ID"]["input"];
  createTaskDetailInput: Types.CreateTaskDetailInput;
}>;

export type CreateTaskDetailMutation = {
  __typename?: "Mutation";
  createTaskDetail: {
    __typename?: "TaskDetail";
    id: string;
    taskId: string;
    code: string;
    description?: string | null;
    categoryId?: string | null;
    subCategoryId?: string | null;
    slaId?: string | null;
    causeId?: string | null;
    contractorId?: string | null;
    homecareId?: string | null;
    homecareInDate?: Date | null;
    homecareRemark?: string | null;
    assignInDate?: Date | null;
    appointmentDate?: Date | null;
    appointmentRepairDate?: Date | null;
    appointmentRepairRemark?: string | null;
    calledDate?: Date | null;
    assignedDate?: Date | null;
    inprogressDate?: Date | null;
    reinprogressId?: string | null;
    reinprogressCode?: string | null;
    reinprogressDate?: Date | null;
    isReinprogress?: boolean | null;
    finishedDate?: Date | null;
    closedDate?: Date | null;
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
    task: {
      __typename?: "Task";
      id: string;
      projectId: string;
      unitId?: string | null;
      unitNumber?: string | null;
      customerName?: string | null;
      customerPhone?: string | null;
      checkInDate?: Date | null;
      project: {
        __typename?: "Project";
        id: string;
        nameTh: string;
        nameEn: string;
      };
      unit?: {
        __typename?: "Unit";
        id: string;
        unitNumber?: string | null;
        houseNumber?: string | null;
      } | null;
      checkInRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
    };
    appointmentTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
    } | null;
    appointmentRepairTime?: {
      __typename?: "TaskRangeTimeDto";
      id: string;
      nameTh: string;
      nameEn: string;
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
    priority?: {
      __typename?: "TaskPriorityDto";
      color: string;
      id: number;
      nameEn: string;
      nameTh: string;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
      maxScore?: number | null;
      defaultScore?: number | null;
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
        maxScore?: number | null;
        defaultScore?: number | null;
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
      SLA?: number | null;
      SLAEndDate?: Date | null;
      SLAStartDate?: Date | null;
      SLAWorkHour?: number | null;
      assetComment?: string | null;
      remark?: string | null;
      createdAt: Date;
      customerNameFinish?: string | null;
      isAssetCustomer?: boolean | null;
      requestedDate?: Date | null;
      reassignedInDate?: Date | null;
      reassignedRemark?: string | null;
      finishedDate?: Date | null;
      logs: Array<{
        __typename?: "TaskDetailAssign";
        id: string;
        code: string;
        SLA?: number | null;
        SLAEndDate?: Date | null;
        SLAStartDate?: Date | null;
        SLAWorkHour?: number | null;
        assetComment?: string | null;
        remark?: string | null;
        createdAt: Date;
        customerNameFinish?: string | null;
        isAssetCustomer?: boolean | null;
        requestedDate?: Date | null;
        reassignedInDate?: Date | null;
        reassignedRemark?: string | null;
        finishedDate?: Date | null;
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
        requestedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        reassignedRangeTime?: {
          __typename?: "TaskRangeTimeDto";
          id: string;
          nameTh: string;
          nameEn: string;
        } | null;
        finishedType?: {
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
        createdBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
        updatedBy?: {
          __typename?: "User";
          id: string;
          employeeId: string;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      }>;
      reportLogs: Array<{
        __typename?: "TaskDetailReportLog";
        callbackDate?: Date | null;
        checkInDate?: Date | null;
        remark?: string | null;
        createdAt: Date;
        deletedAt?: Date | null;
        id: string;
        taskDetailAssignId?: string | null;
        taskDetailId?: string | null;
        updatedAt: Date;
        type?: {
          __typename?: "TaskStatusDto";
          id: Types.TaskStatus;
          nameTh: string;
          nameEn: string;
          color: string;
        } | null;
        checkInRangeTime?: {
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
      }>;
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
      requestedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      reassignedRangeTime?: {
        __typename?: "TaskRangeTimeDto";
        id: string;
        nameTh: string;
        nameEn: string;
      } | null;
      finishedType?: {
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
      createdBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
      updatedBy?: {
        __typename?: "User";
        id: string;
        employeeId: string;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    }>;
    reportLogs: Array<{
      __typename?: "TaskDetailReportLog";
      callbackDate?: Date | null;
      checkInDate?: Date | null;
      remark?: string | null;
      createdAt: Date;
      deletedAt?: Date | null;
      id: string;
      taskDetailAssignId?: string | null;
      taskDetailId?: string | null;
      updatedAt: Date;
      type?: {
        __typename?: "TaskStatusDto";
        id: Types.TaskStatus;
        nameTh: string;
        nameEn: string;
        color: string;
      } | null;
      checkInRangeTime?: {
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
    }>;
    callings: Array<{
      __typename?: "Calling";
      id: string;
      taskDetailId: string;
      callDate: Date;
      callOrder: number;
      callComment?: string | null;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date | null;
      taskDetail?: {
        __typename?: "TaskDetail";
        id: string;
        code: string;
      } | null;
    }>;
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
export const TaskPriorityFragmentDoc = gql`
  fragment TaskPriority on TaskPriorityDto {
    color
    id
    nameEn
    nameTh
  }
`;
export const TaskDetailAssignFragmentDoc = gql`
  fragment TaskDetailAssign on TaskDetailAssign {
    id
    code
    SLA
    SLAEndDate
    SLAStartDate
    SLAWorkHour
    assetComment
    code
    remark
    createdAt
    customerNameFinish
    isAssetCustomer
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
    requestedDate
    requestedRangeTime {
      ...TaskRangeTime
    }
    reassignedInDate
    reassignedRemark
    reassignedRangeTime {
      ...TaskRangeTime
    }
    finishedDate
    finishedType {
      ...TaskStatus
    }
    images {
      ...UploadFile
    }
    createdBy {
      id
      employeeId
      firstName
      lastName
    }
    updatedBy {
      id
      employeeId
      firstName
      lastName
    }
  }
  ${TaskStatusFragmentDoc}
  ${TaskRangeTimeFragmentDoc}
  ${UploadFileFragmentDoc}
`;
export const TaskDetailReportLogFragmentDoc = gql`
  fragment TaskDetailReportLog on TaskDetailReportLog {
    callbackDate
    checkInDate
    remark
    createdAt
    deletedAt
    id
    taskDetailAssignId
    taskDetailId
    type {
      ...TaskStatus
    }
    updatedAt
    checkInRangeTime {
      ...TaskRangeTime
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
    task {
      id
      projectId
      unitId
      unitNumber
      project {
        id
        nameTh
        nameEn
      }
      unit {
        id
        unitNumber
        houseNumber
      }
      customerName
      customerPhone
      checkInDate
      checkInRangeTime {
        ...TaskRangeTime
      }
    }
    description
    categoryId
    subCategoryId
    slaId
    causeId
    contractorId
    homecareId
    homecareInDate
    homecareRemark
    assignInDate
    appointmentDate
    appointmentTime {
      ...TaskRangeTime
    }
    appointmentRepairDate
    appointmentRepairTime {
      ...TaskRangeTime
    }
    appointmentRepairRemark
    calledDate
    assignedDate
    inprogressDate
    reinprogressId
    reinprogressCode
    reinprogressDate
    isReinprogress
    finishedDate
    closedDate
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
    priority {
      ...TaskPriority
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
      logs {
        ...TaskDetailAssign
      }
      reportLogs {
        ...TaskDetailReportLog
      }
    }
    reportLogs {
      ...TaskDetailReportLog
    }
    callings {
      ...Calling
    }
  }
  ${TaskStatusFragmentDoc}
  ${TaskRangeTimeFragmentDoc}
  ${TaskPriorityFragmentDoc}
  ${UploadFileFragmentDoc}
  ${MasterFragmentDoc}
  ${UserFragmentDoc}
  ${TaskDetailAssignFragmentDoc}
  ${TaskDetailReportLogFragmentDoc}
  ${CallingFragmentDoc}
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
export const UpdateTaskDocument = gql`
  mutation UpdateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      updateTaskInput: // value for 'updateTaskInput'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(
    UpdateTaskDocument,
    options,
  );
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult =
  Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;
export const UpdateClosedTaskDocument = gql`
  mutation UpdateClosedTask($closedRemark: String!, $id: ID!) {
    updateClosedTask(closedRemark: $closedRemark, id: $id) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;
export type UpdateClosedTaskMutationFn = Apollo.MutationFunction<
  UpdateClosedTaskMutation,
  UpdateClosedTaskMutationVariables
>;

/**
 * __useUpdateClosedTaskMutation__
 *
 * To run a mutation, you first call `useUpdateClosedTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClosedTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClosedTaskMutation, { data, loading, error }] = useUpdateClosedTaskMutation({
 *   variables: {
 *      closedRemark: // value for 'closedRemark'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateClosedTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClosedTaskMutation,
    UpdateClosedTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateClosedTaskMutation,
    UpdateClosedTaskMutationVariables
  >(UpdateClosedTaskDocument, options);
}
export type UpdateClosedTaskMutationHookResult = ReturnType<
  typeof useUpdateClosedTaskMutation
>;
export type UpdateClosedTaskMutationResult =
  Apollo.MutationResult<UpdateClosedTaskMutation>;
export type UpdateClosedTaskMutationOptions = Apollo.BaseMutationOptions<
  UpdateClosedTaskMutation,
  UpdateClosedTaskMutationVariables
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
export const UpdateTaskDetailDocument = gql`
  mutation UpdateTaskDetail($updateTaskDetailInput: UpdateTaskDetailInput!) {
    updateTaskDetail(updateTaskDetailInput: $updateTaskDetailInput) {
      ...TaskDetail
    }
  }
  ${TaskDetailFragmentDoc}
`;
export type UpdateTaskDetailMutationFn = Apollo.MutationFunction<
  UpdateTaskDetailMutation,
  UpdateTaskDetailMutationVariables
>;

/**
 * __useUpdateTaskDetailMutation__
 *
 * To run a mutation, you first call `useUpdateTaskDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskDetailMutation, { data, loading, error }] = useUpdateTaskDetailMutation({
 *   variables: {
 *      updateTaskDetailInput: // value for 'updateTaskDetailInput'
 *   },
 * });
 */
export function useUpdateTaskDetailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTaskDetailMutation,
    UpdateTaskDetailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateTaskDetailMutation,
    UpdateTaskDetailMutationVariables
  >(UpdateTaskDetailDocument, options);
}
export type UpdateTaskDetailMutationHookResult = ReturnType<
  typeof useUpdateTaskDetailMutation
>;
export type UpdateTaskDetailMutationResult =
  Apollo.MutationResult<UpdateTaskDetailMutation>;
export type UpdateTaskDetailMutationOptions = Apollo.BaseMutationOptions<
  UpdateTaskDetailMutation,
  UpdateTaskDetailMutationVariables
>;
export const CreateTaskDetailReportLogDocument = gql`
  mutation CreateTaskDetailReportLog(
    $createTaskDetailReportLogInput: CreateTaskDetailReportLogInput!
    $createUploadFileInput: [CreateUploadFileInput!]
  ) {
    createTaskDetailReportLog(
      createTaskDetailReportLogInput: $createTaskDetailReportLogInput
      createUploadFileInput: $createUploadFileInput
    ) {
      id
    }
  }
`;
export type CreateTaskDetailReportLogMutationFn = Apollo.MutationFunction<
  CreateTaskDetailReportLogMutation,
  CreateTaskDetailReportLogMutationVariables
>;

/**
 * __useCreateTaskDetailReportLogMutation__
 *
 * To run a mutation, you first call `useCreateTaskDetailReportLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskDetailReportLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskDetailReportLogMutation, { data, loading, error }] = useCreateTaskDetailReportLogMutation({
 *   variables: {
 *      createTaskDetailReportLogInput: // value for 'createTaskDetailReportLogInput'
 *      createUploadFileInput: // value for 'createUploadFileInput'
 *   },
 * });
 */
export function useCreateTaskDetailReportLogMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskDetailReportLogMutation,
    CreateTaskDetailReportLogMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTaskDetailReportLogMutation,
    CreateTaskDetailReportLogMutationVariables
  >(CreateTaskDetailReportLogDocument, options);
}
export type CreateTaskDetailReportLogMutationHookResult = ReturnType<
  typeof useCreateTaskDetailReportLogMutation
>;
export type CreateTaskDetailReportLogMutationResult =
  Apollo.MutationResult<CreateTaskDetailReportLogMutation>;
export type CreateTaskDetailReportLogMutationOptions =
  Apollo.BaseMutationOptions<
    CreateTaskDetailReportLogMutation,
    CreateTaskDetailReportLogMutationVariables
  >;
export const CreateTaskDetailReportLogWithAssignDocument = gql`
  mutation CreateTaskDetailReportLogWithAssign(
    $createTaskDetailReportLogInput: CreateTaskDetailReportLogInput!
    $createUploadFileInput: [CreateUploadFileInput!]
  ) {
    createTaskDetailReportLogWithAssign(
      createTaskDetailReportLogInput: $createTaskDetailReportLogInput
      createUploadFileInput: $createUploadFileInput
    ) {
      id
    }
  }
`;
export type CreateTaskDetailReportLogWithAssignMutationFn =
  Apollo.MutationFunction<
    CreateTaskDetailReportLogWithAssignMutation,
    CreateTaskDetailReportLogWithAssignMutationVariables
  >;

/**
 * __useCreateTaskDetailReportLogWithAssignMutation__
 *
 * To run a mutation, you first call `useCreateTaskDetailReportLogWithAssignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskDetailReportLogWithAssignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskDetailReportLogWithAssignMutation, { data, loading, error }] = useCreateTaskDetailReportLogWithAssignMutation({
 *   variables: {
 *      createTaskDetailReportLogInput: // value for 'createTaskDetailReportLogInput'
 *      createUploadFileInput: // value for 'createUploadFileInput'
 *   },
 * });
 */
export function useCreateTaskDetailReportLogWithAssignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskDetailReportLogWithAssignMutation,
    CreateTaskDetailReportLogWithAssignMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTaskDetailReportLogWithAssignMutation,
    CreateTaskDetailReportLogWithAssignMutationVariables
  >(CreateTaskDetailReportLogWithAssignDocument, options);
}
export type CreateTaskDetailReportLogWithAssignMutationHookResult = ReturnType<
  typeof useCreateTaskDetailReportLogWithAssignMutation
>;
export type CreateTaskDetailReportLogWithAssignMutationResult =
  Apollo.MutationResult<CreateTaskDetailReportLogWithAssignMutation>;
export type CreateTaskDetailReportLogWithAssignMutationOptions =
  Apollo.BaseMutationOptions<
    CreateTaskDetailReportLogWithAssignMutation,
    CreateTaskDetailReportLogWithAssignMutationVariables
  >;
export const TaskDetailsDocument = gql`
  query TaskDetails(
    $type: TaskType!
    $statuses: [TaskStatus!]
    $searchText: String
    $projectId: String
    $unitIds: [String!]
    $page: Int!
    $limit: Int!
    $isCall: Boolean
    $isCsat: Boolean
    $finishedDate: [Date!]
  ) {
    taskDetails(
      type: $type
      statuses: $statuses
      searchText: $searchText
      projectId: $projectId
      unitIds: $unitIds
      page: $page
      limit: $limit
      isCall: $isCall
      isCSAT: $isCsat
      finishedDate: $finishedDate
    ) {
      meta {
        ...IPaginateMeta
      }
      links {
        ...IPaginateLinks
      }
      items {
        ...TaskDetail
      }
    }
  }
  ${IPaginateMetaFragmentDoc}
  ${IPaginateLinksFragmentDoc}
  ${TaskDetailFragmentDoc}
`;

/**
 * __useTaskDetailsQuery__
 *
 * To run a query within a React component, call `useTaskDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskDetailsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      statuses: // value for 'statuses'
 *      searchText: // value for 'searchText'
 *      projectId: // value for 'projectId'
 *      unitIds: // value for 'unitIds'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      isCall: // value for 'isCall'
 *      isCsat: // value for 'isCsat'
 *      finishedDate: // value for 'finishedDate'
 *   },
 * });
 */
export function useTaskDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    TaskDetailsQuery,
    TaskDetailsQueryVariables
  > &
    (
      | { variables: TaskDetailsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TaskDetailsQuery, TaskDetailsQueryVariables>(
    TaskDetailsDocument,
    options,
  );
}
export function useTaskDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TaskDetailsQuery,
    TaskDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TaskDetailsQuery, TaskDetailsQueryVariables>(
    TaskDetailsDocument,
    options,
  );
}
export function useTaskDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TaskDetailsQuery,
        TaskDetailsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TaskDetailsQuery, TaskDetailsQueryVariables>(
    TaskDetailsDocument,
    options,
  );
}
export type TaskDetailsQueryHookResult = ReturnType<typeof useTaskDetailsQuery>;
export type TaskDetailsLazyQueryHookResult = ReturnType<
  typeof useTaskDetailsLazyQuery
>;
export type TaskDetailsSuspenseQueryHookResult = ReturnType<
  typeof useTaskDetailsSuspenseQuery
>;
export type TaskDetailsQueryResult = Apollo.QueryResult<
  TaskDetailsQuery,
  TaskDetailsQueryVariables
>;
export const CreateTaskDetailReinprogressDocument = gql`
  mutation CreateTaskDetailReinprogress($taskDetailId: String!) {
    createTaskDetailReinprogress(taskDetailId: $taskDetailId) {
      ...TaskDetail
    }
  }
  ${TaskDetailFragmentDoc}
`;
export type CreateTaskDetailReinprogressMutationFn = Apollo.MutationFunction<
  CreateTaskDetailReinprogressMutation,
  CreateTaskDetailReinprogressMutationVariables
>;

/**
 * __useCreateTaskDetailReinprogressMutation__
 *
 * To run a mutation, you first call `useCreateTaskDetailReinprogressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskDetailReinprogressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskDetailReinprogressMutation, { data, loading, error }] = useCreateTaskDetailReinprogressMutation({
 *   variables: {
 *      taskDetailId: // value for 'taskDetailId'
 *   },
 * });
 */
export function useCreateTaskDetailReinprogressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskDetailReinprogressMutation,
    CreateTaskDetailReinprogressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTaskDetailReinprogressMutation,
    CreateTaskDetailReinprogressMutationVariables
  >(CreateTaskDetailReinprogressDocument, options);
}
export type CreateTaskDetailReinprogressMutationHookResult = ReturnType<
  typeof useCreateTaskDetailReinprogressMutation
>;
export type CreateTaskDetailReinprogressMutationResult =
  Apollo.MutationResult<CreateTaskDetailReinprogressMutation>;
export type CreateTaskDetailReinprogressMutationOptions =
  Apollo.BaseMutationOptions<
    CreateTaskDetailReinprogressMutation,
    CreateTaskDetailReinprogressMutationVariables
  >;
export const CreateTaskDetailDocument = gql`
  mutation CreateTaskDetail(
    $taskId: ID!
    $createTaskDetailInput: CreateTaskDetailInput!
  ) {
    createTaskDetail(
      taskId: $taskId
      createTaskDetailInput: $createTaskDetailInput
    ) {
      ...TaskDetail
    }
  }
  ${TaskDetailFragmentDoc}
`;
export type CreateTaskDetailMutationFn = Apollo.MutationFunction<
  CreateTaskDetailMutation,
  CreateTaskDetailMutationVariables
>;

/**
 * __useCreateTaskDetailMutation__
 *
 * To run a mutation, you first call `useCreateTaskDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskDetailMutation, { data, loading, error }] = useCreateTaskDetailMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      createTaskDetailInput: // value for 'createTaskDetailInput'
 *   },
 * });
 */
export function useCreateTaskDetailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskDetailMutation,
    CreateTaskDetailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTaskDetailMutation,
    CreateTaskDetailMutationVariables
  >(CreateTaskDetailDocument, options);
}
export type CreateTaskDetailMutationHookResult = ReturnType<
  typeof useCreateTaskDetailMutation
>;
export type CreateTaskDetailMutationResult =
  Apollo.MutationResult<CreateTaskDetailMutation>;
export type CreateTaskDetailMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskDetailMutation,
  CreateTaskDetailMutationVariables
>;
