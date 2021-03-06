import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import EmailConfirmationScreen from "./app/screens/EmailConfirmationScreen";
import MenuScreen from "./app/screens/MenuScreen";
import MapScreen from "./app/screens/MapScreen";
import PlacesScreen from "./app/screens/PlacesScreen";
import TrendsScreen from "./app/screens/TrendsScreen";
import TrendDetailsScreen from "./app/screens/TrendDetailsScreen";

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="LoginScreen" component={LoginScreen} />
        <stack.Screen name="MapScreen" component={MapScreen} />
        <stack.Screen
          name="EmailScreen"
          component={EmailConfirmationScreen}
          options={{ gestureEnabled: false }}
        />
        <stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <stack.Screen name="MenuScreen" component={MenuScreen} />
        <stack.Screen name="PlacesScreen" component={PlacesScreen} />
        <stack.Screen name="TrendsScreen" component={TrendsScreen} />
        <stack.Screen
          name="TrendDetailsScreen"
          component={TrendDetailsScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
