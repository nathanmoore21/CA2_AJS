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
  const [artist, setArtist] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ajs-ca1.vercel.app/api/artists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );

        console.log(response.data);
        setArtist(response.data);
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

  if (isLoading || !artist) {
    return <Text>Loading...</Text>;
  }

  const navigateToHome = () => {
    router.push("/");
  };

  const navigateBack = () => {
    router.push("/artists");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateBack}>
          <Text style={styles.buttonText}>All Artists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: "https://lswhawk.com/wp-content/uploads/2023/09/Screenshot-2023-09-01-at-9.21.19-AM.png",
          }}
          style={styles.artistImage}
        />

        <View style={styles.rightContent}>
          <Text style={styles.title}>{artist.name}</Text>

          <Text style={styles.heading}>Record Label:</Text>
          <Text style={styles.textOutput}>{artist.record_label}</Text>
          <Text style={styles.heading}>Date of Birth:</Text>
          <Text style={styles.textOutput}>
            {/* installed moment to display date of birth in a clearer format */}
            {new Date(artist.date_of_birth).toLocaleDateString("en-UK")}
          </Text>

          <Text style={styles.heading}>Tracks:</Text>
          {artist.tracks ? (
            artist.tracks.map((track: any) => (
              <Text key={track._id} style={styles.textOutput}>
                {track.title}
              </Text>
            ))
          ) : (
            <Text>No tracks available</Text>
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
  artistImage: {
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
