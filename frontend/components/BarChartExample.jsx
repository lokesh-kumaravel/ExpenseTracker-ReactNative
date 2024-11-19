import React from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99],
    },
  ],
};

const chartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const BarChartExample = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 0,
      }}
    >
      <View style={{ flexShrink: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Sales Performance</Text>

        <BarChart
          style={{ marginVertical: 0, borderRadius: 16 }}
          data={data}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />

        <View style={{ marginTop: 20 }}>
          <Text>Additional details or content go here.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BarChartExample;
