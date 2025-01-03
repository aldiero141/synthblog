import {
  Flex,
  Card,
  Skeleton,
  Typography,
  Button,
  Input,
  Pagination,
} from "antd";
import { dummyPostData, dummyUser } from "~/utils/dummy";
import { useRouter, useSearchParams } from "next/navigation";
import { FormOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateUpdatePost from "~/components/Dialog/CreateUpdatePost";
import type { GetProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "~/utils/axios";
import { UserState } from "~/store/user";
import type { ICreatePostValues, IPost } from "../models/post";

const { Title, Text } = Typography;

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

export default function Posts() {
  const router = useRouter();
  const { data } = UserState();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [q, setQ] = useState<string>("");
  const [totalPost, setTotalPost] = useState<number>(100);

  const {
    data: posts,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts", page, perPage, q],
    queryFn: async () => {
      const data = await axiosInstance
        .get("/posts", {
          params: {
            page: page,
            per_page: perPage,
            title: q,
          },
        })
        .then((res) => {
          setTotalPost(res.headers["x-pagination-total"] as number);
          return res.data as IPost[];
        });
      return data;
    },
    enabled: !!data?.token,
  });

  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  const onConfirmCreatePost = async () => {
    setOpenCreatePost(false);
    await refetchPosts();
  };

  const onChangePage = (currPage: number, pageSize: number) => {
    setPage(page);
    setPerPage(pageSize);
    router.replace(`?page=${currPage}&per_page=${pageSize}&q=${q}`);
  };

  // Search
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setQ(value);
    setPage(1);
    setPerPage(10);
    router.replace(`?page=${page}&per_page=${perPage}&q=${value}`);
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      setPage(Number(searchParams.get("page")));
    }
    if (searchParams.get("per_page")) {
      setPerPage(Number(searchParams.get("per_page")));
    }
    if (searchParams.get("q")) {
      setQ(String(searchParams.get("q")));
    }
  }, [searchParams]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetchPosts();
  }, [q]);

  return (
    <>
      <CreateUpdatePost
        key="create-dialog"
        type="create"
        open={openCreatePost}
        onConfirm={() => onConfirmCreatePost()}
        onCancel={() => setOpenCreatePost(false)}
      />
      <Flex vertical justify="center" align="center" className="m-1 h-full">
        <Title style={{ margin: "0, 1em" }}> Home </Title>

        <Flex vertical gap={12} className="post-container">
          <Flex justify="space-between" gap={16}>
            <Search
              placeholder="Search Post Title..."
              onSearch={onSearch}
              allowClear
            />

            <Button
              className="self-end"
              icon={<FormOutlined />}
              onClick={() => setOpenCreatePost(true)}
            >
              Create Post
            </Button>
          </Flex>

          {isLoadingPosts &&
            dummyPostData.map((post) => (
              <Card className="post-card" key={post.id}>
                <Skeleton paragraph={{ rows: 6 }} />
              </Card>
            ))}

          {!isLoadingPosts && (
            <>
              {!posts ||
                (posts.length > 0 &&
                  posts.map((post) => (
                    <Card
                      hoverable
                      className="post-card"
                      title={post.title}
                      key={post.id}
                      onClick={() => router.push(`/details/${post.id}`)}
                    >
                      <Flex vertical justify="space-between" gap={16}>
                        {post.body}
                        <Text className="cursor-pointer text-right">
                          Read More
                        </Text>
                      </Flex>
                    </Card>
                  )))}
              {!posts ||
                (posts.length === 0 && (
                  <Flex
                    vertical
                    justify="center"
                    align="center"
                    className="m-1 my-8 h-full"
                  >
                    <Title level={4}> No Posts Found </Title>
                  </Flex>
                ))}
            </>
          )}
        </Flex>

        <Pagination
          className="my-8"
          current={page}
          onChange={onChangePage}
          total={totalPost}
        />
      </Flex>
    </>
  );
}
