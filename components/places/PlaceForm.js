import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { Colors } from "../../constants/styles";
import ImagePicker from "../camera/ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.input} />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary800,
    marginBottom: 4,
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
