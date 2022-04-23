import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 2,
    height: 50,
    backgroundColor: "black",
  },
  allAreasView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  followedTrendsView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  navbarItemText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  underline: {
    height: 0,
    width: 70,
  },
});

export function Navbar(allAreasChosen, setAllAreasChosen) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.allAreasView,
          { backgroundColor: allAreasChosen ? "#6867AC" : "black" },
        ]}
        onPress={() => {
          setAllAreasChosen(true);
        }}
      >
        <Text
          style={[
            styles.navbarItemText,
            { color: "white" },
            // { color: allAreasChosen ? "white" : "black" },
          ]}
        >
          ALL AREAS
        </Text>
        <View
          style={[
            styles.underline,
            {
              borderTopColor: allAreasChosen ? "white" : "black",
              borderTopWidth: allAreasChosen ? 2 : 0,
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.followedTrendsView,
          { backgroundColor: !allAreasChosen ? "#6867AC" : "black" },
        ]}
        onPress={() => setAllAreasChosen(false)}
      >
        <Text
          style={[
            styles.navbarItemText,
            { color: "white" },
            // { color: !allAreasChosen ? "white" : "black" },
          ]}
        >
          FOLLOWED
        </Text>
        <View
          style={[
            styles.underline,
            {
              borderTopColor: !allAreasChosen ? "white" : "black",
              borderTopWidth: !allAreasChosen ? 2 : 0,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}
