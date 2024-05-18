import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";
import { Badge, Flex, Loader } from "@mantine/core";
import AreaTimeFilter from "../../design-system/components/AreaTimeFilter";
import RunningHoursTable from "../components/RunningHoursTable";
import { useFetchOperationData } from "../../design-system/hooks/use-fetch-operation-filter";
import { useEffect } from "react";

export default function RunningHours() {
  const { operationData, loading, fetchData, handleFilter } =
    useFetchOperationData({
      totalField: "runningHours",
    });

  useEffect(() => {
    fetchData({ totalField: "runningHours" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Running Hours</title>
      </Helmet>
      <MainTitle title="Running Hours" />
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
                  Total Running Hours: {operationData.totals.runningHoursTotal}{" "}
                  Hours
                </Badge>
              </Flex>
            )}
          <RunningHoursTable elements={operationData?.result} />
        </>
      )}
    </>
  );
}
