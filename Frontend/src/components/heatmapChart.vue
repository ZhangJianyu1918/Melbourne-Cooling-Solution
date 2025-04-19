<template>
  <div ref="heatmap" style="width: 100%; height: 600px;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "YearHeatmap",
  mounted() {
    const chart = echarts.init(this.$refs.heatmap);

    const data = [
      ["2024-04-01", 27.6],
      ["2024-04-02", 20.3],
      ["2024-04-03", 16.2],
      ["2024-04-04", 18.9],
      ["2024-04-05", 20.0],
    ];

    const option = {
      tooltip: {
        position: "top",
        formatter: (p) => `${p.data[0]}: ${p.data[1]} °C`,
      },
      visualMap: {
        min: 0,
        max: 40,
        calculable: true,
        orient: "horizontal",
        left: "center",
        top: "top",
      },
      calendar: {
        range: "2024",
        cellSize: ["auto", 20],
        dayLabel: {
          nameMap: "en",
        },
        monthLabel: {
          nameMap: "en",
        },
        yearLabel: { show: false },
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: data,
      },
    };

    chart.setOption(option);
  },
};
</script>
