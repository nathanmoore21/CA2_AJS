// Importing modules and components from React and React Native libraries
import React from "react"; // Import the React library
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"; // Import the Text, View, TouchableOpacity, and StyleSheet components
import { Link, useRouter } from "expo-router"; // Import the Link and useRouter components from the Expo Router library
import DeleteBtn from "./DeleteBtn"; // Import the DeleteBtn component

// Defining the album properties
interface MyProps {
  album: {
    _id: string; // Id of the album
    title: string; // Title of the album
    description: string; // Description of the album
    song_count: number; // Number of songs in the album
    tracks: string | null; // Tracks in the album
    genres: string | null; // Genres of the album
  };
  onDelete?: (id?: string) => void; // function that takes an id and returns void
}

// AlbumItem component that takes in the Album properties
export default function AlbumItem({ album, onDelete }: MyProps) {
  const router = useRouter();

  return (
    // Container for the album item
    <View style={styles.container}>
      {/* Button to navigate to the album id */}
      <TouchableOpacity
        style={styles.iconButtonContainer}
        onPress={() => router.push(`/albums/${album._id}`)} // Navigate to the album details
      >
        {/* Display the first letter of the album title */}
        <Text style={styles.iconButtonText}>{album.title.charAt(0)}</Text>
      </TouchableOpacity>
      {/* Link to navigate to the genre id */}
      <Link
        href={{
          pathname: "/albums/[id]",
          params: { id: album._id },
        }}
      >
        <Text style={styles.albumName}>{album.title}</Text>{" "}
        {/* Display the album title */}
      </Link>
      {/* Container for edit and delete buttons */}
      <View style={styles.editDeleteButtonContainer}>
        {/* Edit button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/albums/${album._id}/edit`)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        {/* Delete button using DeleteBtn component */}
        <DeleteBtn resource="albums" id={album._id} deleteCallback={onDelete} />
      </View>
    </View>
  );
}

// Styles for the AlbumItem component
const styles = StyleSheet.create({
  // Container for the album item
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  // Icon button container
  iconButtonContainer: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "black",
  },
  // Text inside the icon button
  iconButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  // Album name text (title)
  albumName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  // Edit and delete buttons container
  editDeleteButtonContainer: {
    flexDirection: "row",
  },
  // Edit button
  editButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  // Text inside the edit button
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
