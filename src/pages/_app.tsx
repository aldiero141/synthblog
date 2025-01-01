import { type AppType } from "next/app";
import { ConfigProvider, theme, FloatButton } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Layout from "~/components/layout/default";
import type { ThemeConfig } from "antd";
import "~/styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  const [mode, setMode] = useState<string>("light");

  const themeConfig: ThemeConfig = {
    token: {
      fontSize: 16,
      colorPrimary: "#3c89e8",
      fontFamily: "Noto Sans",
    },
    algorithm: mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <Layout>
          <Component {...pageProps} />
          <FloatButton
            type="primary"
            shape="circle"
            onClick={() =>
              mode === "light" ? setMode("dark") : setMode("light")
            }
            style={{ position: "fixed", bottom: 16, right: 16 }}
            icon={mode === "light" ? <SunOutlined /> : <MoonOutlined />}
          />
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
export default MyApp;
