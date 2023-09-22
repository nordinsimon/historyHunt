import PlacesList from "../components/places/PlacesList";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";
import { View, StyleSheet } from "react-native";

const AllPlacesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const places = [];

  if (route.params?.place) {
    places.push(route.params.place);
  }

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

export default AllPlacesScreen;

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
