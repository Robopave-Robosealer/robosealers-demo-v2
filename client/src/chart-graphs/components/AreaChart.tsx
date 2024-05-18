import { Box, Paper } from "@mantine/core";
import MainTitle from "../../design-system/components/MainTitle";
import { Pie } from "react-chartjs-2";

export default function AreaChart() {
  const data = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Area Distance Per Month",
        data: [100, 50, 40, 120, 25, 71],
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <Box>
      <MainTitle title="Area Distance Per Month" />
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Box h="300px">
          <Pie
            data={data}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
