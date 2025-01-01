"use client";
import { Modal, Typography, Button, Form, Input, message } from "antd";
import type { IConfirmationProps } from "~/models/component";

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

const { Title, Paragraph } = Typography;

interface IFormValues {
  name: string;
  token: string;
}

export default function WelcomeDialog(props: IConfirmationProps) {
  const [form] = Form.useForm();

  const onFinish = (values: IFormValues) => {
    message.success(`Login success! Welcome ${values.name}!!`);
    console.log(values);
    props.onConfirm();
  };

  const onFinishFailed = () => {
    message.error(`Please check your input!`);
  };

  return (
    <>
      <Modal
        closable={false}
        open={props.open}
        footer={[
          <Button form="welcome-form" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Title>Welcome to SynthBlog</Title>
        <Paragraph>
          SynthBlog is a blogging platform that allows you to create and share
          your thoughts and ideas with the world.
        </Paragraph>
        <Paragraph>
          With SynthBlog, you can easily create and publish your own blog posts,
          share your thoughts and ideas with the world, and engage with other
          users.
        </Paragraph>
        <Paragraph>
          Please Enter Your Name & Credentials To Enter the Platform
        </Paragraph>

        <Form
          form={form}
          id="welcome-form"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }, { pattern: /^[a-zA-Z ]*$/ }]}
          >
            <Input placeholder="Please enter your name" />
          </Form.Item>

          <Form.Item
            name="token"
            label="Go Rest Token"
            rules={[
              { required: true },
              { pattern: /^[a-zA-Z0-9 ]*$/ },
              { min: 2 },
            ]}
          >
            <Input placeholder="Please enter your go rest token" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
