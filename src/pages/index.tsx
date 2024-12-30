import { Flex, Card, Row, Col, Typography, Skeleton } from "antd";
import { dummyPostData } from "utils/dummy";
import { useState } from "react";

const { Title } = Typography;

export default function Home() {
  const [loading, setLoading] = useState<Boolean>(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          height: "100%",
          margin: "1em",
        }}
      >
        <Title style={{ margin: "0, 1em" }}> Home </Title>

        <Row
          gutter={[24, 24]}
          className="w-full sm:w-[20em] md:w-[40em] lg:w-full"
        >
          {loading &&
            dummyPostData.map((post) => (
              <Col key={post.id} xs={24} md={12} lg={8}>
                <Card className="min-h-[20em]">
                  <Skeleton paragraph={{ rows: 6 }} />
                </Card>
              </Col>
            ))}

          {!loading &&
            dummyPostData.map((post) => (
              <Col key={post.id} xs={24} md={12} lg={8}>
                <Card className="min-h-[20em]" title={post.title}>
                  {post.body}
                </Card>
              </Col>
            ))}
        </Row>
      </Flex>
    </>
  );
}
