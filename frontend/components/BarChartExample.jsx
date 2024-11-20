import React, { useState } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;

const salesData = {
  2023: [20, 15, 28, 80, 99, 43, 50, 60, 70, 90, 100, 120],
  2024: [10, 50, 10, 85, 10, 55, 10, 75, 80, 95, 115, 130],
  2025: [40, 60, 65, 90, 120, 60, 15, 80, 85, 100, 125, 140],
};

const chartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
  // decimalPlaces: 2,
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
  const [selectedYear, setSelectedYear] = useState(2023);
  const [data, setData] = useState(salesData[selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setData(salesData[year]);
  };

  return (
    <View style={{ paddingTop: "3%" }}>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Times New Roman",
            paddingTop: "2%",
            fontWeight: "bold",
          }}
        >
          Sales Performance
        </Text>
        <Picker
          selectedValue={"Year - " + selectedYear}
          style={{
            color: "white",
            backgroundColor: "#ff6347",
            height: 35,
            width: 100,
            borderRadius: 10,
          }}
          onValueChange={(itemValue) => handleYearChange(itemValue)}
        >
          <Picker.Item label="2023" value={2023} />
          <Picker.Item label="2024" value={2024} />
          <Picker.Item label="2025" value={2025} />
        </Picker>
      </View>

      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          marginTop: 0,
        }}
        style={{
          marginVertical: 0,
          width: screenWidth,
        }}
        // showsHorizontalScrollIndicator={false} // This hides the horizontal scrollbar
        // showsVerticalScrollIndicator={false} // This hides the vertical scrollbar (if needed)
      >
        <BarChart
          style={{
            borderRadius: 16,
          }}
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={screenWidth * 2.5}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </ScrollView>
    </View>
  );
};

export default BarChartExample;

// import React from "react";
// import { ScrollView, Text, View, Dimensions } from "react-native";
// import { BarChart } from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;

// const data = {
//   labels: [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43, 50, 60, 70, 90, 100, 120],
//     },
//   ],
// };

// const chartConfig = {
//   backgroundColor: "#1cc910",
//   backgroundGradientFrom: "#eff3ff",
//   backgroundGradientTo: "#efefef",
//   decimalPlaces: 2,
//   color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
//   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   style: {
//     borderRadius: 16,
//   },
//   propsForDots: {
//     r: "6",
//     strokeWidth: "2",
//     stroke: "#ffa726",
//   },
// };

// const BarChartExample = () => {
//   return (
//     <View
//       style={
//         {
//           // flex: 1,
//           // justifyContent: "center",
//           // alignItems: "center",
//           // paddingVertical: 20,
//         }
//       }
//     >
//       <Text
//         style={{
//           fontSize: 20,
//           fontFamily: "Times New Roman",
//           paddingTop: "3%",
//           fontWeight: "bold",
//         }}
//       >
//         Sales Performance
//       </Text>
//       <ScrollView
//         horizontal={true}
//         contentContainerStyle={{
//           marginTop: 0,
//         }}
//         style={{
//           marginVertical: 0,
//           width: screenWidth,
//         }}
//       >
//         <BarChart
//           style={{
//             borderRadius: 16,
//           }}
//           data={data}
//           width={screenWidth * 2.5}
//           height={220}
//           chartConfig={chartConfig}
//           verticalLabelRotation={30}
//         />
//       </ScrollView>

//       {/* <View style={{ marginTop: 20 }}>
//         <Text>Additional details or content go here.</Text>
//       </View> */}
//     </View>
//   );
// };

// export default BarChartExample;
