import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { styles } from "../styles/MenuScreenStyles";
import { Footer } from "../components/Footer";
import { removeFromStorage } from "../components/SecureStore";

function MenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {Footer}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.menuOptionView}
          onPress={() => navigation.navigate("MapScreen")}
        >
          <Text style={styles.menuOptionText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuOptionView}
          onPress={() => navigation.navigate("PlacesScreen")}
        >
          <Text style={styles.menuOptionText}>Places</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuOptionView}
          onPress={() => navigation.navigate("TrendsScreen")}
        >
          <Text style={styles.menuOptionText}>Trends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuOptionView}
          onPress={() => {
            removeFromStorage("login");
            removeFromStorage("password");
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.menuOptionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default MenuScreen;
