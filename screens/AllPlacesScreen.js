import PlacesList from "../components/places/PlacesList";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";
import { View, StyleSheet } from "react-native";

const AllPlacesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <IconButton
        name="add"
        onPress={() =>
          navigation.navigate("AddPlaceStack", { screen: "AddPlace" })
        }
        style={styles.addButton}
      />
      <PlacesList />
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
