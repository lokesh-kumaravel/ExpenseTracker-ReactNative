import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  Alert,
  StyleSheet,
} from "react-native";
import { CommonContext } from "./CommonContext";
import axiosInstance from "../BaseURL";

const AddContent = () => {
  const [activeForm, setActiveForm] = useState("expense");
  const [expenseData, setExpenseData] = useState({
    userId: localStorage.getItem("UserId"),
    categoryId: "",
    amount: "",
    description: "",
    date: "",
    notes: "",
  });
  const [categoryData, setCategoryData] = useState({
    name: "",
    userId: localStorage.getItem("UserId"),
  });
  const [budgetData, setBudgetData] = useState({
    userId: localStorage.getItem("UserId"),
    categoryId: "",
    limit: "",
  });

  const { categories, error, addExpense, fetchSalesData } =
    useContext(CommonContext);

  const handleInputChange = (name, value, setState) => {
    setState((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategorySubmit = async () => {
    if (!categoryData.name) {
      Alert.alert("Error", "Please enter a category name.");
      return;
    }

    try {
      const response = await axiosInstance.post("/categories", categoryData);
      Alert.alert("Success", "Category added successfully!");
      setCategoryData({ name: "", userId: categoryData.userId });
    } catch (err) {
      Alert.alert("Error", "Failed to add category.");
    }
  };

  const handleExpenseSubmit = async () => {
    if (
      !expenseData.categoryId ||
      !expenseData.amount ||
      !expenseData.description ||
      !expenseData.date
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const expenseDate = new Date(expenseData.date);
    const year = expenseDate.getFullYear();
    const month = expenseDate.getMonth() + 1;

    const expensePayload = {
      ...expenseData,
      year,
      month,
    };

    const salesPayload = {
      userId: expenseData.userId,
      year,
      month,
      amount: expenseData.amount,
    };

    try {
      const expenseResponse = await axiosInstance.post(
        "/expenses",
        expensePayload
      );
      Alert.alert("Success", "Expense added successfully!");

      const salesResponse = await axiosInstance.post("/sales", salesPayload);
      console.log("Sales data added successfully!", salesResponse.data);

      addExpense(expenseResponse.data.expense);
      fetchSalesData(year);
      setExpenseData({
        categoryId: "",
        amount: "",
        description: "",
        date: "",
        notes: "",
      });
    } catch (err) {
      Alert.alert("Error", "Failed to add expense and sales.");
      console.error("Error adding expense and sales:", err);
    }
  };

  const handleBudgetSubmit = async () => {
    if (!budgetData.categoryId || !budgetData.limit) {
      Alert.alert("Error", "Please select a category and set a budget limit.");
      return;
    }
    console.log(budgetData);
    try {
      const response = await axiosInstance.post("/budgets", budgetData);
      Alert.alert("Success", "Budget added successfully!");
      setBudgetData({ categoryId: "", limit: "", userId: budgetData.userId });
    } catch (err) {
      Alert.alert("Error", "Failed to add budget.");
      console.error("Error adding budget:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Content</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.toggleButtons}>
        <Button title="Add Expense" onPress={() => setActiveForm("expense")} />
        <Button
          title="Add Category"
          onPress={() => setActiveForm("category")}
        />
        <Button title="Add Budget" onPress={() => setActiveForm("budget")} />
      </View>

      {activeForm === "expense" && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={expenseData.amount}
            onChangeText={(text) =>
              handleInputChange("amount", text, setExpenseData)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={expenseData.description}
            onChangeText={(text) =>
              handleInputChange("description", text, setExpenseData)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={expenseData.date}
            onChangeText={(text) =>
              handleInputChange("date", text, setExpenseData)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Notes (optional)"
            value={expenseData.notes}
            onChangeText={(text) =>
              handleInputChange("notes", text, setExpenseData)
            }
          />
          <Picker
            selectedValue={expenseData.categoryId}
            style={styles.picker}
            onValueChange={(itemValue) =>
              handleInputChange("categoryId", itemValue, setExpenseData)
            }
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
          <Button title="Submit Expense" onPress={handleExpenseSubmit} />
        </View>
      )}

      {activeForm === "category" && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryData.name}
            onChangeText={(text) =>
              handleInputChange("name", text, setCategoryData)
            }
          />
          <Button title="Submit Category" onPress={handleCategorySubmit} />
        </View>
      )}

      {activeForm === "budget" && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Budget Limit"
            keyboardType="numeric"
            value={budgetData.limit}
            onChangeText={(text) =>
              handleInputChange("limit", text, setBudgetData)
            }
          />
          <Picker
            selectedValue={budgetData.categoryId}
            style={styles.picker}
            onValueChange={(itemValue) =>
              handleInputChange("categoryId", itemValue, setBudgetData)
            }
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
          <Button title="Submit Budget" onPress={handleBudgetSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  toggleButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default AddContent;
