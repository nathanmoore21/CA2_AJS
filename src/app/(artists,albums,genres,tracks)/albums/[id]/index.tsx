// Importing modules and components from React and React Native libraries
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native"; // Import View, Text, Image, TouchableOpacity, and StyleSheet components
import axios from "axios"; // Import axios
import { useRouter } from "expo-router"; // Import useRouter from Expo Router
import { useLocalSearchParams } from "expo-router"; // Import useLocalSearchParams from Expo Router
import { useSession } from "../../../../contexts/AuthContext"; // Import useSession from AuthContext

const Page = () => {
  const { session, isLoading } = useSession(); // Fetch user session
  const [album, setAlbum] = useState<any>(null); // State for storing album data
  const [error, setError] = useState<string | null>(null); // State for storing error messages
  const router = useRouter(); // Router for navigation
  const { id } = useLocalSearchParams(); // Get the id from the URL

  // Fetch album data when 'id' changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ajs-ca1.vercel.app/api/albums/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );

        console.log(response.data); // Log the response data
        setAlbum(response.data); // Set the album data
        setError(null);
        // Catch any errors and set the error message
      } catch (e: any) {
        console.error(e);

        // Check if the error response contains a message
        if (e.response && e.response.data && e.response.data.message) {
          setError(`Error: ${e.response.data.message}`);
          // Else set a generic error message
        } else {
          setError("An error occurred while fetching the data.");
        }
      }
    };

    // Call the fetchData function
    fetchData();
  }, [id, session]);

  // Check if the album data is loading or if there is no album data
  if (isLoading || !album) {
    return <Text>Loading...</Text>;
  }

  // Navigate to the home page
  const navigateToHome = () => {
    router.push("/");
  };

  // Navigate to the albums page
  const navigateBack = () => {
    router.push("/albums");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateBack}>
          <Text style={styles.buttonText}>All Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {/* Image on the left */}
        <Image
          source={{
            uri: "https://images.squarespace-cdn.com/content/v1/5b0dd7581aef1d319395b854/982a6fa3-8c2f-4a0b-b504-2d24e185b162/unnamed-10.jpg",
          }}
          style={styles.albumImage}
        />

        {/* Text information on the right */}
        <View style={styles.rightContent}>
          <Text style={styles.title}>{album.title}</Text>

          <Text style={styles.heading}>Description:</Text>
          <Text style={styles.textOutput}>{album.description}</Text>
          <Text style={styles.heading}>Song Count:</Text>
          <Text style={styles.textOutput}>{album.song_count}</Text>

          <Text style={styles.heading}>Tracks:</Text>
          {album.tracks ? (
            album.tracks.map((track: any) => (
              <Text key={track._id} style={styles.textOutput}>
                {track.title}
              </Text>
            ))
          ) : (
            <Text>No tracks available</Text>
          )}

          {/* Genres */}
          <Text style={styles.heading}>Genres:</Text>
          {album.genres &&
            album.genres.map((genre: any) => (
              <Text key={genre._id} style={styles.textOutput}>
                {genre.name}
              </Text>
            ))}

          {/* Check if there is an error message */}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window"); // Get the window width

// Styles for the AlbumDetails component
const styles = StyleSheet.create({
  // Container for the album details
  container: {
    flexDirection: "column",
    padding: 16,
  },
  // Content set in a row
  contentContainer: {
    flexDirection: "row",
  },
  // Set the image width to half of the screen width
  albumImage: {
    flex: 1,
    aspectRatio: 1, // Aspect ratio
    maxWidth: 900 / 2, // Set maximum width as half of the screen width
    marginRight: 16,
  },
  // Set the right content
  rightContent: {
    flex: 1,
  },
  // Album title
  title: {
    fontSize: 100,
    fontWeight: "bold",
    marginBottom: 8,
  },
  // Button row
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
    borderWidth: 2,
    borderColor: "black",
  },
  // Button text
  buttonText: {
    color: "000",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Heading
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  // Error message
  error: {
    color: "red",
    marginTop: 16,
  },
  // Text output
  textOutput: {
    marginBottom: 8,
  },
});

export default Page;
