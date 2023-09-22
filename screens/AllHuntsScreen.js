import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { getData } from "../util/dataBaseReq";

import { AuthContext } from "../store/AuthContext";

const AllHuntsScreen = ({ navigation }) => {
  const [huntTitles, setHuntTitles] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authCtx = useContext(AuthContext);
  const { activeHunts, setActiveHunts, completedHunts } = authCtx;

  const addActiveHunt = (title) => {
    setActiveHunts([...activeHunts, title]);
  };

  useEffect(() => {
    getData("hunts").then((data) => {
      const huntTitlesArray = [];
      const allDataArray = [];

      Object.keys(data).forEach((huntKey, index) => {
        const huntData = data[huntKey];
        if (huntData.title) {
          huntTitlesArray.push(huntData.title);
          allDataArray.push(huntData);
        }
      });
      setAllData(allDataArray);
      setHuntTitles(huntTitlesArray);
      setIsLoading(false);
    });
  }, [setAllData]);

  const navigateToSpecificHunt = (index) => {
    const huntData = allData[index];
    navigation.navigate("GameScreen", { huntData });
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {huntTitles.map((title, index) => (
            <View key={index} style={styles.hunts}>
              <Text
                onPress={() => {
                  navigateToSpecificHunt(index);
                  addActiveHunt(title);
                }}
                style={styles.title}
              >
                {title}
              </Text>
            </View>
          ))}
        </View>
      )}
      <View style={{ height: 50 }}></View>
    </ScrollView>
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
