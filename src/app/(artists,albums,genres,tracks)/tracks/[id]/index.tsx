import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useSession } from "../../../../contexts/AuthContext";

const Page = () => {
  const { session, isLoading } = useSession();
  const [track, setTrack] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ajs-ca1.vercel.app/api/tracks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );

        console.log(response.data);
        setTrack(response.data);
        setError(null);
      } catch (e: any) {
        console.error(e);

        if (e.response && e.response.data && e.response.data.message) {
          setError(`Error: ${e.response.data.message}`);
        } else {
          setError("An error occurred while fetching the data.");
        }
      }
    };

    fetchData();
  }, [id, session]);

  if (isLoading || !track) {
    return <Text>Loading...</Text>;
  }

  const navigateToHome = () => {
    router.push("/");
  };

  const navigateBack = () => {
    router.push("/tracks");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateBack}>
          <Text style={styles.buttonText}>All Tracks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: "https://dspncdn.com/a1/media/692x/13/67/a0/1367a0cb38d293fdad607332ae54f42d.jpg",
          }}
          style={styles.trackImage}
        />
        <View style={styles.rightContent}>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.heading}>Rating:</Text>
          <Text style={styles.textOutput}>{track.rating}</Text>
          <Text style={styles.heading}>Albums:</Text>
          {track.album ? (
            <Text style={styles.textOutput}>{track.album.title}</Text>
          ) : (
            <Text>No album available</Text>
          )}
          <Text style={styles.heading}>Artists:</Text>
          {track.artist ? (
            <Text style={styles.textOutput}>{track.artist.name}</Text>
          ) : (
            <Text>No artist available</Text>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 16,
  },
  contentContainer: {
    flexDirection: "row",
  },
  trackImage: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 900 / 2,
    marginRight: 16,
  },
  rightContent: {
    flex: 1,
  },
  title: {
    fontSize: 100,
    fontWeight: "bold",
    marginBottom: 8,
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
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    color: "000",
    fontSize: 18,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginTop: 16,
  },
  textOutput: {
    marginBottom: 8,
  },
});

export default Page;
