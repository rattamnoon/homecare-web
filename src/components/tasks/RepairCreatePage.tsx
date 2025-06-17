"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { Routes } from "@/config/routes";
import {
  CreateTaskDetailInput,
  CreateTaskInput,
  MasterType,
  TaskStatus,
  TaskType,
  UploadFileType,
} from "@/gql/generated/graphql";
import { useMastersQuery } from "@/gql/generated/master.generated";
import { useTaskOptionsQuery } from "@/gql/generated/option.generated";
import {
  useProjectsQuery,
  useUnitsQuery,
} from "@/gql/generated/project.generated";
import { useCreateTaskMutation } from "@/gql/generated/tasks.generated";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  faPlus,
  faSave,
  faTrash,
  faUpload,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
  UploadFile,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "nextjs-toploader/app";
import { useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  projectId: z.string({ message: "กรุณาเลือกโครงการ" }),
  unitId: z.string({ message: "กรุณาเลือกหน่วย" }),
  customerName: z.string({ message: "กรุณากรอกชื่อ-นามสกุล" }),
  customerPhone: z.string({ message: "กรุณากรอกเบอร์โทร" }),
  checkInDate: z.date({ message: "กรุณากรอกวันที่เข้าตรวจสอบ" }),
  source: z.string({ message: "กรุณาเลือกช่องทาง" }),
  checkInRangeTime: z.string({ message: "กรุณาเลือกช่วงเวลา" }),
  taskDetails: z.array(
    z.object(
      {
        categoryId: z.string({ message: "กรุณาเลือกประเภท" }),
        subCategoryId: z.string({ message: "กรุณาเลือกประเภทย่อย" }),
        description: z.string({ message: "กรุณากรอกรายละเอียด" }),
        images: z.array(z.custom<UploadFile>()).optional(),
      },
      {
        invalid_type_error: "กรุณากรอกรายละเอียด",
      }
    )
  ),
});

const { Title } = Typography;

