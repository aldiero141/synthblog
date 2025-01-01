import React from "react";
import { Flex, Card, Skeleton, Typography } from "antd";
import { dummyPostData } from "~/utils/dummy";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function Posts({ loading }: { loading: boolean }) {
  const router = useRouter();
  return (
    <>
      <Flex vertical justify="center" align="center" className="m-1 h-full">
        <Title style={{ margin: "0, 1em" }}> Home </Title>

        <Flex vertical gap={12} className="post-container">
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
