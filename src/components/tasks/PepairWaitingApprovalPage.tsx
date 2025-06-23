"use client";

import {
  SearchFilter,
  useSearchFilter,
} from "@/components/common/SearchFilter";
import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { RepairInsuranceExpandDialog } from "@/components/tasks/components/dialogs/RepairInsuranceExpandDialog";
import { Routes } from "@/config/routes";
import { TaskStatus, TaskType } from "@/gql/generated/graphql";
import {
  TaskFragment,
  TasksDocument,
  useTasksQuery,
  useUpdateClosedTaskMutation,
  useUpdateTaskMutation,
} from "@/gql/generated/tasks.generated";
import { Col, Modal, notification, Row } from "antd";
import { useRouter } from "nextjs-toploader/app";
import { useMemo, useState } from "react";
import { RepairTaskClosedDialog } from "./components/dialogs/RepairClosedDialog";
import { RepairTable } from "./components/RepairTable";

export const RepairWaitingApprovalPage = () => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const router = useRouter();
  const [openInsuranceExpandDialog, setOpenInsuranceExpandDialog] =
    useState(false);
  const [openCloseTaskDialog, setOpenCloseTaskDialog] = useState(false);
  const [task, setTask] = useState<TaskFragment | null>(null);

  const {
    searchText,
    projectId,
    unitIds,
    sources,
    checkInDate,
    createdAt,
    currentPage,
    pageSize,
    handleSearch,
  } = useSearchFilter("TasksRepairWaitingApproval");

  const variables = useMemo(() => {
    return {
      type: TaskType.Repair,
      page: currentPage,
      limit: pageSize,
      searchText,
      statuses: [TaskStatus.HomecareFinished],
      projectId,
      unitIds,
      sources: sources as string[],
      checkInDate: checkInDate as string[],
      createdAt: createdAt as string[],
    };
  }, [
    currentPage,
    pageSize,
    projectId,
    unitIds,
    searchText,
    sources,
    checkInDate,
    createdAt,
  ]);

  const { data, loading } = useTasksQuery({
    variables,
  });

  const [updateTask, { loading: updateTaskLoading }] = useUpdateTaskMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "บันทึกข้อมูลเรียบร้อย",
        duration: 3,
      });
      setOpenInsuranceExpandDialog(false);
      setTask(null);
    },
    onError: (error) => {
      notificationApi.error({
        message: "เกิดข้อผิดพลาด !!",
        description: error.message,
        duration: 5,
      });
    },
    refetchQueries: [
      {
        query: TasksDocument,
        variables,
      },
    ],
  });

  const [updateClosedTask, { loading: updateClosedTaskLoading }] =
    useUpdateClosedTaskMutation({
      onCompleted: () => {
        notificationApi.success({
          message: "สำเร็จ !!",
          description: "บันทึกข้อมูลเรียบร้อย",
          duration: 3,
        });
        setOpenCloseTaskDialog(false);
        setTask(null);
      },
      onError: (error) => {
        notificationApi.error({
          message: "เกิดข้อผิดพลาด !!",
          description: error.message,
          duration: 5,
        });
      },
      refetchQueries: [
        {
          query: TasksDocument,
          variables,
        },
      ],
    });

  const tasks = useMemo(() => data?.tasks, [data]);
  const dataSource = useMemo(() => tasks?.items, [tasks]);
  const meta = useMemo(() => tasks?.meta, [tasks]);

  return (
    <>
      {notificationContextHolder}
      {modalContextHolder}
      <LayoutWithBreadcrumb showBackButton backButtonText="รายการงานรออนุมัติ">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <SearchFilter
              route="TasksRepairWaitingApproval"
              isSearchText
              isCreateButton
              isProject
              isUnit
              isSource
              isCheckInDate
              isCreatedAt
              onCreateButtonClick={() => {
                router.push(Routes.TasksRepairCreate);
              }}
            />
          </Col>
          <Col span={24}>
            <RepairTable
              dataSource={dataSource ?? []}
              meta={meta}
              loading={loading}
              handleSearch={handleSearch}
              handleManage={(task) => {
                router.push(Routes.TasksRepairDetail(task.id));
              }}
              handleExpand={(task) => {
                setTask(task);
                setOpenInsuranceExpandDialog(true);
              }}
              handleClose={(task) => {
                setTask(task);
                setOpenCloseTaskDialog(true);
              }}
            />
          </Col>
        </Row>
        <RepairInsuranceExpandDialog
          open={openInsuranceExpandDialog}
          onCancel={() => setOpenInsuranceExpandDialog(false)}
          confirmLoading={updateTaskLoading}
          task={task}
          onSubmit={async (values) => {
            if (!task) return;
            await modalApi.confirm({
              title: "ยืนยันการขยายประกัน",
              content: "ยืนยันการขยายประกันห้องนี้หรือไม่",
              okText: "ยืนยัน",
              cancelText: "ยกเลิก",
              onOk: async () => {
                await updateTask({
                  variables: {
                    updateTaskInput: {
                      id: task.id,
                      status: task.status?.id,
                      insuranceDate: values.insuranceDate,
                    },
                  },
                });
              },
            });
          }}
        />
        <RepairTaskClosedDialog
          open={openCloseTaskDialog}
          onCancel={() => setOpenCloseTaskDialog(false)}
          confirmLoading={updateClosedTaskLoading}
          task={task}
          onSubmit={async (values) => {
            if (!task) return;
            await modalApi.confirm({
              title: "ยืนยันการปิดงาน",
              content: "ยืนยันการปิดงานห้องนี้หรือไม่",
              okText: "ยืนยัน",
              cancelText: "ยกเลิก",
              onOk: async () => {
                await updateClosedTask({
                  variables: {
                    closedRemark: values.remark,
                    id: task.id,
                  },
                });
              },
            });
          }}
        />
      </LayoutWithBreadcrumb>
    </>
  );
};
