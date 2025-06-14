import { Flex, Spin } from "antd";
import React from "react";

export const SpinLoading: React.FC = () => {
  return (
    <Flex justify="center" style={{ width: "100%", padding: 24 }}>
      <Spin size="large" />
    </Flex>
  );
};
