import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native-web";
import { CommonContext } from "./CommonContext";

const Transaction = () => {
  const { expenses, error } = useContext(CommonContext);

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expenses</Text>

      <ScrollView
        style={styles.transactionList}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {expenses.length > 0 ? (
          expenses.map((transaction) => (
            <View key={transaction._id} style={styles.transactionItem}>
              <Text style={styles.transactionTitle}>
                {transaction.description}
              </Text>
              <Text style={styles.transactionAmount}>
                {transaction.amount < 0
                  ? `-${transaction.amount}`
                  : `+${transaction.amount}`}
              </Text>
              <Text style={styles.transactionDate}>
                {new Date(transaction.date).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <Text>No transactions found.</Text>
        )}
      </ScrollView>

      {/* Uncomment and customize this button if you need a "See All" button */}
      {/* 
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See All</Text>
      </TouchableOpacity> 
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  transactionList: {
    marginTop: 10,
    flexDirection: "column",
    marginBottom: 20,
  },
  transactionItem: {
    backgroundColor: "#e5e8e8",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionAmount: {
    fontSize: 16,
    marginTop: 5,
    color: "#e74c3c",
  },
  transactionDate: {
    fontSize: 14,
    marginTop: 5,
    color: "#7f8c8d",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  seeAllButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  seeAllText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Transaction;
