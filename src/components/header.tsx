import { Layout, Typography, Flex, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { IUserCredentials } from "~/models/component";
import { UserState } from "~/store/user";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function header() {
  const { data: userCredential } = UserState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState<string>("User");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const localStorageUser = JSON.parse(
      userStorage ? userStorage : "{}",
    ) as IUserCredentials;
    if (userCredential?.name) return setName(userCredential?.name);
    if (localStorageUser?.token) return setName(localStorageUser?.name);
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (userCredential?.name) return setName(userCredential?.name);
  }, [userCredential]);

  return (
    <>
      <Header
        className="flex items-center justify-between border-b border-b-slate-200"
        style={{ background: colorBgContainer }}
      >
        <Flex
          align="center"
          className="cursor-pointer"
          onClick={() => router.push("/")}
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
          <Text>Welcome, {name}!</Text>
        </Flex>
      </Header>
    </>
  );
}
