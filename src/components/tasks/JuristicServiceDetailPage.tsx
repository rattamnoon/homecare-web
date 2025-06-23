"use client";

import { useTaskQuery } from "@/gql/generated/tasks.generated";
import { Result, Skeleton, Typography } from "antd";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { LayoutWithBreadcrumb } from "../layout/LayoutWithBreadcrumb";

const { Title } = Typography;

export const JuristicServiceDetailPage = () => {
  const params = useParams();
  const taskId = params.id as string;

  const { data, loading, error } = useTaskQuery({
    variables: { id: taskId },
    skip: !taskId,
    fetchPolicy: "cache-and-network",
  });

  const task = useMemo(() => data?.task, [data]);

  return (
    <LayoutWithBreadcrumb
      showBackButton
      breadcrumb={[
        {
          title: loading ? <Skeleton.Input size="small" active /> : task?.code,
        },
      ]}
    >
      {error ? (
        <Result
          status="error"
          title="เกิดข้อผิดพลาด"
          subTitle={error.message}
        />
      ) : (
        <>
          <Title level={3}>รายละเอียดงานแจ้งซ่อม</Title>
        </>
      )}
    </LayoutWithBreadcrumb>
  );
};
