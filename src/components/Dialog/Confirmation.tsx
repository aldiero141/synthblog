import React from "react";
import { Modal, Button } from "antd";
import type { IConfirmationProps } from "~/models/component";

export default function Confirmation(props: IConfirmationProps) {
  return (
    <>
      <Modal
        title="Delete Post?"
        open={props.open}
        onOk={props.onConfirm}
        onCancel={props.onCancel}
        footer={[
          <Button key="back" onClick={props.onCancel}>
            Cancel
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
