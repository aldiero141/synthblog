import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function footer() {
  return (
    <>
      <Footer
        style={{ textAlign: "start", padding: "1em 2em", fontSize: "0.75rem" }}
      >
        SynthBlog ©{new Date().getFullYear()} Created by Aldo Aldiero
      </Footer>
    </>
  );
}
