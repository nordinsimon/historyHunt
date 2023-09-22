import { useEffect, useState } from "react";
import PlacesList from "../components/hunts/PlacesList";
import IconButton from "../components/ui/IconButton";
import { View, StyleSheet } from "react-native";

const SpecificHuntScreen = ({ navigation, route }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const place = route.params?.place;
    if (place) {
      setPlaces((prev) => [...prev, place]);
    }
  }, [route]);

  return (
    <View style={styles.headerContainer}>
      <IconButton
        name="add"
        onPress={() =>
          navigation.navigate("AddPlaceStack", { screen: "AddPlace" })
        }
        style={styles.addButton}
      />
      <PlacesList places={places} />
    </View>
  );
};

export default SpecificHuntScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
