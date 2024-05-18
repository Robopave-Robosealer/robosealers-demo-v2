import { Box, Paper } from "@mantine/core";
import MainTitle from "../../design-system/components/MainTitle";
import { Bar } from "react-chartjs-2";

export default function AccuracyChart() {
  const data = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Accuracy Percentage Per Month",
        data: [95, 50, 40, 80, 25, 71],
        backgroundColor: "rgba(55,96,92,0.5)",
        borderColor: "rgba(55,96,92,0.5)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  return (
    <Box>
      <MainTitle title="Accuracy Percentage Per Month" />
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <Box h="300px">
          <Bar
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
