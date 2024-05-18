import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";
import { Flex, Loader } from "@mantine/core";
import AreaTimeFilter from "../../design-system/components/AreaTimeFilter";
import { useFetchOperationData } from "../../design-system/hooks/use-fetch-operation-filter";
import { useEffect } from "react";
import AllOperationsTable from "../components/AllOperationsTable";

export default function AllOperations() {
  const { operationData, loading, fetchData, handleFilter } =
    useFetchOperationData({});

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Operations</title>
      </Helmet>
      <MainTitle title="All Operations" />
      <AreaTimeFilter onFilter={handleFilter} />
      {loading ? (
        <Flex justify="center" my="md">
          <Loader type="dots" />
        </Flex>
      ) : (
        <>
          <AllOperationsTable elements={operationData?.result} />
        </>
      )}
    </>
  );
}
