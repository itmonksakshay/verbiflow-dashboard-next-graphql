"use client";
import { Container } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
const AppLineChart = ({ data }: { data: any }) => {
  return (
    <Container>
      <Line data={data} />
    </Container>
  );
};
export default AppLineChart;
