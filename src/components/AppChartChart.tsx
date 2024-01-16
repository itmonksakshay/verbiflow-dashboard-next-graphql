"use client";
import { Container, background } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Colors,
  BarController,
  PieController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  PieController,
  Filler,
  Tooltip,
  Colors
);
const AppChartChart = ({ data }: { data: any }) => {
  return (
    <Container height={"100%"} width={"100%"}>
      <Chart
        type="bar"
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "white",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "white",
              },
              beginAtZero: true,
            },
          },
          //   borderColor: "rgb(107, 70, 193)",
          //   backgroundColor: "rgb(107, 70, 193)",
          //   color: "rgb(255, 255, 255)",
        }}
      />
    </Container>
  );
};
export default AppChartChart;
