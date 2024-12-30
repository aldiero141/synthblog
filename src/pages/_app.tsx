import { type AppType } from "next/app";
import { ConfigProvider } from "antd";
import Layout from "components/layout/default";
import theme from "theme/themeConfig";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
};
export default MyApp;
