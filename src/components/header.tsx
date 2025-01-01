import { Layout, Typography, Flex } from "antd";
import Image from "next/image";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function header() {
  return (
    <>
      <Header className="flex items-center justify-between">
        <Flex
          align="center"
          className="cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <Image
            src="/react.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />

          <Title level={4} style={{ margin: 0 }}>
            SynthBlog
          </Title>
        </Flex>

        <Flex align="center">
          <Text>Welcome, User!</Text>
        </Flex>
      </Header>
    </>
  );
}
