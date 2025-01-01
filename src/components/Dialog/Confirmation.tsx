import React from "react";
import { Modal, Button } from "antd";
import type { IConfirmationProps } from "~/models/component";

export default function Confirmation(props: IConfirmationProps) {
  return (
    <>
      <Modal
        title="Modal"
        open={props.open}
        onOk={props.onConfirm}
        onCancel={props.onCancel}
        okText="Confirm"
        cancelText="Cancel"
        footer={[
          <Button key="back" onClick={props.onCancel}>
            Return
          </Button>,
          <Button danger type="primary" key="submit" onClick={props.onConfirm}>
            Delete
          </Button>,
        ]}
      >
        {props.children}
      </Modal>
    </>
  );
}
