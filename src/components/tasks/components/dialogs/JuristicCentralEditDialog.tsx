import { CustomFormItem } from "@/components/common/CustomFormItem";
import {
  MasterType,
  TaskStatus,
  UploadFileType,
} from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  AllReportLogsDocument,
  TaskDetailFragment,
  useAllReportLogsQuery,
  useCreateTaskDetailReportLogMutation,
} from "@/gql/generated/tasks.generated";
import { useAllUsersQuery } from "@/gql/generated/user.generated";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  faMessage,
  faPaperclip,
  faSave,
  faUpload,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  List,
  notification,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { RepairImagePreview } from "../RepairImagePreview";

const { Text } = Typography;

export const getIsJuristicCentralDisabled = (status?: TaskStatus | null) => {
  switch (status) {
    case TaskStatus.Closed:
    case TaskStatus.Finished:
    case TaskStatus.FinishByProject:
      return true;
    default:
      return false;
  }
};

const schema = z.object({
  code: z.string({ message: "กรุณากรอกรหัส" }),
  status: z.nativeEnum(TaskStatus, {
    message: "กรุณาเลือกสถานะ",
  }),
  description: z.string().optional().nullable(),
  categoryId: z.string({ message: "กรุณาเลือกหลัก" }),
  subCategoryId: z.string({ message: "กรุณาเลือกรายการ" }),
  homecareId: z.string({ message: "กรุณาเลือกผู้รับผิดชอบ" }),
  appointmentDate: z.date({ message: "กรุณากรอกวันเวลา" }),
  appointmentTime: z.string({ message: "กรุณากรอกวันเวลา" }),
  appointmentRepairDate: z.date({ message: "กรุณากรอกวันเวลา" }),
  appointmentRepairTime: z.string({ message: "กรุณากรอกวันเวลา" }),
  images: z.array(z.custom<UploadFile>()).optional(),
});

const statusOptions = (currentStatus?: TaskStatus | null) => {
  return [
    {
      label: "Open",
      value: TaskStatus.Open,
    },
    {
      label: "Assigned",
      value: TaskStatus.Assigned,
    },
    {
      label: "In Progress",
      value: TaskStatus.InProgress,
    },
    {
      label: "Finished",
      value: TaskStatus.Finished,
    },
    {
      label: "Finish By Project",
      value: TaskStatus.FinishByProject,
    },
    {
      label: "Re-In Progress",
      value: TaskStatus.ReInProgress,
    },
    {
      label: "Closed",
      value: TaskStatus.Closed,
    },
  ].reduce((acc, curr) => {
    if (curr.value === TaskStatus.Open) {
      return [...acc, { ...curr, disabled: true }];
    }

    if (
      curr.value === TaskStatus.Assigned &&
      currentStatus === TaskStatus.InProgress
    ) {
      return [...acc, { ...curr, disabled: true }];
    }

    if (curr.value === TaskStatus.Closed) {
      return [...acc, { ...curr, disabled: true }];
    }

    return [...acc, curr];
  }, [] as { label: string; value: TaskStatus; disabled?: boolean }[]);
};

interface JuristicCentralEditDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  taskDetail?: TaskDetailFragment | null;
}

const DividerWithIconTitle = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <Divider plain orientation="left">
      <Space>
        {icon}
        <Text strong>{title}</Text>
      </Space>
    </Divider>
  );
};

