import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Badge, Flex, Loader } from "@mantine/core";
import MainTitle from "../../design-system/components/MainTitle";
import DistanceTable from "../DistanceTable";
import AreaTimeFilter from "../../design-system/components/AreaTimeFilter";
import { useFetchOperationData } from "../../design-system/hooks/use-fetch-operation-filter";

export default function Distance() {
  const { operationData, loading, fetchData, handleFilter } =
    useFetchOperationData({
      totalField: "distance",
    });

  useEffect(() => {
    fetchData({ totalField: "distance" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Distance</title>
      </Helmet>
      <MainTitle title="Distance" />
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
                  Total Distance: {operationData.totals.distanceTotal} Km
                </Badge>
              </Flex>
            )}
          <DistanceTable elements={operationData?.result} />
        </>
      )}
    </>
  );
}
