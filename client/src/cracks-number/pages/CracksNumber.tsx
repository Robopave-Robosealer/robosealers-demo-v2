import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";
import { Badge, Flex, Loader } from "@mantine/core";
import AreaTimeFilter from "../../design-system/components/AreaTimeFilter";
import CracksNumberTable from "../components/CracksNumberTable";
import { useFetchOperationData } from "../../design-system/hooks/use-fetch-operation-filter";
import { useEffect } from "react";

export default function CracksNumber() {
  const { operationData, loading, fetchData, handleFilter } =
    useFetchOperationData({
      totalField: "cracksNumber",
    });

  useEffect(() => {
    fetchData({ totalField: "cracksNumber" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Cracks Number</title>
      </Helmet>
      <MainTitle title="Cracks Number" />
      <AreaTimeFilter onFilter={handleFilter} />
      {loading ? (
        <Flex justify="center" my="md">
          <Loader type="dots" />
        </Flex>
      ) : (
        <>
          {operationData &&
            operationData.result &&
            operationData.result.length > 0 && (
              <Flex justify="center" my="md">
                <Badge color="green" variant="light" size="lg">
                  Total Cracks Number: {operationData.totals.cracksNumberTotal}
                </Badge>
              </Flex>
            )}
          <CracksNumberTable elements={operationData?.result} />
        </>
      )}
    </>
  );
}
