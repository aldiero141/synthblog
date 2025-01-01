"use client";
import { Modal, Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import type { ICreatePostProps } from "~/models/component";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
  max: {
    number: "${label} must be less than or equal to ${max}",
  },
};

const { TextArea } = Input;

interface IFormValues {
  name: string;
  token: string;
}
export default function CreateUpdatePost(props: ICreatePostProps) {
  const [form] = Form.useForm();

  const onFinish = (values: IFormValues) => {
    props.type === "create" ? onCreatePost(values) : onUpdatePost(values);
    props.onConfirm();
  };

  const onCreatePost = (values: IFormValues) => {
    message.success(`Create post success!`);
    console.log(values);
    onResetField();
  };

  const onUpdatePost = (values: IFormValues) => {
    message.success(`Update post success!`);
    console.log(values);
    onResetField();
  };

  const onResetField = () => {
    form.setFieldsValue({
      title: "",
      body: "",
    });
    form.resetFields();
  };

  const onFinishFailed = () => {
    message.error(`Please check your field input!`);
  };

  useEffect(() => {
    if (props.type === "update") {
      form.setFieldsValue({
        title: "Edited Title",
        body: "Edited body lorem ipsum dolor sit amet",
      });
    }
  }, []);

  return (
    <>
      <Modal
        open={props.open}
        onCancel={props.onCancel}
        footer={[
          <Button form="create-update-form" key="submit" htmlType="submit">
            {props.type === "create" ? "Create" : "Update"}
          </Button>,
        ]}
        title="Create Post"
      >
        <Form
          form={form}
          id="create-update-form"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }, { pattern: /^[a-zA-Z ]*$/ }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="body"
            label="Body"
            rules={[
              { required: true },
              { pattern: /^[a-zA-Z0-9 ]*$/ },
              { min: 2 },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
