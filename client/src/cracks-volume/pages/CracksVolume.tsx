import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";
import { Badge, Flex, Loader } from "@mantine/core";
import AreaTimeFilter from "../../design-system/components/AreaTimeFilter";
import CracksVolumeTable from "../components/CracksVolumeTable";
import { useFetchOperationData } from "../../design-system/hooks/use-fetch-operation-filter";
import { useEffect } from "react";

export default function CracksVolume() {
  const { operationData, loading, fetchData, handleFilter } =
    useFetchOperationData({
      totalField: "cracksVolume",
    });

  useEffect(() => {
    fetchData({ totalField: "cracksVolume" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Cracks Volume</title>
      </Helmet>
      <MainTitle title="Cracks Volume" />
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
                  Total Cracks Volume: {operationData.totals.cracksVolumeTotal}{" "}
                  L
                </Badge>
              </Flex>
            )}
          <CracksVolumeTable elements={operationData?.result} />
        </>
      )}
    </>
  );
}
