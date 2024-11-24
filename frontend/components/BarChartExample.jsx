import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Text, View, Dimensions, Alert } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import axiosInstance from "../BaseURL";
import { CommonContext } from "./CommonContext";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#1cc910",
  backgroundGradientFrom: "#eff3ff",
  backgroundGradientTo: "#efefef",
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
  const [selectedMonth, setSelectedMonth] = useState(1);
  const { fetchSalesData, data, loading } = useContext(CommonContext);

  useEffect(() => {
    fetchSalesData(selectedYear);
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
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
          selectedValue={selectedYear}
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

      <Picker
        selectedValue={selectedMonth}
        style={{
          color: "white",
          backgroundColor: "#ff6347",
          height: 35,
          width: 100,
          borderRadius: 10,
        }}
        onValueChange={(itemValue) => handleMonthChange(itemValue)}
      >
        {[...Array(12).keys()].map((i) => (
          <Picker.Item
            key={i}
            label={new Date(0, i).toLocaleString("en", { month: "long" })}
            value={i + 1}
          />
        ))}
      </Picker>

      {loading ? (
        <Text>Loading data...</Text>
      ) : (
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            marginTop: 0,
          }}
          style={{
            marginVertical: 0,
            width: screenWidth,
          }}
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
      )}
    </View>
  );
};

export default BarChartExample;
