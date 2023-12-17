import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import TrackItem from "../../../components/TrackItem";

export default function Page() {
  const [tracks, setTracks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://ajs-ca1.vercel.app/api/tracks")
      .then((response) => {
        console.log(response.data);
        setTracks(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onDelete = (id?: string) => {
    let newTracks = tracks.filter((track: any) => track._id !== id);
    setTracks(newTracks);
  };

  let tracksList = tracks.map((track: any) => {
    return <TrackItem key={track._id} track={track} onDelete={onDelete} />;
  });

  const navigateToCreateTrack = () => {
    router.push("/tracks/create");
  };

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateToCreateTrack}>
          <Text style={styles.buttonText}>Create Track</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      {tracksList}
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
