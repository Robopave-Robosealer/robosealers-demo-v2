import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";
import { Badge, Flex, Loader } from "@mantine/core";
import AreaTimeFilter from "../../design-system/components/AreaTimeFilter";
import SealantVolumeTable from "../components/SealantVolumeTable";
import { useFetchOperationData } from "../../design-system/hooks/use-fetch-operation-filter";
import { useEffect } from "react";

export default function SealantVolume() {
  const { operationData, loading, fetchData, handleFilter } =
    useFetchOperationData({
      totalField: "sealantVolume",
    });

  useEffect(() => {
    fetchData({ totalField: "sealantVolume" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Sealant Volume</title>
      </Helmet>
      <MainTitle title="Sealant Volume" />

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
                  Total Sealant Volume:{" "}
                  {operationData.totals.sealantVolumeTotal} L
                </Badge>
              </Flex>
            )}
          <SealantVolumeTable elements={operationData?.result} />
        </>
      )}
    </>
  );
}
