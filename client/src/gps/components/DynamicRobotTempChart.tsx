import { Box, Title } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useIsMobile from "../../design-system/hooks/use-is-mobile";

export default function DynamicRobotTempChart() {
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
        data: [90, 89, 85, 70, 74, 71, 80, 55, 51, 47, 40, 30, 23, 15, 10],
        backgroundColor: "rgba(35,13,92,0.4)",
        borderColor: "rgba(35,13,92,0.4)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <>
      <Box w={mobile ? "100%" : "49%"} h={mobile ? "300px" : "400px"}>
        <Title order={5} c="gray.8">
          Robot Temperature
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
