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
import Ionicons from "react-native-vector-icons/Ionicons";
import AddContent from "./components/AddContent";
import { PieChart } from "react-native-chart-kit";
import PieChartComponent from "./components/PieChart";
import CommonContextProvider from "./components/CommonContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <CommonContextProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#f8f9fa" },
          tabBarActiveTintColor: "#ff6347",
          tabBarInactiveTintColor: "#6c757d",
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
          component={PieChartComponent}
          options={{
            tabBarLabel: "Expense Breakdown",
            tabBarIcon: ({ color, size }) => (
              <Icon name="pie-chart" size={size} color={color} />
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
    </CommonContextProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