export const RepairCreatePage = () => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      taskDetails: [{}],
    },
  });

  const uploadFile = useFileUpload("file", "customer");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "taskDetails",
  });

  const projectId = watch("projectId");

  const { data: projects, loading: projectsLoading } = useProjectsQuery();
  const { data: units, loading: unitsLoading } = useUnitsQuery({
    variables: {
      projectId,
    },
    skip: !projectId,
  });

  const { data: mastersData, loading: mastersLoading } = useMastersQuery({
    variables: {
      types: [MasterType.Category],
    },
  });

  const [createTask, { loading: createTaskLoading }] = useCreateTaskMutation({
    onCompleted: () => {
      notificationApi.success({
        message: "สำเร็จ !!",
        description: "สร้างงานแจ้งซ่อมสำเร็จ",
      });
      router.push(Routes.Tasks);
    },
    onError: (error) => {
      notificationApi.error({
        message: "เกิดข้อผิดพลาด !!",
        description: error.message,
        duration: 5,
      });
    },
  });

  const { data: options, loading: optionsLoading } = useTaskOptionsQuery();

  const projectsOptions = useMemo(() => {
    return projects?.projects.map((project) => ({
      label: `${project.id} - ${project.nameTh}`,
      value: project.id,
    }));
  }, [projects]);

  const unitsOptions = useMemo(() => {
    return units?.units.map((unit) => ({
      label: `ยูนิต ${unit.unitNumber} บ้านเลขที่ ${unit.houseNumber}`,
      value: unit.id,
    }));
  }, [units]);

  const masters = useMemo(() => mastersData?.masters, [mastersData]);

  const categoryOptions = useMemo(() => {
    return masters?.map((master) => ({
      label: master.nameTh,
      value: master.id,
    }));
  }, [masters]);

  const getSubCategoryOptions = (categoryId: string) => {
    const options = masters?.filter((master) => {
      return master.id === categoryId;
    });

    if (!options) return [];

    return options
      .map((master) => master.children)
      .flat()
      .map((child) => ({
        label: child.nameTh,
        value: child.id,
      }));
  };

  const rangeTimesOptions = useMemo(() => {
    return options?.rangeTimes.map((rangeTime) => ({
      label: rangeTime.nameTh,
      value: rangeTime.id,
    }));
  }, [options]);

  const sourcesOptions = useMemo(() => {
    return options?.sources.map((source) => ({
      label: source.nameTh,
      value: source.id,
    }));
  }, [options]);

  const onSubmit = handleSubmit(async (data) => {
    const {
      projectId,
      unitId,
      customerName,
      customerPhone,
      checkInDate,
      source,
      checkInRangeTime,
      taskDetails,
    } = data;

    const unit = units?.units.find((unit) => unit.id === unitId);

    const createTaskInput: CreateTaskInput = {
      projectId,
      unitId,
      unitNumber: unit?.unitNumber ?? "",
      customerName,
      customerPhone,
      checkInDate,
      source,
      checkInRangeTime,
      customerRequestedRepairDate: dayjs().toDate(),
      status: TaskStatus.Pending,
      type: TaskType.Repair,
    };

    const createTaskDetailInput: CreateTaskDetailInput[] = taskDetails.map(
      (taskDetail) => ({
        status: TaskStatus.Pending,
        categoryId: taskDetail.categoryId,
        subCategoryId: taskDetail.subCategoryId,
        description: taskDetail.description,
        files:
          taskDetail.images?.map((image) => ({
            fileType: UploadFileType.Customer,
            fileId: image.response?.fileId,
            fileName: image.response?.fileName,
            fileFolder: image.response?.fileFolder,
            filePath: image.response?.filePath,
            fileBucket: image.response?.fileBucket,
            fileExtension: image.response?.fileExtension,
          })) ?? [],
      })
    );

    await createTask({
      variables: {
        createTaskInput,
        createTaskDetailInput,
      },
    });
  });

  return (
    <LayoutWithBreadcrumb>
      {contextHolder}
      <Flex vertical gap={16}>
        <Flex justify="center">
          <Title level={3}>เพิ่มงานแจ้งซ่อม</Title>
        </Flex>
        <Form
          layout="inline"
          labelCol={{ span: 8 }}
          autoComplete="off"
          preserve={false}
          name="task"
          initialValues={{
            taskDetails: [{}],
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Divider orientation="left">ข้อมูลผู้แจ้งซ่อม</Divider>
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="projectId"
                render={({ field, formState: { errors } }) => (
                  <Form.Item
                    label="โครงการ"
                    name="projectId"
                    required
                    validateStatus={errors.projectId ? "error" : ""}
                    help={errors.projectId?.message}
                  >
                    <Select
                      {...field}
                      loading={projectsLoading}
                      options={projectsOptions}
                      placeholder="เลือกโครงการ"
                      allowClear
                      showSearch
                      optionFilterProp="label"
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="unitId"
                render={({ field, formState: { errors } }) => (
                  <Form.Item
                    label="เลขยูนิต"
                    name="unitId"
                    required
                    validateStatus={errors.unitId ? "error" : ""}
                    help={errors.unitId?.message}
                  >
                    <Select
                      {...field}
                      loading={unitsLoading}
                      options={unitsOptions}
                      placeholder="เลือกหน่วย"
                      allowClear
                      showSearch
                      optionFilterProp="label"
                      disabled={!projectId}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="customerName"
                render={({ field, formState: { errors } }) => (
                  <Form.Item
                    label="ชื่อ-นามสกุล"
                    name="customerName"
                    required
                    validateStatus={errors.customerName ? "error" : ""}
                    help={errors.customerName?.message}
                  >
                    <Input {...field} placeholder="ชื่อ-นามสกุล" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="customerPhone"
                render={({ field, formState: { errors } }) => (
                  <Form.Item
                    label="เบอร์โทร"
                    name="customerPhone"
                    required
                    validateStatus={errors.customerPhone ? "error" : ""}
                    help={errors.customerPhone?.message}
                  >
                    <Input {...field} placeholder="เบอร์โทร" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="checkInDate"
                render={({ field, formState: { errors } }) => (
                  <Form.Item
                    label="วันที่เข้าตรวจสอบ"
                    name="checkInDate"
                    required
                    validateStatus={errors.checkInDate ? "error" : ""}
                    help={errors.checkInDate?.message}
                  >
                    <DatePicker
                      {...field}
                      onChange={(value) => {
                        field.onChange(dayjs(value).toDate());
                      }}
                      placeholder="วันที่เข้าตรวจสอบ"
                      format="DD/MM/YYYY"
                      style={{ width: "100%" }}
                      disabledDate={(current) => {
                        return current && current < dayjs().startOf("day");
                      }}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="source"
                render={({ field, formState: { errors } }) => (
                  <Form.Item
                    label="แจ้งผ่านช่องทาง"
                    name="source"
                    required
                    validateStatus={errors.source ? "error" : ""}
                    help={errors.source?.message}
                  >
                    <Select
                      {...field}
                      loading={optionsLoading}
                      options={sourcesOptions}
                      placeholder="เลือกช่องทาง"
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="checkInRangeTime"
                render={({ field, formState: { errors } }) => (
                  <Form.Item
                    label="ช่วงเวลา"
                    name="checkInRangeTime"
                    required
                    validateStatus={errors.checkInRangeTime ? "error" : ""}
                    help={errors.checkInRangeTime?.message}
                  >
                    <Select
                      {...field}
                      loading={optionsLoading}
                      options={rangeTimesOptions}
                      placeholder="เลือกช่วงเวลา"
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Divider orientation="left">รายการแจ้งซ่อม</Divider>
              <Row gutter={[16, 16]} justify="center">
                {fields.map((field, index) => {
                  const categoryId = watch(`taskDetails.${index}.categoryId`);
                  const subCategoryOptions = getSubCategoryOptions(categoryId);

                  return (
                    <Col span={24} key={field.id}>
                      <Card
                        title={`รายการแจ้งซ่อมที่ ${index + 1}`}
                        extra={[
                          <Button
                            key="delete"
                            variant="filled"
                            color="danger"
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={() => remove(index)}
                          />,
                        ]}
                      >
                        <Flex vertical gap={16}>
                          <Controller
                            control={control}
                            name={`taskDetails.${index}.categoryId`}
                            render={({ field, formState: { errors } }) => (
                              <Form.Item
                                label="ประเภท"
                                name={`taskDetails.${index}.categoryId`}
                                required
                                validateStatus={
                                  errors.taskDetails?.[index]?.categoryId
                                    ? "error"
                                    : ""
                                }
                                help={
                                  errors.taskDetails?.[index]?.categoryId
                                    ?.message
                                }
                                labelCol={{ span: 4 }}
                              >
                                <Select
                                  {...field}
                                  loading={mastersLoading}
                                  options={categoryOptions}
                                  placeholder="เลือกประเภท"
                                  allowClear
                                  showSearch
                                  optionFilterProp="label"
                                />
                              </Form.Item>
                            )}
                          />
                          <Controller
                            control={control}
                            name={`taskDetails.${index}.subCategoryId`}
                            render={({ field, formState: { errors } }) => (
                              <Form.Item
                                label="ประเภทย่อย"
                                name={`taskDetails.${index}.subCategoryId`}
                                required
                                validateStatus={
                                  errors.taskDetails?.[index]?.subCategoryId
                                    ? "error"
                                    : ""
                                }
                                help={
                                  errors.taskDetails?.[index]?.subCategoryId
                                    ?.message
                                }
                                labelCol={{ span: 4 }}
                              >
                                <Select
                                  {...field}
                                  options={subCategoryOptions}
                                  disabled={!categoryId}
                                  placeholder="เลือกประเภทย่อย"
                                  allowClear
                                  showSearch
                                  optionFilterProp="label"
                                />
                              </Form.Item>
                            )}
                          />
                          <Controller
                            control={control}
                            name={`taskDetails.${index}.description`}
                            render={({ field, formState: { errors } }) => (
                              <Form.Item
                                label="รายละเอียด"
                                name={`taskDetails.${index}.description`}
                                required
                                validateStatus={
                                  errors.taskDetails?.[index]?.description
                                    ? "error"
                                    : ""
                                }
                                help={
                                  errors.taskDetails?.[index]?.description
                                    ?.message
                                }
                                labelCol={{ span: 4 }}
                              >
                                <Input.TextArea
                                  {...field}
                                  placeholder="รายละเอียด"
                                  rows={4}
                                />
                              </Form.Item>
                            )}
                          />
                          <Controller
                            control={control}
                            name={`taskDetails.${index}.images`}
                            render={({ field, formState: { errors } }) => (
                              <Form.Item
                                label="รูปภาพ"
                                name={`taskDetails.${index}.images`}
                                required
                                validateStatus={
                                  errors.taskDetails?.[index]?.images
                                    ? "error"
                                    : ""
                                }
                                help={
                                  errors.taskDetails?.[index]?.images?.message
                                }
                                labelCol={{ span: 4 }}
                              >
                                <Upload
                                  {...field}
                                  {...uploadFile}
                                  multiple
                                  onChange={(info) => {
                                    field.onChange(info.fileList);
                                  }}
                                  fileList={
                                    field.value as unknown as UploadFile[]
                                  }
                                  listType="picture"
                                  accept="image/*"
                                >
                                  <Button
                                    icon={<FontAwesomeIcon icon={faUpload} />}
                                  >
                                    อัพโหลดรูปภาพ
                                  </Button>
                                </Upload>
                              </Form.Item>
                            )}
                          />
                        </Flex>
                      </Card>
                    </Col>
                  );
                })}
                <Col>
                  <Button
                    variant="filled"
                    color="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() =>
                      append({
                        categoryId: "",
                        subCategoryId: "",
                        description: "",
                      })
                    }
                  >
                    เพิ่มรายการแจ้งซ่อม
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            <Col span={24}>
              <Flex justify="center">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    variant="solid"
                    color="primary"
                    onClick={onSubmit}
                    loading={createTaskLoading}
                    icon={<FontAwesomeIcon icon={faSave} />}
                  >
                    บันทึกข้อมูล
                  </Button>
                </Form.Item>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Flex>
    </LayoutWithBreadcrumb>
  );
};
