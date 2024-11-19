import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Profile Page!</Text>
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

export default Profile;

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import LoginPage from "./LoginPage";
// import RegisterPage from "./RegisterPage";
// import Home from "./Home";
// import Profile from "./Profile"; // Import Profile

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginPage} />
//         <Stack.Screen name="Register" component={RegisterPage} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Profile" component={Profile} />{" "}
//         {/* Add Profile Screen */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
