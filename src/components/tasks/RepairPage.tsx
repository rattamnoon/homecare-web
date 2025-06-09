"use client";
import { useTasksQuery } from "@/gql/generated/tasks.generated";
import { Alert, Spin } from "antd";

export const RepairPage = () => {
  const { data, loading, error } = useTasksQuery();

  if (loading) return <Spin />;
  if (error) return <Alert message={error.message} type="error" />;

  return <pre>{JSON.stringify(data?.tasks, null, 2)}</pre>;
};
