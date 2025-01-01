import React from "react";
import { Layout, Typography } from "antd";
import Image from "next/image";

const { Header } = Layout;
const { Title } = Typography;

export default function header() {
  return (
    <>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo">
          <Image
            src="/react.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </div>

        <Title level={4} style={{ margin: 0 }}>
          SynthBlog
        </Title>
      </Header>
    </>
  );
}
