"use client"
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";




function Chart({data, view}) {

  const [productsWithValue, setProductsWithValue] = useState([]);

  const config = {
    XAxisDataKey: view.keyName ,
    BarDataKey: view.keyForSum,
    chartConfig: {
      value: {
        color: "#2563eb",
      },
    }
  }

  useEffect(() => {
      if (data.length === 0) return;

      // Функция для получения уникальных значений и их суммирования
      const processDataSets = (key, keyForSum) => {
        const uniqueSet = new Set();
        data.forEach(item => uniqueSet.add(item[key]));
        return Array.from(uniqueSet).map(item => ({
          [key]: item,
          [keyForSum]: getSumInArrByKey(data, item, key, keyForSum),
        }));
      };

      function getSumInArrByKey(arr, valueForCompare, keyForCompare, keyForSum) {
        return arr.reduce((sum, item) => {
          if (item[keyForCompare] === valueForCompare) {
            sum += item[keyForSum];
          }
          return sum;
        }, 0);
      }

      let processedData = processDataSets(view.keyName, view.keyForSum);

      console.log(processedData)
      setProductsWithValue(processedData);
  }, [data]);


  return (
    <ChartContainer config={config.chartConfig} className="min-h-[200px] h-full w-full">
      <BarChart accessibilityLayer data={productsWithValue}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={config.XAxisDataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={config.BarDataKey} fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default React.memo(Chart)





