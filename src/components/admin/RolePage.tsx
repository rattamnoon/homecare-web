import { LayoutWithBreadcrumb } from "@/components/common/LayoutWithBreadcrumb";
import { Result } from "antd";

export const RolePage = () => {
  return (
    <LayoutWithBreadcrumb>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
      />
    </LayoutWithBreadcrumb>
  );
};
