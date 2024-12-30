import { Flex, Card, Row, Col, Typography } from "antd";
import { dummyPostData } from "utils/dummy";

const { Title } = Typography;

export default function Home() {
  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          height: "100%",
          margin: "1em",
          textAlign: "center",
        }}
      >
        <Title style={{ margin: "0, 1em" }}> Home </Title>

        <Row
          gutter={[24, 24]}
          className="w-full sm:w-[20em] md:w-[40em] lg:w-full"
        >
          {dummyPostData.map((post) => (
            <Col key={post.id} xs={24} md={12} lg={8}>
              <Card title={post.title} style={{ minHeight: "16em" }}>
                {post.body}
              </Card>
            </Col>
          ))}
        </Row>
      </Flex>
    </>
  );
}
