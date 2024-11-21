import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Calendar } from "react-native-calendars"; // Import the calendar component

const predefinedExpenses = [
  { category: { name: "Food" }, amount: 100 },
  { category: { name: "Transport" }, amount: 50 },
  { category: { name: "Entertainment" }, amount: 80 },
  { category: { name: "Utilities" }, amount: 30 },
  { category: { name: "Health" }, amount: 40 },
];

const PieChartComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const [expensesData, setExpensesData] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    const categorizedData = categorizeExpenses(predefinedExpenses);
    setExpensesData(categorizedData);
  }, []);

  const categorizeExpenses = (expenses) => {
    const categories = expenses.reduce((acc, expense) => {
      const category = expense.category.name;
      if (acc[category]) {
        acc[category] += expense.amount;
      } else {
        acc[category] = expense.amount;
      }
      return acc;
    }, {});

    const pieChartData = Object.keys(categories).map((category) => ({
      name: category,
      population: categories[category],
      color: getRandomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));

    return pieChartData;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    console.log("Expenses Data:", expensesData);
  }, [expensesData]);
  const expensesPercentage = 75;
  const savingsPercentage = 25;

  return (
    <View style={styles.container}>
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
      {/* <ExpenseBalanceBox
        expensesPercentage={expensesPercentage}
        savingsPercentage={savingsPercentage}
      /> */}
      <Text style={styles.heading}>Your Expense Breakdown</Text>
      <View style={styles.box}>
        <View
          style={[
            styles.section,
            { width: `${expensesPercentage}%`, backgroundColor: "red" },
          ]}
        >
          <Text style={styles.text}>{`${expensesPercentage}% Expenses`}</Text>
        </View>

        <View
          style={[
            styles.section,
            { width: `${savingsPercentage}%`, backgroundColor: "green" },
          ]}
        >
          <Text style={styles.text}>{`${savingsPercentage}% Savings`}</Text>
        </View>
      </View>
      {expensesData.length === 0 ? (
        <Text style={styles.loading}>Loading data...</Text>
      ) : (
        <PieChart
          data={expensesData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fae9e4",
            backgroundGradientTo: "#fb5b5a",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 20]}
          absolute
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loading: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  box: {
    width: "80%",
    height: 60,
    flexDirection: "row",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedDate: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default PieChartComponent;
