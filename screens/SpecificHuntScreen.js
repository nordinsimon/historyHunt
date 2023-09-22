import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

// Comp + util
import PlacesList from "../components/hunts/PlacesList";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles.js";
import { addNewData } from "../util/dataBaseReq";

const SpecificHuntScreen = ({ navigation, route }) => {
  const [places, setPlaces] = useState([]);
  const [huntTitle, setHuntTitle] = useState("");

  useEffect(() => {
    const place = route.params?.place;
    if (place) {
      setPlaces((prev) => [...prev, place]);
    }
  }, [route]);

  const saveHunt = () => {
    const placesWithoutImageUri = places.map((place) => {
      const { imageUri, ...placeWithoutImageUri } = place;
      return placeWithoutImageUri;
    });
    const postData = { title: huntTitle, places: placesWithoutImageUri };
    addNewData("hunts", postData);
    navigation.navigate("AllHuntsScreen");
  };

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
      <TextInput
        style={styles.input}
        placeholder="Hunt name"
        onChangeText={setHuntTitle}
      />
      <Button style={styles.button} onPress={saveHunt}>
        Save point
      </Button>
      <View style={{ height: 30 }}></View>
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
  input: {
    fontSize: 16,
    borderBottomColor: Colors.primary800,
    color: Colors.primary800,
    borderBottomWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: Colors.primary100,
    opacity: 0.8,
  },
});
