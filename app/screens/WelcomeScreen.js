import React from "react";
import { Text, View } from "react-native";

function WelcomeScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>welcome screen!</Text>
    </View>
  );
}

export default WelcomeScreen;