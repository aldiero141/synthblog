import { Layout, Typography, Flex, theme } from "antd";
import Image from "next/image";
import { useUserState } from "~/store/user";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function header() {
  const { data } = useUserState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        className="flex items-center justify-between border-b border-b-slate-200"
        style={{ background: colorBgContainer }}
      >
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
          <Text>Welcome, {data?.name || "User"}!</Text>
        </Flex>
      </Header>
    </>
  );
}
