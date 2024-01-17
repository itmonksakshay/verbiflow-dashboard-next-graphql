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
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Colors
);
const AppPolarAreaChart = ({ data }: { data: any }) => {
  return (
    <Container>
      <Chart
        type="polarArea"
        data={data}
        // options={{
        //   scales: {
        //     x: {
        //       ticks: {
        //         color: "white",
        //       },
        //       grid: {
        //         color: "white",
        //       },
        //     },
        //     y: {
        //       ticks: {
        //         color: "white",
        //       },
        //       grid: {
        //         color: "white",
        //       },
        //       beginAtZero: true,
        //     },
        //   },
        //   //   borderColor: "rgb(107, 70, 193)",
        //   //   backgroundColor: "rgb(107, 70, 193)",
        //   //   color: "rgb(255, 255, 255)",
        // }}
      />
    </Container>
  );
};
export default AppPolarAreaChart;
