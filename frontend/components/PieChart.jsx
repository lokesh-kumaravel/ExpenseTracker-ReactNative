import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

// Predefined expense data
const predefinedExpenses = [
  { category: { name: "Food" }, amount: 100 },
  { category: { name: "Transport" }, amount: 50 },
  { category: { name: "Entertainment" }, amount: 80 },
  { category: { name: "Utilities" }, amount: 30 },
  { category: { name: "Health" }, amount: 40 },
];

const PieChartComponent = () => {
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    // Categorize the expenses and set the data for the PieChart
    const categorizedData = categorizeExpenses(predefinedExpenses);
    setExpensesData(categorizedData);
  }, []);

  const categorizeExpenses = (expenses) => {
    // Reduce the expenses into categories
    const categories = expenses.reduce((acc, expense) => {
      const category = expense.category.name;
      if (acc[category]) {
        acc[category] += expense.amount;
      } else {
        acc[category] = expense.amount;
      }
      return acc;
    }, {});

    // Map categories to the format required by PieChart
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

  // Debugging: Check if the data is correctly populated
  useEffect(() => {
    console.log("Expenses Data:", expensesData);
  }, [expensesData]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Expense Breakdown</Text>

      {/* Show loading message if no data is available */}
      {expensesData.length === 0 ? (
        <Text style={styles.loading}>Loading data...</Text>
      ) : (
        <PieChart
          data={expensesData} // Pie chart data
          width={Dimensions.get("window").width - 40} // Set the width for the PieChart
          height={220} // Set the height for the PieChart
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
          accessor="population" // The key that represents the value of each slice
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 20]} // Optional customization for pie chart center
          absolute // To display the absolute value of each slice
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default PieChartComponent;
