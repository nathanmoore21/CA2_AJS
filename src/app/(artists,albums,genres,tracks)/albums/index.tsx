// Importing modules and components from React and React Native libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AlbumItem from "../../../components/AlbumItem";

// Album page component
export default function Page() {
  const [albums, setAlbums] = useState([]); // State for storing albums
  const router = useRouter(); // Router for navigation

  // Fetch album data when the page loads
  useEffect(() => {
    axios
      .get("https://ajs-ca1.vercel.app/api/albums")
      // Then response is received, show the albums
      .then((response) => {
        console.log(response.data);
        setAlbums(response.data);
      })
      // Catch any errors and log them to the console
      .catch((e) => {
        console.error(e);
      });
  }, []); // Only run once when the page loads

  // Handle album deletion
  const onDelete = (id?: string) => {
    let newAlbums = albums.filter((album: any) => album._id !== id); // Filter out the deleted album
    setAlbums(newAlbums); // Update the albums state
  };

  // Map the albums to AlbumItem components
  let albumsList = albums.map((album: any) => {
    return <AlbumItem key={album._id} album={album} onDelete={onDelete} />;
  });

  // Navigate to the create album page
  const navigateToCreateAlbum = () => {
    router.push("/albums/create"); // Navigate to the create album page
  };

  // Navigate to the home page
  const navigateToHome = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <View style={styles.container}>
      {/* Button Row */}
      <View style={styles.buttonRow}>
        {/* Create album Button */}
        <TouchableOpacity style={styles.button} onPress={navigateToCreateAlbum}>
          <Text style={styles.buttonText}>Create Album</Text>
        </TouchableOpacity>

        {/* Go Home Button */}
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      {/* Display albums List n*/}
      {albumsList}
    </View>
  );
}

// Styles for the album page
const styles = StyleSheet.create({
  // Styles for the album page
  container: {
    flex: 1,
    padding: 16,
  },
  // Button Row
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  // Button for navigation
  button: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 8,
    alignItems: "center",
    width: 150,
    borderWidth: 2,
    borderColor: "black",
  },
  // Button text
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
