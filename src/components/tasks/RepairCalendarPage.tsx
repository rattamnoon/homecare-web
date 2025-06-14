"use client";

import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";
import { TaskType } from "@/gql/generated/graphql";
import { useTasksQuery } from "@/gql/generated/tasks.generated";
import { Calendar, CalendarProps, Flex, Skeleton, Tag } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th";
import weekday from "dayjs/plugin/weekday";
import { useMemo, useState } from "react";

dayjs.extend(weekday);

export const RepairCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const { data, loading } = useTasksQuery({
    variables: {
      type: TaskType.Repair,
      page: 1,
      limit: 10,
    },
  });

  const tasks = useMemo(() => data?.tasks, [data]);
  const dataSource = useMemo(() => tasks?.items ?? [], [tasks]);
  const meta = useMemo(() => tasks?.meta, [tasks]);

  const monthCellRender = (value: Dayjs) => {
    return (
      <div className="notes-month">
        <section>{value.date()}</section>
        <span>{meta?.totalItems}</span>
      </div>
    );
  };

  const dateCellRender = (value: Dayjs) => {
    return (
      <Flex vertical gap={4}>
        {dataSource
          .filter((item) => dayjs(item.checkInDate).isSame(value, "day"))
          .map((item) => (
            <li key={item.id}>
              <Tag color={item.status.color}>{item.code}</Tag>
            </li>
          ))}
      </Flex>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <LayoutWithBreadcrumb>
      <Skeleton loading={loading}>
        <Calendar
          value={currentDate}
          onChange={(value) => setCurrentDate(value)}
          cellRender={cellRender}
          style={{
            backgroundColor: "white",
            borderRadius: 8,
          }}
          mode="month"
        />
      </Skeleton>
    </LayoutWithBreadcrumb>
  );
};
