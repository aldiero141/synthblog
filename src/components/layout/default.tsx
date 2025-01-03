import Header from "../header";
import Footer from "../footer";
import { Flex, Layout, theme } from "antd";
const { Content } = Layout;

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Flex
        gap="middle"
        justify="space-between"
        vertical
        style={{ minHeight: "100vh", gap: 0 }}
      >
        <Header />
        <Content
          style={{
            padding: "0 48px",
            height: "100%",
            background: colorBgContainer,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Flex>
    </>
  );
}
