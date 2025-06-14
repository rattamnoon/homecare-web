import { Divider, Modal, ModalProps, Typography } from "antd";
import React from "react";

const { Text } = Typography;

interface CustomModalProps extends ModalProps {
  title: string;
}

export const CustomModal: React.FC<
  CustomModalProps & { contentStyles?: React.CSSProperties }
> = ({ title, children, contentStyles, ...modalProps }) => {
  return (
    <Modal
      {...modalProps}
      styles={{
        content: {
          padding: 0,
          ...modalProps?.styles?.content,
        },
        footer: {
          padding: 16,
          marginTop: 0,
          ...modalProps?.styles?.footer,
        },
        ...modalProps.styles,
      }}
    >
      <div>
        <div className="modal-title" style={{ padding: "16px 24px" }}>
          <Text style={{ fontSize: 16 }}>{title}</Text>
        </div>
        <Divider style={{ margin: 0 }} />
        <div style={{ padding: "24px", ...contentStyles }}>{children}</div>
        <Divider style={{ margin: 0 }} />
      </div>
    </Modal>
  );
};
