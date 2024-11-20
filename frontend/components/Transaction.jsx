import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native-web";

const transactions = [
  { id: 1, title: "Purchase at Store", amount: "-$45.00", date: "2024-11-19" },
  { id: 2, title: "Salary Payment", amount: "$3,000.00", date: "2024-11-18" },
  { id: 3, title: "Coffee Shop", amount: "-$5.00", date: "2024-11-17" },
  { id: 4, title: "Refund from Store", amount: "$20.00", date: "2024-11-16" },
  { id: 5, title: "Restaurant", amount: "-$30.00", date: "2024-11-15" },
  { id: 6, title: "Grocery Store", amount: "-$70.00", date: "2024-11-14" },
  { id: 7, title: "Grocery Store", amount: "-$70.00", date: "2024-11-14" },
  { id: 8, title: "Grocery Store", amount: "-$70.00", date: "2024-11-14" },
];

const Transaction = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>

      <ScrollView
        style={styles.transactionList}
        showsHorizontalScrollIndicator={false} // This hides the horizontal scrollbar
        showsVerticalScrollIndicator={false} // This hides the vertical scrollbar (if needed)
      >
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>{transaction.title}</Text>
            <Text style={styles.transactionAmount}>{transaction.amount}</Text>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
        ))}
      </ScrollView>

      {/* <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: "#f4f4f4",
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
