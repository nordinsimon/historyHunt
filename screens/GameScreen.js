import React, { useState } from "react";
import { View, Text } from "react-native";

import StartHunter from "../components/game/StartHunter.js";
import GameMap from "../components/game/GameMap.js";
import Button from "../components/ui/Button.js";

const GameScreen = ({ route, navigation }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const { adressData } = route.params;

  const { lat, lng } = adressData.places[0].location;

  const onStartGame = () => {
    console.log("started game");
    setGameStarted(true);
  };
  const quitGame = () => {
    setGameStarted(false);
    navigation.navigate("Profile");
  };

  return (
    <View>
      {gameStarted ? (
        <GameMap quitGame={quitGame} gameLocations={adressData.places} />
      ) : (
        <StartHunter onStartGame={onStartGame} firstLocation={{ lat, lng }} />
      )}
    </View>
  );
};

export default GameScreen;
