"use client";
import { useMutation } from "@tanstack/react-query";
import { Modal, Typography, Button, Form, Input, message, Radio } from "antd";
import { useEffect } from "react";
import type { IConfirmationProps, IUserCredentials } from "~/models/component";
import type { ICreateUserValues } from "~/models/post";
import { UserState } from "~/store/user";
import axiosInstance from "~/utils/axios";

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

export default function WelcomeDialog(props: IConfirmationProps) {
  const [form] = Form.useForm();
  const { setData } = UserState();

  const mutationCreatePost = useMutation({
    mutationKey: ["create-user"],
    mutationFn: (value: ICreateUserValues) => {
      return axiosInstance
        .post("/users", {
          name: value.name,
          email: value.email,
          gender: value.gender,
          status: "active",
        })
        .then((response) => {
          const userData = {
            ...response.data,
            token: value.token,
          } as IUserCredentials;
          localStorage.setItem("user", JSON.stringify(userData));
          setData(userData);
        })
        .catch((error) => {
          return message.error(`Error: ${error}`);
        })
        .finally(() => {
          message.success(`Create user success!`);
          onResetField();
          props.onConfirm();
        });
    },
  });

  const onFinish = (values: IUserCredentials) => {
    localStorage.setItem("user", JSON.stringify(values));
    mutationCreatePost.mutate(values);
    props.onConfirm();
  };

  const onFinishFailed = () => {
    message.error(`Please check your input!`);
  };

  const onResetField = () => {
    form.setFieldsValue({
      name: "",
      gender: "",
      email: "",
      token: "",
    });
    form.resetFields();
  };

  // TODO: Remove this later
  useEffect(() => {
    form.setFieldsValue({
      name: "matcha latte",
      gender: "male",
      email: "matchalatte@email.com",
      token: "8a347337330e9f0373e9743af5dbbe6e0063e2916e2c57422e33ffc336b4b748",
    });
  }, []);

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
            name="email"
            label="Email"
            rules={[{ required: true }, { min: 2 }]}
          >
            <Input placeholder="Please enter your email" />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="token"
            label="Go Rest Token"
            rules={[
              { required: true },
              { pattern: /^[a-zA-Z0-9 ]*$/ },
              { min: 16 },
            ]}
          >
            <Input placeholder="Please enter your go rest token" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
