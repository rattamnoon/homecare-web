import { Flex } from "antd";
import React from "react";
import { SpinLoading } from "./SpinLoading";

export const LoadingPage: React.FC = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <SpinLoading />
    </Flex>
  );
};
