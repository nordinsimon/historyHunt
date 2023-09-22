import { Text, View, StyleSheet, Image } from "react-native";
import ImagePicker from "../camera/ImagePicker";
import React, { Component, useState } from "react";
import IconButton from "../ui/IconButton";

const ProfilePage = () => {
  const [editProfilePicture, setEditProfilePicture] = useState(false); // [state, setState
  const [profilePicture, setProfilePicture] = useState();

  const editProfilePictureButton = () => {
    console.log("edit profile picture");
    setEditProfilePicture(true);
  };

  const imageHandler = (uri) => {
    console.log("imageHandler", uri);
    setProfilePicture(uri);
    setEditProfilePicture(false);
  };

  const MabyeProfilePicture = () => {
    // console.log("MabyeProfilePictureLENGTH", profilePicture.length);
    console.log("MabyeProfilePicture", profilePicture);

    if (profilePicture !== undefined) {
      console.log("MabyeProfilePicture TRUE");
      console.log("MabyeProfilePicture", profilePicture);
      return (
        <View style={styles.profilePicture}>
          <Text>Profile picture</Text>
          <Image source={{ uri: profilePicture }} />;
        </View>
      );
    }
  };

  if (editProfilePicture) {
    return (
      <View style={styles.container}>
        <ImagePicker imageHandler={imageHandler} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            <View style={styles.profilePictureEdit}>
              <IconButton
                icon={"pencil"}
                size={15}
                onPress={editProfilePictureButton}
              />
            </View>
          </View>
          <Text style={styles.username}>Username</Text>
        </View>
        <Text style={styles.header}>Active Hunts:</Text>
        <MabyeProfilePicture />
        <Text style={styles.header}>Planned Hunts:</Text>
        <Text style={styles.medals}>Medals</Text>
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
