import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BarChartExample from "./BarChartExample";

const Expense = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Profile Page!</Text>
      <BarChartExample />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Expense;
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const Profile = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Profile Page!</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Profile;
