import axiosInstance from "../BaseURL";
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

const AddContent = () => {
  const [isExpense, setIsExpense] = useState(true);
  const [categories, setCategories] = useState([]);
  const UserId = localStorage.getItem("UserId");
  const [expenseData, setExpenseData] = useState({
    userId: UserId,
    categoryId: "",
    amount: "",
    description: "",
    date: "",
    notes: "",
  });
  // console.log(UserId);
  const [categoryData, setCategoryData] = useState({
    name: "",
    userId: UserId,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const UserId = localStorage.getItem("UserId");
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories", {
          params: { userId: UserId },
        });
        // console.log("Categories response:", response.data);

        if (
          response.data.categoryDetails &&
          Array.isArray(response.data.categoryDetails)
        ) {
          setCategories(response.data.categoryDetails);
        } else {
          setError("Invalid categories data format.");
        }
      } catch (err) {
        // console.error("Failed to fetch categories:", err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySubmit = async () => {
    if (!categoryData.name) {
      Alert.alert("Error", "Please enter a category name.");
      return;
    }

    try {
      categoryData.userId = UserId;
      // console.log(categoryData);
      const response = await axiosInstance.post("/categories", categoryData);
      Alert.alert("Success", "Category added successfully!");
      setCategoryData({ name: "", userId: UserId });
    } catch (err) {
      Alert.alert("Error", "Failed to add category.");
    }
  };
  const handleExpenseChange = (name, value) => {
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleCategoryChange = (name, value) => {
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleExpenseSubmit = async () => {
    // console.log("Adding the data here : " + expenseData.categoryId);
    // console.log("Adding the data here : " + expenseData.amount);
    // console.log("Adding the data here : " + expenseData.description);
    // console.log("Adding the data here : " + expenseData.date);
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
      const response = await axiosInstance.post("/expenses", expenseData);
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
