"use client";

import { LayoutWithBreadcrumb } from "@/components/common/LayoutWithBreadcrumb";
import { useUsersQuery } from "@/gql/generated/user.generated";
import { getTablePaginationProps } from "@/utils/utils";
import { Col, Form, Input, Row, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useDebounceValue("", 500);

  const { data, loading } = useUsersQuery({
    variables: {
      page: currentPage,
      limit: pageSize,
      searchText,
    },
  });

  const users = useMemo(() => data?.users, [data]);
  const dataSource = useMemo(() => users?.items, [users]);
  const meta = useMemo(() => users?.meta, [users]);

  return (
    <LayoutWithBreadcrumb>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item
            label="ค้นหา"
            name="searchText"
            colon={false}
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="ค้นหา"
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Table
            rowKey="id"
            loading={loading}
            dataSource={dataSource}
            scroll={{ x: "max-content" }}
            pagination={{
              position: ["bottomCenter"],
              ...getTablePaginationProps(meta),
              onChange: (page) => {
                setCurrentPage(page);
              },
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "40", "50"],
              onShowSizeChange: (page, size) => {
                setPageSize(size);
              },
            }}
            columns={[
              {
                title: "ชื่อผู้ใช้งาน",
                dataIndex: "username",
                key: "username",
                align: "center",
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "อีเมล",
                dataIndex: "email",
                key: "email",
                align: "center",
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "ชื่อ",
                dataIndex: "firstName",
                key: "firstName",
                align: "center",
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "นามสกุล",
                dataIndex: "lastName",
                key: "lastName",
                align: "center",
                onCell: () => ({
                  style: {
                    textAlign: "left",
                  },
                }),
              },
              {
                title: "สถานะ",
                dataIndex: "status",
                key: "status",
                align: "center",
                render: (text) => {
                  return (
                    <Tag color={text === "พนักงาน" ? "#52c41a" : "#f5222d"}>
                      {text}
                    </Tag>
                  );
                },
              },
              {
                title: "ล้อกอินล่าสุด",
                dataIndex: "lastLoginAt",
                key: "lastLoginAt",
                render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
              },
            ]}
          />
        </Col>
      </Row>
    </LayoutWithBreadcrumb>
  );
};
