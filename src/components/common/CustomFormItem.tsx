import styled from "@emotion/styled";
import { Form } from "antd";

export const CustomFormItem = styled(Form.Item)<{ alignItems?: string }>`
  margin-bottom: 0px;
  /* text-align: left; */
  /* font-weight: 600; */

  .ant-row {
    align-items: ${({ alignItems }) => alignItems || "baseline"};
  }

  .ant-form-item-control-input-content {
    font-weight: 400;
    text-align: left;
  }

  .ant-input-number-input-wrap > input.ant-input-number-input {
    text-align: right;
  }
`;
