import { LogoutOutlined } from "@ant-design/icons";
import {
  Layout,
  Typography,
  Flex,
  theme,
  Dropdown,
  type MenuProps,
  message,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { IUserCredentials } from "~/models/component";
import { UserState } from "~/store/user";
import axiosInstance from "~/utils/axios";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function header() {
  const { data: userCredential } = UserState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Flex
          gap={8}
          align="center"
          data-testid="cy-header-logout"
          onClick={() => logOut()}
        >
          <LogoutOutlined className="text-red-500" />
          <Text type="danger">Log Out</Text>
        </Flex>
      ),
    },
  ];

  const logOut = () => {
    mutationDeletePost.mutate();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userId, setUserId] = useState<number>(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutationDeletePost = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: () => {
      return axiosInstance
        .delete(`/users/${String(userId)}`)
        .then(() => {
          localStorage.clear();
          window.location.href = "/";
        })
        .catch((error) => {
          return message.error(`Error: ${error}`);
        })
        .finally(() => {
          message.success(`Logout success!`);
        });
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState<string>("User");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const localStorageUser = JSON.parse(
      userStorage ? userStorage : "{}",
    ) as IUserCredentials;
    if (userCredential?.name) setName(userCredential?.name);
    if (localStorageUser?.token) setName(localStorageUser?.name);
    if (localStorageUser?.id) setUserId(localStorageUser?.id);
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (userCredential?.name) setName(userCredential?.name);
    if (userCredential?.id) setUserId(userCredential?.id);
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

          <Title data-testid="cy-header-title" level={4} style={{ margin: 0 }}>
            SynthBlog
          </Title>
        </Flex>

        <Flex align="center">
          <Dropdown menu={{ items }}>
            <Text>
              <a
                data-testid="cy-header-user"
                onClick={(e) => e.preventDefault()}
              >
                Welcome, {name} !
              </a>
            </Text>
          </Dropdown>
        </Flex>
      </Header>
    </>
  );
}
