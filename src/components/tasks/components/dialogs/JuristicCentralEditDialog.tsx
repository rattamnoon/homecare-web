import { CustomFormItem } from "@/components/common/CustomFormItem";
import { MasterType, TaskStatus } from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { useAllActiveUsersQuery } from "@/gql/generated/user.generated";
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
  Row,
  Select,
  Space,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const { Text } = Typography;

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
  remark: z.string().optional().nullable(),
  images: z.array(z.custom<UploadFile>()).optional(),
});

interface JuristicCentralEditDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  taskDetail?: TaskDetailFragment | null;
}

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

  const { data: usersData, loading: usersLoading } = useAllActiveUsersQuery({
    skip: !open,
  });

  const masters = useMemo(() => mastersData?.masters || [], [mastersData]);
  const users = useMemo(() => usersData?.allActiveUsers || [], [usersData]);

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

  const isDisabled = useMemo(() => {
    switch (taskDetail?.status?.id) {
      case TaskStatus.Closed:
      case TaskStatus.Finished:
      case TaskStatus.FinishByProject:
        return true;
      default:
        return false;
    }
  }, [taskDetail]);

  return (
    <Drawer
      title="แก้ไขข้อมูล"
      open={open}
      onClose={onCancel}
      width={800}
      destroyOnHidden
      footer={
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
                    options={Object.values(TaskStatus)
                      .filter((status) => status !== TaskStatus.Open)
                      .map((status) => ({
                        label: status,
                        value: status,
                      }))}
                  />
                </CustomFormItem>
              )}
            />
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
          </Col>
          <Col xs={24} sm={12}>
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
          </Col>
          <Col xs={24} sm={12}>
            <CustomFormItem label="SLA">
              <Text>{sla}</Text>
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={24}>
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
          </Col>
        </Row>

        <Divider plain orientation="left">
          <Space>
            <FontAwesomeIcon icon={faMessage} />
            <Text strong>Case Updates Threaded</Text>
          </Space>
        </Divider>

        <Row gutter={[8, 8]}>
          {taskDetail?.reportLogs && taskDetail?.reportLogs.length > 0 && (
            <Col xs={24} sm={24}>
              <List
                size="small"
                rowKey={(item) => item.id}
                dataSource={taskDetail?.reportLogs}
                renderItem={(item) => (
                  <List.Item>
                    <Flex vertical gap={8}>
                      <Text strong>
                        {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                      </Text>
                      <Text>{item.remark}</Text>
                    </Flex>
                  </List.Item>
                )}
              />
            </Col>
          )}
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
        </Row>

        <Divider plain orientation="left">
          <Space>
            <FontAwesomeIcon icon={faPaperclip} />
            <Text strong>Update Attachment</Text>
          </Space>
        </Divider>

        <Row gutter={[8, 8]}>
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
        </Row>
        <Divider />
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
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
                    disabled={isDisabled}
                  />
                </CustomFormItem>
              )}
            />
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
                </Col>
                <Col xs={24} sm={12}>
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
                </Col>
                <Col xs={24} sm={12}>
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
                </Col>
              </Row>
            </CustomFormItem>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
