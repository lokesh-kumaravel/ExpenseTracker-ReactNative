import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import BarChartExample from "./BarChartExample";
import Transaction from "./Transaction";
import { ScrollView } from "react-native-web";

const Expense = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Expense</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Calendar
          style={{
            width: "100%",
            height: 300,
            backgroundColor: "#f3f3f3",
          }}
          current={"2024-11-20"}
          minDate={"2023-01-01"}
          maxDate={"2025-12-31"}
          onDayPress={handleDayPress}
          monthFormat={"MM yyyy"}
          theme={{
            backgroundColor: "#f3f3f3",
            selectedDayBackgroundColor: "red",
            selectedDayBackgroundColor: "#1e90ff",
            selectedDayTextColor: "white",
            todayBackgroundColor: "#ff6347",
            todayTextColor: "white",
            arrowColor: "orange",
            monthTextColor: "red",
            fontWeight: "bold",
            textDayHeaderFontWeight: "bold",
            textMonthFontWeight: "bold",
            textMonthFontWeight: "bold",
          }}
        />

        {selectedDate ? (
          <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
        ) : (
          <Text style={styles.selectedDate}>No date selected</Text>
        )}
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingTop: "3%",
            },
          ]}
        >
          <View style={[styles.box, { backgroundColor: "#b91be5" }]}>
            {" "}
            <View style={[{ paddingLeft: "5%", paddingTop: "7%" }]}>
              <Text
                style={[styles.text1, { fontSize: "22px", color: "#d0d3d4" }]}
              >
                Total Salary{" "}
              </Text>
              <Text
                style={[styles.text1, { fontWeight: "bold", fontSize: "40px" }]}
              >
                $75,000
              </Text>
              <Text
                style={[styles.text1, { fontWeight: "bold", fontSize: "30px" }]}
              ></Text>
            </View>
          </View>
          <View style={[styles.box, { backgroundColor: "#f95700" }]}>
            {" "}
            <View style={[{ paddingLeft: "5%", paddingTop: "7%" }]}>
              <Text
                style={[styles.text1, { fontSize: "22px", color: "#d0d3d4" }]}
              >
                Total Expense{" "}
              </Text>
              <Text
                style={[styles.text1, { fontWeight: "bold", fontSize: "40px" }]}
              >
                $75,000
              </Text>
              <Text
                style={[styles.text1, { fontWeight: "bold", fontSize: "30px" }]}
              ></Text>
            </View>
          </View>
        </View>
        {/* <BarChartExample /> */}

        <Transaction />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 160,
    height: 140,
    borderRadius: 20,
  },
  text1: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  selectedDate: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Expense;
