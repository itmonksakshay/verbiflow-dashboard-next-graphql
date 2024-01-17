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
const AppChartChart = ({
  data,
  horizontal,
  y_label,
  x_label,
}: {
  data: any;
  horizontal?: boolean;
  y_label?: string;
  x_label?: string;
}) => {
  return (
    <Container height={"90%"} width={"100%"}>
      <Chart
        type="bar"
        data={data}
        options={{
          indexAxis: horizontal ? "y" : "x",
          maintainAspectRatio: false,
          plugins: {},
          scales: {
            x: {
              ticks: {
                display: x_label ? false : true,
                color: "white",
              },
              grid: {
                drawTicks: true,
                drawOnChartArea: false,
                color: "white",
              },
              beginAtZero: true,
              position: horizontal ? "top" : "bottom",
              title: x_label
                ? {
                    display: true,
                    color: "whitesmoke",
                    text: x_label,
                    font: {
                      size: 16,
                    },
                  }
                : undefined,
            },
            y: {
              ticks: {
                color: "white",
                font: horizontal
                  ? {
                      size: 10,
                    }
                  : undefined,
              },
              grid: {
                drawTicks: true,
                drawOnChartArea: false,
                color: "white",
              },
              beginAtZero: true,
              position: horizontal ? "right" : "left",
              title: y_label
                ? {
                    display: true,
                    color: "whitesmoke",
                    text: y_label,
                  }
                : undefined,
            },
          },
          interaction: {
            mode: "nearest",
            intersect: false,
            axis: horizontal ? "y" : "x",
          },
        }}
      />
    </Container>
  );
};
export default AppChartChart;
