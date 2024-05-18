import { Box, Title } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useIsMobile from "../../../design-system/hooks/use-is-mobile";

export default function DynamicSealantTempChart() {
  const [current, setCurrent] = useState<any>(moment());
  const mobile = useIsMobile();
  useEffect(() => {
    let countDown: number = 30;
    const interval = setInterval(() => {
      countDown--;

      if (countDown === 0) {
        setCurrent(moment());
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [current]);
  const [timeArray, setTimeArray] = useState<any>([]);

  useEffect(() => {
    const end = moment().add(1, "minutes");
    const tempTimeArray = [];

    while (current <= end) {
      tempTimeArray.push(current.format("HH:mm:ss"));
      current.add(2, "s");
    }

    setTimeArray(tempTimeArray);
  }, [current]);

  const data = {
    labels: timeArray,
    datasets: [
      {
        label: "Temperature",
        data: [90, 89, 85, 70, 74, 71, 60, 55, 51, 46, 40, 30, 20, 10],
        backgroundColor: "rgba(555,96,92,0.9)",
        borderColor: "rgba(555,96,92,0.9)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <>
      <Box w={mobile ? "100%" : "49%"} h="300px">
        <Title order={5} c="gray.7" ta={mobile ? "center" : undefined}>
          Sealant Temperature
        </Title>
        <Line
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </Box>
    </>
  );
}
