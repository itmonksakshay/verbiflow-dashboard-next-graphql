"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useFilters } from "../filters/context/FilterContext";
import { useEventSchema } from "../hooks/useEventSchema";
import { EventCount } from "@/lib/gqls";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

export type ChartJSDataset  =  { 
  label: string;
  data: number[]; 
  backgroundColor: string;
  stack:string;
}

const AppStackedBarChart = () => {

  const {dataToRender: eventData, filters} = useFilters();
  const [metadataIdToName, setMetadataIdToName] = useState<Map<number,string>>(new Map());

  useEffect(() => {
    // Create a new Map to hold the updated values
    const updatedMap = new Map();

    // Populate the new Map based on filters
    filters?.groupBy.forEach(filter => {
      updatedMap.set(filter.metadataId, `${filter.propertyValue} ${filter.metadataName}`);
    });

    // Update the state with the new Map to ensure React detects the change and re-renders
    setMetadataIdToName(updatedMap);

    // Log the updated Map for debugging
    console.log(updatedMap);
  }, [filters]); // Depend only on filters as metadataIdToName is now being set, not mutated directly
  


  // Helper function to generate random colors
  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Processing the provided data to fit Chart.js structure
  const processData = (datas: EventCount[]) => {
    // Initialize arrays to store labels and datasets
    // Parse the data
    let labels: string[] = []; // For storing unique dates
    let datasets: ChartJSDataset[] = []; // For datasets representing each variantId and metadata value combination
    let datasetMap :Map<string,ChartJSDataset> = new Map(); // A map to easily find datasets

    datas.forEach(event => {
      labels.push(event.date); // Assuming each event date is unique
      event.data.forEach(item => {
        let metadataKeys =  item.eventMetadatas.map((metadataVal)=> { 
          if(metadataIdToName.get(metadataVal.metadataSchemaId))
            return `${metadataIdToName.get(metadataVal.metadataSchemaId)} ${metadataVal.value}`
        })
        let key = metadataKeys.join(" ");

        key = `Variant ${item.variantId} ${key}`
        if (!datasetMap.has(key)) {
          let newDataset = {
            label: key,
            data: new Array(datas.length).fill(0),
            backgroundColor: getRandomColor(),
            stack: `Variant ${item.variantId}`
          };
          datasets.push(newDataset);
          datasetMap.set(key,newDataset);
        } 
        let dateIndex = labels.indexOf(event.date);
        const existingData = datasetMap.get(key); 
        if(existingData){ 
          existingData.data[dateIndex] += item.countValue;
        }
      });
    })
    console.log(datasets);
    return { labels, datasets };
  };

  const { labels, datasets } = processData(eventData);

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const horizontal = false; 
  const h = "100%" 
  const y_title = "event"
  const y_label = "event"
  return (
    <Container height={"90%"} width={"100%"}>
      <Chart
        type="bar"
        data={chartData}
        options={{
          responsive: true,
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
                  return value;
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
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'nearest',
              intersect: true
            }
          },
          
        }}
      />
    </Container>
  );
};

export default AppStackedBarChart;