import { Box, Title } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useIsMobile from "../../design-system/hooks/use-is-mobile";

export default function DynamicOrientationChart() {
  const [numberXArray, setNumberXArray] = useState<any>([]);
  const [numberYArray, setNumberYArray] = useState<any>([]);
  const [current, setCurrent] = useState<any>(moment());
  const mobile = useIsMobile();

  useEffect(() => {
    let countDown: number = 30;
    const interval = setInterval(() => {
      countDown--;

      if (countDown === 0) {
        setCurrent(moment());
        setNumberXArray([]);
        setNumberYArray([]);
      }

      const randomXNumber = Math.floor(Math.random() * 100) + 1;
      const randomYNumber = Math.floor(Math.random() * 100) + 1;
      setNumberXArray((prevArray: any) => [...prevArray, randomXNumber]);
      setNumberYArray((prevArray: any) => [...prevArray, randomYNumber]);
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
        label: "X",
        data: numberXArray.length > 0 ? numberXArray : [0],
        backgroundColor: "rgba(79,192,12,0.4)",
        borderColor: "rgba(75,192,12,1)",
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Y",
        data: numberYArray.length > 0 ? numberYArray : [0],

        backgroundColor: "rgba(255,99,13,0.4)",
        borderColor: "rgba(255,99,13,1)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <>
      <Box w={mobile ? "100%" : "49%"} h={mobile ? "300px" : "400px"}>
        <Title order={5} c="gray.7">
          Live Orientation x , y
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
