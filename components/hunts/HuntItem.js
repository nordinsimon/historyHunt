import { Text, View, StyleSheet, Pressable } from "react-native";

const HuntItem = ({ hunt, onPress }) => {
  console.log("hunt", hunt);
  return (
    <Pressable onPress={() => onPress(hunt)}>
      <View style={styles.container}>
        <Text style={styles.title}>{hunt.title}</Text>
        <Text>{hunt.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HuntItem;
