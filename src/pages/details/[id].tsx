import React from "react";
import Confirmation from "~/components/Dialog/Confirmation";
import { useState } from "react";
import { Typography, Flex, Button, message } from "antd";
import { useRouter } from "next/router";
import { dummyPostDetail, dummyUser, dummyComments } from "~/utils/dummy";
import { EditOutlined, DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import CreateUpdatePost from "~/components/Dialog/CreateUpdatePost";

const { Title, Text } = Typography;

export default function DetailsPage() {
  // WIP - Get Details and Get User
  const router = useRouter();
  console.log(router.query.id);

  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

  // const [loading, setLoading] = useState<boolean>(true);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const onDeletePost = async () => {
    message.success(`Delete post success!`);
    setOpenConfirmationDialog(false);
    await router.push("/");
  };

  return (
    <>
      <CreateUpdatePost
        type="update"
        open={openUpdateDialog}
        onConfirm={() => setOpenUpdateDialog(false)}
        onCancel={() => setOpenUpdateDialog(false)}
      />

      <Confirmation
        open={openConfirmationDialog}
        onCancel={() => {
          setOpenConfirmationDialog(false);
        }}
        onConfirm={async () => {
          await onDeletePost();
        }}
      >
        <Text>Are you sure you want to delete this post?</Text>
      </Confirmation>

      <Flex
        vertical
        justify="center"
        align="center"
        className="m-1 my-8 h-full"
      >
        <Flex
          justify="center"
          className="gap m-4 -ml-8 sm:-ml-4 md:-ml-4 lg:-ml-8"
        >
          <Button
            shape="circle"
            type="text"
            className="text-slate-300"
            icon={<LeftOutlined />}
            onClick={() => router.back()}
          />
          <Flex
            vertical
            justify="space-between"
            className="post-container w-full rounded border border-slate-300 px-8 py-4"
          >
            <Flex justify="space-between" className="mb-4 w-full text-center">
              <Title level={2} className="m-0 p-0">
                {dummyPostDetail.title}
              </Title>
            </Flex>

            <Text className="mb-8 ml-2 text-left">
              Posted By <b>{dummyUser.name}</b>
            </Text>
            <Text className="text-left">{dummyPostDetail.body}</Text>

            <Flex className="mt-8 self-end" gap={16}>
              <EditOutlined
                className="text-xl text-blue-700"
                onClick={() => setOpenUpdateDialog(true)}
              />
              <DeleteOutlined
                className="text-xl text-red-700"
                onClick={() => setOpenConfirmationDialog(true)}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex vertical justify="center" className="post-container my-4">
          <Title level={4} className="text-left">
            Comments
          </Title>

          {dummyComments.length > 0 &&
            dummyComments.map((comment) => (
              <Flex
                vertical
                justify="center"
                key={comment.id}
                className="h-full w-full border-t border-slate-300 px-4 py-2 last:border-b"
              >
                <Text strong className="text-left">
                  {comment.name} - <Text type="secondary">{comment.email}</Text>
                </Text>
                <Text className="text-left">{comment.body}</Text>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </>
  );
}
