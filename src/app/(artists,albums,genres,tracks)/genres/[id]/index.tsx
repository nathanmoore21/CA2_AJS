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
  const [genre, setGenre] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ajs-ca1.vercel.app/api/genres/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );

        console.log(response.data);
        setGenre(response.data);
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

  if (isLoading || !genre) {
    return <Text>Loading...</Text>;
  }

  const navigateToHome = () => {
    router.push("/");
  };

  const navigateBack = () => {
    router.push("/genres");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateBack}>
          <Text style={styles.buttonText}>All Genres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/26/26433.png",
          }}
          style={styles.genreImage}
        />

        <View style={styles.rightContent}>
          <Text style={styles.title}>{genre.name}</Text>

          <Text style={styles.heading}>Description:</Text>
          <Text style={styles.textOutput}>{genre.description}</Text>

          <Text style={styles.heading}>Album:</Text>
          {genre.albums.map((album: any) => (
            <Text key={album._id} style={styles.textOutput}>
              {album.title}
            </Text>
          ))}
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
  genreImage: {
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
