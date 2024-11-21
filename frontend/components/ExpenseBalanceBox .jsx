// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const ExpenseBalanceBox = ({ expensesPercentage, savingsPercentage }) => {
//   return (
//     <View style={styles.container}>
//       {/* Box that contains the expense and saving sections */}
//       <View style={styles.box}>
//         {/* Expense section */}
//         <View
//           style={[
//             styles.section,
//             { width: `${expensesPercentage}%`, backgroundColor: "#ff6347" }, // Tomato red for expenses
//           ]}
//         >
//           <Text style={styles.text}>{`${expensesPercentage}% Expenses`}</Text>
//         </View>

//         {/* Saving section */}
//         <View
//           style={[
//             styles.section,
//             { width: `${savingsPercentage}%`, backgroundColor: "#5cb85c" }, // Green for savings
//           ]}
//         >
//           <Text style={styles.text}>{`${savingsPercentage}% Savings`}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   box: {
//     width: "80%",
//     height: 60,
//     flexDirection: "row",
//     borderRadius: 8,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   section: {
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100%",
//     paddingHorizontal: 5,
//   },
//   text: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default ExpenseBalanceBox;
