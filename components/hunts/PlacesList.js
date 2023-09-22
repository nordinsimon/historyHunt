import { FlatList, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/styles";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  if (!places || places.length < 1) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 12,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.primary800,
  },
});
