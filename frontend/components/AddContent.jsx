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
  const [isExpense, setIsExpense] = useState(true);
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

  const { categories, error, addExpense, fetchSalesData } =
    useContext(CommonContext);

  const handleExpenseChange = (name, value) => {
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleCategoryChange = (name, value) => {
    setCategoryData({ ...categoryData, [name]: value });
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

    let userId;
    try {
      userId = await localStorage.getItem("UserId");
      if (!userId) {
        Alert.alert("Error", "User is not authenticated. Please log in.");
        return;
      }
    } catch (error) {
      console.error("Error retrieving userId from localStorage:", error);
      Alert.alert("Error", "Failed to retrieve user data.");
      return;
    }

    const expenseDate = new Date(expenseData.date);
    const year = expenseDate.getFullYear();
    const month = expenseDate.getMonth() + 1;

    const expensePayload = {
      userId: userId,
      categoryId: expenseData.categoryId,
      amount: expenseData.amount,
      description: expenseData.description,
      date: expenseData.date,
      notes: expenseData.notes,
      year: year,
      month: month,
    };

    const salesPayload = {
      userId: userId,
      year: year,
      month: month,
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {isExpense ? "Add Expense" : "Add Category"}
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.toggleButtons}>
        <Button title="Add Expense" onPress={() => setIsExpense(true)} />
        <Button title="Add Category" onPress={() => setIsExpense(false)} />
      </View>

      {isExpense ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={expenseData.amount}
            onChangeText={(text) => handleExpenseChange("amount", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={expenseData.description}
            onChangeText={(text) => handleExpenseChange("description", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={expenseData.date}
            onChangeText={(text) => handleExpenseChange("date", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Notes (optional)"
            value={expenseData.notes}
            onChangeText={(text) => handleExpenseChange("notes", text)}
          />
          <Picker
            selectedValue={expenseData.categoryId}
            style={styles.picker}
            onValueChange={(itemValue) =>
              handleExpenseChange("categoryId", itemValue)
            }
          >
            <Picker.Item label="Select Category" value="" />
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))
            ) : (
              <Picker.Item label="No categories available" value="" />
            )}
          </Picker>
          <Button title="Submit Expense" onPress={handleExpenseSubmit} />
        </View>
      ) : (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryData.name}
            onChangeText={(text) => handleCategoryChange("name", text)}
          />
          <Button title="Submit Category" onPress={handleCategorySubmit} />
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
