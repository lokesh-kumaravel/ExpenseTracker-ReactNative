import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../BaseURL";

export const CommonContext = createContext();

const CommonContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("UserId"));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchSalesData = async (selectedYear) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/sales`);
      const salesData = response.data.salesData;
      const selectedSalesData = salesData[selectedYear];
      console.log("From context : " + selectedSalesData);
      if (Array.isArray(selectedSalesData)) {
        setData(selectedSalesData);
      } else {
        console.error(`No sales data found for year ${selectedYear}`);
        Alert.alert("Error", `No sales data found for year ${selectedYear}`);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      Alert.alert("Error", "Failed to fetch sales data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const userId = localStorage.getItem("UserId");
      try {
        const response = await axiosInstance.get("/categories", {
          params: { userId },
        });
        if (
          response.data.categoryDetails &&
          Array.isArray(response.data.categoryDetails)
        ) {
          setCategories(response.data.categoryDetails);
        } else {
          setError("Invalid categories data format.");
        }
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };
    const fetchExpenses = async () => {
      const userId = localStorage.getItem("UserId");
      try {
        const response = await axiosInstance.get("/expenses", {
          params: { userId },
        });
        if (response.data.expenses && Array.isArray(response.data.expenses)) {
          setExpenses(response.data.expenses);
        } else {
          setError("Invalid expenses data format.");
        }
      } catch (err) {
        setError("Failed to fetch expenses.");
      }
    };

    if (userId) {
      fetchCategories();
      fetchExpenses();
    }
  }, [userId]);

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  return (
    <CommonContext.Provider
      value={{
        categories,
        expenses,
        error,
        setUserId,
        addExpense,
        fetchSalesData,
        data,
        loading,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContextProvider;