const CaseUpdateThread = ({
  isDisabled,
  taskDetailId,
}: {
  isDisabled: boolean;
  taskDetailId: string;
}) => {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const { control, handleSubmit } = useForm<{ remark?: string | null }>({
    mode: "onChange",
    resolver: zodResolver(
      z.object({ remark: z.string().optional().nullable() })
    ),
  });

  const { data: reportLogsData, loading: reportLogsLoading } =
    useAllReportLogsQuery({
      variables: {
        taskDetailId,
      },
      skip: !taskDetailId,
    });

  const [
    createTaskDetailReportLog,
    { loading: createTaskDetailReportLogLoading },
  ] = useCreateTaskDetailReportLogMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "บันทึกข้อมูลเรียบร้อย",
        duration: 3,
      });
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
        query: AllReportLogsDocument,
        variables: { taskDetailId },
      },
    ],
  });

  const reportLogs = useMemo(() => {
    return reportLogsData?.allReportLogs ?? [];
  }, [reportLogsData]);

  const onSubmit = async (data: { remark?: string | null }) => {
    await createTaskDetailReportLog({
      variables: {
        createTaskDetailReportLogInput: {
          taskDetailId,
          remark: data.remark,
        },
      },
    });
  };

  return (
    <>
      {notificationContextHolder}
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24}>
          <List
            size="small"
            rowKey={(item) => item.id}
            dataSource={reportLogs}
            loading={reportLogsLoading}
            renderItem={(item) => (
              <List.Item style={{ padding: 0, margin: 0, border: "none" }}>
                <Flex gap={8}>
                  <Text strong style={{ fontSize: 12 }}>
                    {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.remark}
                  </Text>
                </Flex>
              </List.Item>
            )}
          />
        </Col>
        {!isDisabled && (
          <Col xs={24} sm={24}>
            <Controller
              control={control}
              name="remark"
              render={({ field, fieldState: { error } }) => (
                <CustomFormItem
                  label="ข้อมูลเพิ่มเติม"
                  labelCol={{ span: 24 }}
                  required={false}
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input.TextArea
                    {...field}
                    placeholder="ข้อมูลเพิ่มเติม"
                    value={field.value || ""}
                    disabled={isDisabled}
                  />
                </CustomFormItem>
              )}
            />
          </Col>
        )}
        {!isDisabled && (
          <Col xs={24} sm={24}>
            <Button
              variant="solid"
              color="primary"
              size="small"
              onClick={handleSubmit(onSubmit)}
              disabled={isDisabled}
              icon={<FontAwesomeIcon icon={faSave} />}
              loading={createTaskDetailReportLogLoading}
            >
              บันทึก
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export const JuristicCentralEditDialog = ({
  open,
  onCancel,
  onSubmit,
  taskDetail,
}: JuristicCentralEditDialogProps) => {
  const { control, handleSubmit, watch, setValue } = useForm<
    z.infer<typeof schema>
  >({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const categoryId = watch("categoryId");
  const subCategoryId = watch("subCategoryId");

  const uploadFile = useFileUpload("file", "central/form-attachment");

  const { data: mastersData, loading: mastersLoading } = useMastersQuery({
    variables: {
      types: [
        MasterType.Central,
        MasterType.Area,
        MasterType.Building,
        MasterType.Floor,
      ],
    },
    skip: !open,
  });

  const { data: options, loading: optionsLoading } = useTaskOptionsQuery({
    skip: !open,
  });

  const { data: usersData, loading: usersLoading } = useAllUsersQuery({
    skip: !open,
  });

  const masters = useMemo(() => mastersData?.masters || [], [mastersData]);
  const users = useMemo(() => usersData?.allUsers || [], [usersData]);

  const categoryOptions = useMemo(() => {
    return masters
      .filter((master) => master.type === MasterType.Central)
      .map((master) => ({
        label: master.nameTh,
        value: master.id,
      }));
  }, [masters]);

  const subCategoryOptions = useMemo(() => {
    if (!categoryId) return [];

    return masters
      .filter((master) => master.type === MasterType.Central)
      .filter((master) => master.id === categoryId)
      .map((master) => master.children)
      .flat()
      .map((child) => ({
        label: child.nameTh,
        value: child.id,
      }));
  }, [categoryId, masters]);

  useEffect(() => {
    if (taskDetail) {
      if (taskDetail.status) {
        setValue("status", taskDetail.status.id);
      }
      if (taskDetail.categoryId) {
        setValue("categoryId", taskDetail.categoryId);
      }
      if (taskDetail.subCategoryId) {
        setValue("subCategoryId", taskDetail.subCategoryId);
      }
      if (taskDetail.homecareId) {
        setValue("homecareId", taskDetail.homecareId);
      }
      if (taskDetail.description) {
        setValue("description", taskDetail.description);
      }
      if (taskDetail.appointmentDate) {
        setValue("appointmentDate", taskDetail.appointmentDate);
      }
      if (taskDetail.appointmentTime) {
        setValue("appointmentTime", taskDetail.appointmentTime.id);
      }
      if (taskDetail.appointmentRepairDate) {
        setValue("appointmentRepairDate", taskDetail.appointmentRepairDate);
      }
      if (taskDetail.appointmentRepairTime) {
        setValue("appointmentRepairTime", taskDetail.appointmentRepairTime.id);
      }
    }
  }, [taskDetail, setValue]);

  const sla = useMemo(() => {
    const category = masters.find((master) => master.id === categoryId);
    const subCategory = category?.children.find(
      (child) => child.id === subCategoryId
    );

    if (!subCategory) return null;

    return `${subCategory.SLA1H} ชั่วโมง หรือ ${subCategory.SLA1D} วัน`;
  }, [categoryId, subCategoryId, masters]);

  const isDisabled = getIsJuristicCentralDisabled(taskDetail?.status?.id);

  const images = useMemo(() => {
    return (taskDetail?.images ?? []).filter(
      (image) => image.fileType === UploadFileType.CentralFormAttachment
    );
  }, [taskDetail]);

  return (
    <Drawer
      title={isDisabled ? "ดูรายละเอียด" : "แก้ไขข้อมูล"}
      open={open}
      onClose={onCancel}
      width={800}
      destroyOnHidden
      footer={
        !isDisabled && (
          <Flex justify="end" gap={8}>
            <Button key="cancel" onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button
              key="save"
              variant="solid"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              icon={<FontAwesomeIcon icon={faSave} />}
              disabled={isDisabled}
            >
              บันทึก
            </Button>
          </Flex>
        )
      }
      maskClosable={false}
    >
      <Form layout="horizontal" preserve={false}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <CustomFormItem label="รหัส">
              <Text>{taskDetail?.code}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            {isDisabled ? (
              <CustomFormItem label="สถานะ">
                <Tag color={taskDetail?.status?.color}>
                  {taskDetail?.status?.nameEn}
                </Tag>
              </CustomFormItem>
            ) : (
              <Controller
                control={control}
                name="status"
                render={({ field, fieldState: { error } }) => (
                  <CustomFormItem
                    label="สถานะ"
                    required={false}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                  >
                    <Select
                      {...field}
                      placeholder="เลือกสถานะ"
                      allowClear
                      showSearch
                      disabled={isDisabled}
                      optionFilterProp="label"
                      options={statusOptions(taskDetail?.status?.id)}
                    />
                  </CustomFormItem>
                )}
              />
            )}
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem
              label="วันและเวลาที่เปิดงาน"
              {...(taskDetail?.createdBy && {
                help: `โดย ${taskDetail?.createdBy?.firstName} ${taskDetail?.createdBy?.lastName}`,
              })}
            >
              <Text>
                {dayjs(taskDetail?.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem
              label="วันและเวลาที่อัพเดตล่าสุด"
              {...(taskDetail?.updatedBy && {
                help: `โดย ${taskDetail?.updatedBy?.firstName} ${taskDetail?.updatedBy?.lastName}`,
              })}
            >
              <Text>
                {dayjs(taskDetail?.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="โครงการ">
              <Text>{taskDetail?.task.project?.nameTh}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="บริเวณ">
              <Text>{taskDetail?.task.area?.nameTh}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="ตึก">
              <Text>{taskDetail?.task.building?.nameTh}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="ชั้น">
              <Text>{taskDetail?.task.floor?.nameTh}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="ผู้แจ้งซ่อม">
              <Text>{taskDetail?.task.customerName}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="เบอร์โทรผู้แจ้งซ่อม">
              <Text>{taskDetail?.task.customerPhone}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            {isDisabled ? (
              <CustomFormItem label="ประเภทหลัก">
                <Text>{taskDetail?.category?.nameTh}</Text>
              </CustomFormItem>
            ) : (
              <Controller
                control={control}
                name="categoryId"
                render={({ field, fieldState: { error } }) => (
                  <CustomFormItem
                    label="ประเภทหลัก"
                    required={false}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                  >
                    <Select
                      {...field}
                      options={categoryOptions}
                      allowClear
                      showSearch
                      optionFilterProp="label"
                      loading={mastersLoading}
                      disabled={isDisabled}
                    />
                  </CustomFormItem>
                )}
              />
            )}
          </Col>
          <Col xs={24} sm={12}>
            {isDisabled ? (
              <CustomFormItem label="ประเภทย่อย">
                <Text>{taskDetail?.subCategory?.nameTh}</Text>
              </CustomFormItem>
            ) : (
              <Controller
                control={control}
                name="subCategoryId"
                render={({ field, fieldState: { error } }) => (
                  <CustomFormItem
                    label="ประเภทย่อย"
                    required={false}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                  >
                    <Select
                      {...field}
                      options={subCategoryOptions}
                      disabled={!categoryId || isDisabled}
                      loading={mastersLoading}
                      allowClear
                      showSearch
                      optionFilterProp="label"
                    />
                  </CustomFormItem>
                )}
              />
            )}
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="SLA">
              <Text>{sla}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={24}>
            {isDisabled ? (
              <CustomFormItem label="รายละเอียด">
                <Text>{taskDetail?.description}</Text>
              </CustomFormItem>
            ) : (
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                  <CustomFormItem
                    label="รายละเอียด"
                    labelCol={{ span: 24 }}
                    required={false}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                  >
                    <Input.TextArea
                      {...field}
                      placeholder="รายละเอียด"
                      value={field.value || ""}
                      disabled={isDisabled}
                    />
                  </CustomFormItem>
                )}
              />
            )}
          </Col>
        </Row>

        <DividerWithIconTitle
          icon={<FontAwesomeIcon icon={faMessage} />}
          title="Case Updates Threaded"
        />

        <CaseUpdateThread
          isDisabled={isDisabled}
          taskDetailId={taskDetail?.id ?? ""}
        />

        <DividerWithIconTitle
          icon={<FontAwesomeIcon icon={faPaperclip} />}
          title="Update Attachment"
        />

        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24}>
            <RepairImagePreview images={images} />
          </Col>
          {!isDisabled && (
            <Col xs={24} sm={24}>
              <Controller
                control={control}
                name="images"
                render={({ field, formState: { errors } }) => (
                  <CustomFormItem
                    label="รูปภาพ"
                    required={false}
                    validateStatus={errors?.images ? "error" : ""}
                    help={errors.images?.message}
                  >
                    <Upload
                      {...field}
                      {...uploadFile}
                      multiple
                      onChange={(info) => {
                        field.onChange(info.fileList);
                      }}
                      fileList={field.value as unknown as UploadFile[]}
                      listType="text"
                      accept="image/*"
                    >
                      <Button
                        icon={<FontAwesomeIcon icon={faUpload} />}
                        disabled={isDisabled}
                      >
                        อัพโหลดรูปภาพ
                      </Button>
                    </Upload>
                  </CustomFormItem>
                )}
              />
            </Col>
          )}
        </Row>

        <Divider />

        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            {isDisabled ? (
              <CustomFormItem label="ผู้รับผิดชอบ">
                <Text>
                  {taskDetail?.homecare?.firstName}{" "}
                  {taskDetail?.homecare?.lastName}
                </Text>
              </CustomFormItem>
            ) : (
              <Controller
                control={control}
                name="homecareId"
                render={({ field, fieldState: { error } }) => (
                  <CustomFormItem
                    label="ผู้รับผิดชอบ"
                    required={false}
                    validateStatus={error ? "error" : ""}
                    help={error?.message}
                  >
                    <Select
                      {...field}
                      placeholder="เลือกผู้รับผิดชอบ"
                      allowClear
                      showSearch
                      optionFilterProp="label"
                      loading={usersLoading}
                      options={users.map((user) => ({
                        label: `${user.firstName} ${user.lastName}`,
                        value: user.id,
                      }))}
                      disabled={isDisabled || usersLoading}
                    />
                  </CustomFormItem>
                )}
              />
            )}
          </Col>
        </Row>
        <Divider size="small" dashed />
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <CustomFormItem
              label="วันเวลานัดลูกค้าเข้าตรวจสอบ"
              labelCol={{ span: 24 }}
            >
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12}>
                  {isDisabled ? (
                    <CustomFormItem label="วันที่">
                      <Text>
                        {dayjs(taskDetail?.appointmentDate).format(
                          "DD/MM/YYYY"
                        )}
                      </Text>
                    </CustomFormItem>
                  ) : (
                    <Controller
                      control={control}
                      name="appointmentDate"
                      render={({ field, fieldState: { error } }) => (
                        <Flex vertical gap={8}>
                          <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : undefined}
                            placeholder="เลือกวันที่"
                            format="DD/MM/YYYY"
                            style={{ width: "100%" }}
                            disabled={isDisabled}
                          />
                          {error && <Text type="danger">{error.message}</Text>}
                        </Flex>
                      )}
                    />
                  )}
                </Col>
                <Col xs={24} sm={12}>
                  {isDisabled ? (
                    <CustomFormItem label="เวลา">
                      <Text>{taskDetail?.appointmentTime?.nameTh}</Text>
                    </CustomFormItem>
                  ) : (
                    <Controller
                      control={control}
                      name="appointmentTime"
                      render={({ field, fieldState: { error } }) => (
                        <Flex vertical gap={8}>
                          <Select
                            {...field}
                            placeholder="เลือกเวลา"
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            style={{ width: "100%" }}
                            loading={optionsLoading}
                            options={
                              options?.rangeTimes.map((option) => ({
                                label: option.nameTh,
                                value: option.id,
                              })) || []
                            }
                            disabled={isDisabled}
                          />
                          {error && <Text type="danger">{error.message}</Text>}
                        </Flex>
                      )}
                    />
                  )}
                </Col>
              </Row>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem
              label="วันเวลานัดลูกค้าเข้าซ่อม"
              labelCol={{ span: 24 }}
            >
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12}>
                  {isDisabled ? (
                    <CustomFormItem label="วันที่">
                      <Text>
                        {dayjs(taskDetail?.appointmentRepairDate).format(
                          "DD/MM/YYYY"
                        )}
                      </Text>
                    </CustomFormItem>
                  ) : (
                    <Controller
                      control={control}
                      name="appointmentRepairDate"
                      render={({ field, fieldState: { error } }) => (
                        <Flex vertical gap={8}>
                          <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value) : undefined}
                            placeholder="เลือกวันที่"
                            format="DD/MM/YYYY"
                            style={{ width: "100%" }}
                            disabled={isDisabled}
                          />
                          {error && <Text type="danger">{error.message}</Text>}
                        </Flex>
                      )}
                    />
                  )}
                </Col>
                <Col xs={24} sm={12}>
                  {isDisabled ? (
                    <CustomFormItem label="เวลา">
                      <Text>{taskDetail?.appointmentRepairTime?.nameTh}</Text>
                    </CustomFormItem>
                  ) : (
                    <Controller
                      control={control}
                      name="appointmentRepairTime"
                      render={({ field, fieldState: { error } }) => (
                        <Flex vertical gap={8}>
                          <Select
                            {...field}
                            placeholder="เลือกเวลา"
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            style={{ width: "100%" }}
                            loading={optionsLoading}
                            options={
                              options?.rangeTimes.map((option) => ({
                                label: option.nameTh,
                                value: option.id,
                              })) || []
                            }
                            disabled={isDisabled}
                          />
                          {error && <Text type="danger">{error.message}</Text>}
                        </Flex>
                      )}
                    />
                  )}
                </Col>
              </Row>
            </CustomFormItem>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
