import React from "react";
import Confirmation from "~/components/Dialog/Confirmation";
import { useState } from "react";
import { Typography, Flex, Button, message, Skeleton } from "antd";
import { useRouter } from "next/router";
import { EditOutlined, DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import CreateUpdatePost from "~/components/Dialog/CreateUpdatePost";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "~/utils/axios";
import type { IComment, IPost, IUser } from "~/models/post";

const { Title, Text } = Typography;

export default function DetailsPage() {
  // WIP - Get Details and Get User
  const router = useRouter();
  const postId = router.query.id;

  const {
    data: postsDetails,
    isLoading: isLoadingDetails,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ["posts-details", postId],
    queryFn: async () => {
      const data = await axiosInstance
        .get(`/posts/${postId as string}`)
        .then((res) => {
          return res.data as IPost;
        });
      return data;
    },
    enabled: !!postId,
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const data = await axiosInstance
        .get(`/posts/${postId as string}/comments`)
        .then((res) => {
          return res.data as IComment[];
        });
      return data;
    },
    enabled: !!postId,
  });

  const { data: poster } = useQuery({
    queryKey: ["poster", postsDetails?.user_id],
    queryFn: async () => {
      try {
        const data = await axiosInstance
          .get(`/users/${postsDetails?.user_id}`)
          .then((res) => {
            return res.data as IUser;
          });
        return data;
      } catch (error) {
        message.error(`Error: poster's user details not found!`);
        console.error(error);
      }
    },
    enabled: !!postsDetails?.user_id,
  });

  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);

  const onUpdatePost = async () => {
    setOpenUpdateDialog(false);
    await refetchDetails();
  };

  const mutationDeletePost = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: () => {
      return axiosInstance
        .delete(`/posts/${postId as string}`)
        .catch((error) => {
          return message.error(`Error: ${error}`);
        })
        .finally(() => {
          message.success(`Delete post success!`);
          setOpenConfirmationDialog(false);
        });
    },
  });

  const onDeletePost = async () => {
    mutationDeletePost.mutate();
    return await router.push("/");
  };

  return (
    <>
      <CreateUpdatePost
        key="update-dialog"
        type="update"
        open={openUpdateDialog}
        details={postsDetails}
        onConfirm={async () => await onUpdatePost()}
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
            {isLoadingDetails && <Skeleton paragraph={{ rows: 7 }} />}
            {!isLoadingDetails && postsDetails && (
              <>
                <Flex
                  justify="space-between"
                  className="mb-4 w-full text-center"
                >
                  <Title level={2} className="m-0 p-0">
                    {postsDetails?.title}
                  </Title>
                </Flex>

                <Text className="mb-8 ml-2 text-left">
                  Posted By{" "}
                  <b>{poster?.name ? poster?.name : postsDetails?.user_id}</b>
                </Text>
                <Text className="text-left">{postsDetails?.body}</Text>

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
              </>
            )}
          </Flex>
        </Flex>

        <Flex vertical justify="center" className="post-container my-4">
          <Title level={4} className="text-left">
            Comments
          </Title>

          {!comments || comments.length === 0 ? (
            <Flex
              vertical
              justify="center"
              align="center"
              className="m-1 my-8 h-full"
            >
              <Text type="secondary"> No Comments </Text>
            </Flex>
          ) : null}

          {comments
            ? comments?.map((comment) => (
                <Flex
                  vertical
                  justify="center"
                  key={comment.id}
                  className="h-full w-full border-t border-slate-300 px-4 py-2 last:border-b"
                >
                  <Text strong className="text-left">
                    {comment.name} -{" "}
                    <Text type="secondary">{comment.email}</Text>
                  </Text>
                  <Text className="text-left">{comment.body}</Text>
                </Flex>
              ))
            : null}
        </Flex>
      </Flex>
    </>
  );
}
