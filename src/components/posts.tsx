import { Flex, Card, Skeleton, Typography, Button } from "antd";
import { dummyPostData } from "~/utils/dummy";
import { useRouter } from "next/navigation";
import { FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreatePost from "~/components/Dialog/CreateUpdatePost";

const { Title, Text } = Typography;

export default function Posts({ loading }: { loading: boolean }) {
  const router = useRouter();
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  return (
    <>
      <CreatePost
        key="create-dialog"
        type="create"
        open={openCreatePost}
        onConfirm={() => setOpenCreatePost(false)}
        onCancel={() => setOpenCreatePost(false)}
      />
      <Flex vertical justify="center" align="center" className="m-1 h-full">
        <Title style={{ margin: "0, 1em" }}> Home </Title>

        <Flex vertical gap={12} className="post-container">
          <Button
            className="self-end"
            icon={<FormOutlined />}
            onClick={() => setOpenCreatePost(true)}
          >
            Create Post
          </Button>

          {loading &&
            dummyPostData.map((post) => (
              <Card className="post-card" key={post.id}>
                <Skeleton paragraph={{ rows: 6 }} />
              </Card>
            ))}
          {!loading &&
            dummyPostData.map((post) => (
              <Card
                hoverable
                className="post-card"
                title={post.title}
                key={post.id}
                onClick={() => router.push(`/details/${post.id}`)}
              >
                <Flex vertical justify="space-between" gap={16}>
                  {post.body}
                  <Text className="cursor-pointer text-right">Read More</Text>
                </Flex>
              </Card>
            ))}
        </Flex>
      </Flex>
    </>
  );
}
