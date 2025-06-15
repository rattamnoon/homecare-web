import { TaskDetailFragment } from "@/gql/generated/tasks.generated";
import { faCheck, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row, Space, Typography } from "antd";
import dayjs from "dayjs";

type RepairApprovePlanProps = {
  taskDetail: TaskDetailFragment;
};

const { Text } = Typography;

export const RepairApprovePlan = ({ taskDetail }: RepairApprovePlanProps) => {
  const [modalApi, modalContextHolder] = Modal.useModal();

  const currentStatus = taskDetail.status;

  const handleApprove = () => {
    modalApi.confirm({
      title: "อนุมัติงาน",
      content: "คุณต้องการอนุมัติงานหรือไม่?",
      okText: "ตกลง",
      cancelText: "ยกเลิก",
      onOk: () => {
        console.log("อนุมัติงาน");
      },
      onCancel: () => {
        console.log("ยกเลิก");
      },
    });
  };

  const handleReject = () => {
    modalApi.confirm({
      title: "ยกเลิกงาน",
      content: "คุณต้องการยกเลิกงานหรือไม่?",
      okText: "ตกลง",
      cancelText: "ยกเลิก",
      onOk: () => {
        console.log("ยกเลิกงาน");
      },
      onCancel: () => {
        console.log("ยกเลิก");
      },
    });
  };

  return (
    <>
      {modalContextHolder}
      <div
        style={{
          borderLeft: `4px solid ${currentStatus?.color}`,
          padding: 8,
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row gutter={16} justify="space-between" align="middle">
          <Col span={6}>
            <Text>{currentStatus?.nameEn}</Text>
          </Col>
          <Col span={6}>
            <Text>
              วันที่และเวลา :{" "}
              {dayjs(taskDetail?.reportLogs?.[0]?.createdAt).format(
                "DD/MM/YYYY HH:mm"
              )}
            </Text>
          </Col>
          <Col span={6}>
            <Text>หมายเหตุ : {taskDetail?.reportLogs?.[0]?.comment}</Text>
          </Col>
          <Col span={6}>
            <Space.Compact>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                icon={<FontAwesomeIcon icon={faCheck} />}
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="danger"
                size="small"
                icon={<FontAwesomeIcon icon={faXmark} />}
                onClick={handleReject}
              >
                Reject
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      </div>
    </>
  );
};
