"use client";
import { Modal, Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import type { ICreatePostProps } from "~/models/component";
import type { ICreatePostValues } from "~/models/post";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "~/utils/axios";
import { dummyUser } from "~/utils/dummy";
import { useRouter } from "next/router";

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

export default function CreateUpdatePost(props: ICreatePostProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const postId = router.query.id;
  const details = props.details;

  const mutationCreatePost = useMutation({
    mutationKey: ["create-post"],
    mutationFn: (value: ICreatePostValues) => {
      return axiosInstance
        .post("/posts", {
          user: dummyUser.name,
          user_id: dummyUser.id,
          title: value.title,
          body: value.body,
        })
        .catch((error) => {
          return message.error(`Error: ${error}`);
        })
        .finally(() => {
          message.success(`Create post success!`);
          onResetField();
          props.onConfirm();
        });
    },
  });

  const mutationUpdatePost = useMutation({
    mutationKey: ["update-post"],
    mutationFn: (value: ICreatePostValues) => {
      return axiosInstance
        .put(`/posts/${postId as string}`, {
          user: dummyUser.name,
          user_id: dummyUser.id,
          title: value.title,
          body: value.body,
        })
        .catch((error) => {
          return message.error(`Error: ${error}`);
        })
        .finally(() => {
          message.success(`Update post success!`);
          onResetField();
          props.onConfirm();
        });
    },
  });

  const onFinish = (values: ICreatePostValues) => {
    return props.type === "create"
      ? onCreatePost(values)
      : onUpdatePost(values);
  };

  const onCreatePost = (values: ICreatePostValues) => {
    return mutationCreatePost.mutate(values);
  };

  const onUpdatePost = (values: ICreatePostValues) => {
    return mutationUpdatePost.mutate(values);
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
        title: details?.title,
        body: details?.body,
      });
    }
  }, []);

  return (
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
  );
}
