import {
  Flex,
  Card,
  Skeleton,
  Typography,
  Button,
  Input,
  Pagination,
  message,
} from "antd";
import { dummyPostData } from "~/utils/dummy";
import { useRouter, useSearchParams } from "next/navigation";
import { FormOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreatePost from "~/components/Dialog/CreateUpdatePost";
import type { GetProps } from "antd";

const { Title, Text } = Typography;

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

export default function Posts({ loading }: { loading: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);

  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  // Pagination
  // WIP - Get Total Page
  // const [totalPage, setTotalPage] = useState<number>(100);

  interface IParams {
    page: number;
    per_page: number;
    q: string;
  }
  const [params, setParams] = useState<IParams>({
    page: 1,
    per_page: 10,
    q: "",
  });

  const onChangePage = (page: number, pageSize: number) => {
    setParams({ ...params, page: page, per_page: pageSize });
    message.success(`Go to page ${page}`);
    message.success(`per page ${pageSize}`);
  };

  // Search
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setParams({ ...params, q: value });
  };

  useEffect(() => {
    router.replace(
      `?q=${params.q}&page=${params.page}&per_page=${params.per_page}`,
    );
  }, [params]);

  return (
    <>
      <CreatePost
        key="create-dialog"
        type="create"
        open={openCreatePost}
        onConfirm={() => setOpenCreatePost(false)}
        onCancel={() => setOpenCreatePost(false)}
      />
      <Flex vertical justify="center" align="center" className="m-1 h-full">
        <Title style={{ margin: "0, 1em" }}> Home </Title>

        <Flex vertical gap={12} className="post-container">
          <Flex justify="space-between" gap={16}>
            <Search placeholder="Search..." onSearch={onSearch} allowClear />

            <Button
              className="self-end"
              icon={<FormOutlined />}
              onClick={() => setOpenCreatePost(true)}
            >
              Create Post
            </Button>
          </Flex>

          {loading &&
            dummyPostData.map((post) => (
              <Card className="post-card" key={post.id}>
                <Skeleton paragraph={{ rows: 6 }} />
              </Card>
            ))}
          {!loading &&
            dummyPostData.map((post) => (
              <Card
                hoverable
                className="post-card"
                title={post.title}
                key={post.id}
                onClick={async () => await router.push(`/details/${post.id}`)}
              >
                <Flex vertical justify="space-between" gap={16}>
                  {post.body}
                  <Text className="cursor-pointer text-right">Read More</Text>
                </Flex>
              </Card>
            ))}
        </Flex>

        <Pagination
          className="my-8"
          defaultCurrent={1}
          onChange={onChangePage}
          total={100}
        />
      </Flex>
    </>
  );
}
