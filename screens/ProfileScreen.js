import { Text, View, StyleSheet, Image } from "react-native";
import ImagePicker from "../components/camera/ImagePicker";
import React, { Component, useState, useContext } from "react";
import IconButton from "../components/ui/IconButton";

import AllHuntsScreen from "./AllHuntsScreen";

import { AuthContext } from "../store/AuthContext";

const ProfilePage = ({ navigation }) => {
  const [editProfilePicture, setEditProfilePicture] = useState(false);
  const [profilePictureExists, setProfilePictureExists] = useState(false);
  const [profilePicture, setProfilePicture] = useState();

  const authCtx = useContext(AuthContext);
  const username = authCtx.username;

  const editProfilePictureButton = () => {
    console.log("edit profile picture");
    setEditProfilePicture(true);
  };

  const imageHandler = (uri) => {
    console.log("imageHandler", uri);
    const newProfilePicture = { image: uri };
    setProfilePicture(newProfilePicture);
    setProfilePictureExists(true);
    setEditProfilePicture(false);
  };

  if (editProfilePicture) {
    return (
      <View style={styles.container}>
        <ImagePicker imageHandler={imageHandler} cameraViewFront={true} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            {profilePictureExists ? (
              <Image
                style={styles.image}
                source={{ uri: profilePicture.image }}
              />
            ) : null}
            <View style={styles.profilePictureEdit}>
              <IconButton
                icon={"pencil"}
                size={15}
                onPress={editProfilePictureButton}
              />
            </View>
          </View>
          <Text style={styles.username}>{username}</Text>
        </View>
        <Text style={styles.header}>Hunts:</Text>
        <AllHuntsScreen navigation={navigation} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  profilePicture: {
    marginTop: 10,
    alignItems: "center",
    borderRadius: 1000,
    height: 130,
    width: 130,
    backgroundColor: "red",
  },
  profilePictureEdit: {
    position: "absolute",
    backgroundColor: "orange",
    borderRadius: 1000,
    bottom: 0,
    right: 0,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 10000,
    borderColor: "purple",
    borderWidth: 5,
    borderStyle: "solid",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  username: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  medals: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default ProfilePage;
