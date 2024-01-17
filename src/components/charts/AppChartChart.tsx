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
          // borderColor: "#ffffff",

          scales: {
            x: {
              border: {
                display: true,
                color: "whitesmoke",
              },
              ticks: {
                color: "white",
                align: "center",
              },
              grid: {
                drawOnChartArea: false,
                color: "white",
                offset: false,
              },
              beginAtZero: true,
              position: horizontal ? "top" : "bottom",
            },
            y: {
              border: {
                display: true,
                color: "whitesmoke",
              },
              ticks: {
                color: "white",
                stepSize: 1,
                precision: 0,
                font: horizontal
                  ? {
                      size: 10,
                    }
                  : undefined,
                callback: (value, index, values) => {
                  return value + (y_label || "");
                },
              },
              grid: {
                drawOnChartArea: false,
                color: "white",
                offset: false,
              },
              beginAtZero: true,
              position: horizontal ? "right" : "left",
            },
          },
          interaction: {
            mode: "nearest",
            intersect: false,
            axis: horizontal ? "y" : "x",
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </Container>
  );
};
export default AppChartChart;
