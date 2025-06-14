import { Flex, Result } from "antd";
import React from "react";

export const NotFoundPage: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100%" }}>
      <Result
        status="404"
        title="ไม่พบข้อมูล"
        subTitle="ไม่พบข้อมูลที่คุณต้องการ กรุณาลองใหม่อีกครั้ง"
      />
    </Flex>
  );
};
