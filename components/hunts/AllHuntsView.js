import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../../util/dataBaseReq";

const AllHuntsScreen = ({ navigation }) => {
  const [huntTitles, setHuntTitles] = useState([]);
  const [adressData, setAdressData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData("hunts").then((data) => {
      const huntTitlesArray = [];
      Object.keys(data).forEach((huntKey) => {
        const huntData = data[huntKey];
        if (huntData.title) {
          huntTitlesArray.push(huntData.title);
        }
        setAdressData(huntData);
      });
      setHuntTitles(huntTitlesArray);
      setIsLoading(false);
    });
  }, []);

  const navigateToSpecificHunt = () => {
    navigation.navigate("GameScreen", { adressData });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {huntTitles.map((title, index) => (
            <View key={index} style={styles.hunts}>
              <Text onPress={navigateToSpecificHunt} style={styles.title}>
                {title}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
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
  hunts: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default AllHuntsScreen;
