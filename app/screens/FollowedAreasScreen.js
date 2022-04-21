import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { styles } from "../styles/FollowedAreasScreenStyles";
import { Picker } from "@react-native-picker/picker";
import { getPlaces, getTrends } from "../components/Twitter";
import { TrendTile } from "../components/TrendTile";

function FollowedAreasScreen({ navigation }) {
  const [selectedPlace, setSelectedPlace] = React.useState();
  const [availablePlaces, setAvailablePlaces] = React.useState([]);
  const [trends, setTrends] = React.useState();

  React.useEffect(async () => {
    const places = await getPlaces();
    setAvailablePlaces(places);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Picker
          selectedValue={selectedPlace}
          onValueChange={async (itemValue, itemIndex) => {
            setSelectedPlace(itemValue);
            let currentTrends = await getTrends(itemValue);
            setTrends(currentTrends);
          }}
          numberOfLines={1}
          itemStyle={{
            height: 90,
            width: 350,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {availablePlaces.map((place, i) => (
            <Picker.Item label={place.name} value={place.woeid} key={i} />
          ))}
        </Picker>
      </View>
      <ScrollView contentContainerStyle={{ borderTopWidth: 2 }}>
        {trends && trends.map((trend, i) => TrendTile(trend, i))}
      </ScrollView>
      <View>
        <Text>navbar placeholder</Text>
      </View>
    </SafeAreaView>
  );
}

export default FollowedAreasScreen;
