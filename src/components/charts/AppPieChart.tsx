"use client";
import { Container, background } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  BarElement,
  Filler,
  Colors,
  RadialLinearScale,
  ArcElement,
  BarController,
  TooltipModel,
  TooltipItem,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  ArcElement,
  BarElement,
  BarController,
  Filler,
  Tooltip,
  Colors
);
const AppPieChart = ({ data }: { data: any }) => {
  return (
    <Container>
      <Chart
        type="pie"
        data={data}
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: (item) => {
                  const sum = item.dataset.data.reduce(
                    (acc: number, v: number) => {
                      return acc + v;
                    },
                    0
                  );
                  const percentage = ((item.parsed / sum) * 100).toFixed(2);
                  return `${item.dataset.label!}: ${
                    item.parsed
                  } (${percentage}%)`;
                },
              },
            },
          },
        }}
      />
    </Container>
  );
};
export default AppPieChart;
