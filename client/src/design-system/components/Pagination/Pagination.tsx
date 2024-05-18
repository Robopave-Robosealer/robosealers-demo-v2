import { Flex, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type PaginationProps = {
  count: number;
  limit?: number;
};
export default function PaginationList({ count, limit = 1 }: PaginationProps) {
  const navigate = useNavigate();
  const route = useLocation();
  const [activePage, setPage] = useState(1);
  const pages = count / limit;
  console.log(route);
  useEffect(() => {
    const active = parseInt(route?.search?.split("=")[1]);
    console.log(active);

    setPage(active);
  }, [route.pathname]);

  return (
    <>
      <Flex justify="center" my="md">
        <Pagination
          radius="xl"
          value={activePage}
          onChange={() => {
            setPage;
            navigate(`${route.pathname}?page=${activePage}`);
          }}
          total={pages}
        />
      </Flex>
    </>
  );
}
