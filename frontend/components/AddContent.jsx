import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

const AddContent = () => {
  const [isExpense, setIsExpense] = useState(true);
  const [categories, setCategories] = useState([]);
  const [expenseData, setExpenseData] = useState({
    categoryId: "",
    amount: "",
    description: "",
    date: "",
    notes: "",
  });
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        console.log("Categories response:", response.data);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setError("Invalid categories data format.");
        }
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleExpenseChange = (name, value) => {
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleCategoryChange = (name, value) => {
    setCategoryData({ ...categoryData, [name]: value });
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

    try {
      const response = await axios.post("/api/expenses", expenseData);
      Alert.alert("Success", "Expense added successfully!");
      setExpenseData({
        categoryId: "",
        amount: "",
        description: "",
        date: "",
        notes: "",
      });
    } catch (err) {
      Alert.alert("Error", "Failed to add expense.");
    }
  };

  const handleCategorySubmit = async () => {
    if (!categoryData.name) {
      Alert.alert("Error", "Please enter a category name.");
      return;
    }

    try {
      const response = await axios.post("/api/categories", categoryData);
      Alert.alert("Success", "Category added successfully!");
      setCategoryData({ name: "" });
    } catch (err) {
      Alert.alert("Error", "Failed to add category.");
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
                  key={category._id}
                  label={category.name}
                  value={category._id}
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
