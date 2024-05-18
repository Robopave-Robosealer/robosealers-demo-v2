import { Box, Paper } from "@mantine/core";
import { Line } from "react-chartjs-2";
import MainTitle from "../../design-system/components/MainTitle";

export default function BatteryChart() {
  const data = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Battery Hours Per Month",
        data: [90, 89, 85, 70, 74, 71],
        backgroundColor: "rgba(555,96,92,0.9)",
        borderColor: "rgba(555,96,92,0.9)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <>
      <Box>
        <MainTitle title="Battery Hours Per Month" />
        <Paper shadow="md" radius="md" p="md" mb="xl">
          <Box h="300px">
            <Line
              data={data}
              options={{
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
