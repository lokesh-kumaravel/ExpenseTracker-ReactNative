import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Expense from "./components/Expense";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons"; // Ionicons icon set
import AddContent from "./components/AddContent";
import { PieChart } from "react-native-chart-kit";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#f8f9fa" },
        tabBarActiveTintColor: "#ff6347", // Active tab color (Tomato red)
        tabBarInactiveTintColor: "#6c757d", // Inactive tab color (Gray)
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Expense"
        component={Expense}
        options={{
          tabBarLabel: "Expense",
          tabBarIcon: ({ color, size }) => (
            <Icon name="credit-card" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContent"
        component={AddContent}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Expense Breakdown"
        component={PieChart} // PieChartComponent is your new component
        options={{
          tabBarLabel: "Expense Breakdown", // The label for this tab
          tabBarIcon: ({ color, size }) => (
            <Icon name="pie-chart" size={size} color={color} /> // You can use any icon
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>

    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarStyle: { backgroundColor: "#f8f9fa" },
    //   }}
    // >
    //   <Tab.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       tabBarLabel: "Home",
    //       tabBarIcon: ({ color, size }) => (
    //         <Icon name="home" size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Expense"
    //     component={Expense}
    //     options={{
    //       tabBarLabel: "Expense",
    //       tabBarIcon: ({ color, size }) => (
    //         <Icon name="credit-card" size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={Profile}
    //     options={{
    //       tabBarLabel: "Profile",
    //       tabBarIcon: ({ color, size }) => (
    //         <Icon name="user" size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarStyle: { backgroundColor: "#f8f9fa" },
    //   }}
    // >
    //   <Tab.Screen
    //     name="Home"
    //     component={Home}
    //     // options={{ tabBarLabel: "Home" }}
    //   />
    //   <Tab.Screen
    //     name="Expense"
    //     component={Expense}
    //     options={{ tabBarLabel: "Expense" }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={Profile}
    //     options={{ tabBarLabel: "Profile" }}
    //   />
    // </Tab.Navigator>
  );
};

// Main App Navigator
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{ headerShown: false }} // Hides the stack header for the tab navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/RegisterPage";
// import Home from "./components/Home";

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginPage} />
//         <Stack.Screen name="Register" component={RegisterPage} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
