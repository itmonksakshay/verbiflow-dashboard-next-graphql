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
  ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";


type IProps = {
  data: ChartData<'bar',number[]>;
  horizontal?: boolean;
  y_label?: string;
  y_title?: string;
  h?: string;
}

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
  y_title,
  h,
}: IProps) => {
  return (
    <Container height={h || "90%"} width={"100%"}>
      <Chart
        type="bar"
        data={data}
        options={{
          indexAxis: horizontal ? "y" : "x",
          maintainAspectRatio: false,

          scales: {
            x: {
              border: {
                display: true,
                color: "#a0aec0",
              },
              ticks: {
                color: "#a0aec0",
                align: "center",
              },
              grid: {
                drawOnChartArea: false,
                color: "#a0aec0",
                offset: false,
              },
              beginAtZero: true,
              position: horizontal ? "top" : "bottom",
            },
            y: {
              border: {
                display: true,
                color: "#a0aec0",
              },
              ticks: {
                color: "#a0aec0",
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
                color: "#a0aec0",
                offset: false,
              },
              beginAtZero: true,
              position: horizontal ? "right" : "left",
              title: y_title
                ? {
                    display: true,
                    text: y_title,
                    color: "#a0aec0",
                  }
                : undefined,
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
