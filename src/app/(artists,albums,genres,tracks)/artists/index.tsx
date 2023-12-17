import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ArtistItem from "../../../components/ArtistItem";

export default function Page() {
  const [artists, setArtists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://ajs-ca1.vercel.app/api/artists")
      .then((response) => {
        console.log(response.data);
        setArtists(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onDelete = (id?: string) => {
    let newArtists = artists.filter((artist: any) => artist._id !== id);
    setArtists(newArtists);
  };

  let artistsList = artists.map((artist: any) => {
    return <ArtistItem key={artist._id} artist={artist} onDelete={onDelete} />;
  });

  const navigateToCreateArtist = () => {
    router.push("/artists/create");
  };

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToCreateArtist}
        >
          <Text style={styles.buttonText}>Create Artist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      {artistsList}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
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
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
