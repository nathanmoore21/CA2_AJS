// Importing modules and components from React and React Native libraries
import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"; // Import View, Text, TextInput, and TouchableOpacity components
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import axios from "axios"; // Import axios library
import { useLocalSearchParams, useRouter } from "expo-router"; // Import useLocalSearchParams and useRouter hooks
import { useSession } from "../../../../contexts/AuthContext"; // Import useSession hook
import { AlbumType } from "../../../../types"; // Import AlbumType interface

export default function Page() {
  // Fetch user session
  const { session, isLoading } = useSession();

  // State for storing album data, form data, and error messages
  const [album, setAlbum] = useState(null); // Album data
  const [error, setError] = useState(""); // Error message
  const { id } = useLocalSearchParams(); // Get the id from the URL
  const router = useRouter(); // Router for navigation

  // State for managing form inputs and available albums
  const [form, setForm] = useState<AlbumType>({
    title: "", // Value for the selected title
    description: "", // Value for the selected description
    song_count: 0, // Value for the selected song count
    tracks: null, // Value for the selected tracks; set to null by default
    genres: null, // Value for the selected genres; set to null by default
  });
  const [trackOptions, setTrackOptions] = useState<any[]>([]); // Array of available tracks
  const [genreOptions, setGenreOptions] = useState<any[]>([]); // Array of available genres

  // Fetch album data when 'id' changes
  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      // then response is received, set the album data
      .then((response) => {
        setAlbum(response.data);
        setForm(response.data);
      })
      // Catch any errors and set the error message
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching the data."
        );
      });
  }, [id, session]);

  // Fetch track data when the session changes
  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/tracks`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        setTrackOptions(response.data);
      })
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching tracks."
        );
      });
  }, [session]);

  // Fetch genre data when the session changes
  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/genres`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        setGenreOptions(response.data);
      })
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching genres."
        );
      });
  }, [session]);

  // Show loading message if data is still loading
  if (isLoading) return <Text>Loading...</Text>;

  // Show error message if album data is not available
  if (!album) return <Text>{error}</Text>;

  // Handle form input changes
  const handleChange = (value: string, id: string) => {
    setForm((prevState) => ({ ...prevState, [id]: value }));
  };

  // Handle form submission
  const handleClick = () => {
    axios
      .put(`https://ajs-ca1.vercel.app/api/albums/${id}`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      // If the response is successful, navigate to the album details page
      .then((response) => {
        router.push(`/albums/${id}`);
      })
      // Else, catch any errors and set the error message
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while updating the album."
        );
      });
  };

  // Navigate to the home page
  const navigateToHome = () => {
    router.push("/");
  };

  // Navigate back to the albums page
  const navigateBack = () => {
    router.push("/albums");
  };

  return (
    <View style={styles.container}>
      {/* Button Row for navigation */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateBack}>
          <Text style={styles.buttonText}>All Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Form Inputs */}
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={(value) => handleChange(value, "title")}
          value={form.title}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={(value) => handleChange(value, "description")}
          value={form.description}
        />

        <Text style={styles.label}>Song Count:</Text>
        <TextInput
          style={styles.input}
          placeholder="Song Count"
          onChangeText={(value) => handleChange(value, "song_count")}
          value={form.song_count.toString()} // Convert to string
        />

        <Text style={styles.label}>Track:</Text>
        <View style={styles.pickerContainer}>
          {/* Dropdown for selecting an album */}
          <Picker
            style={styles.picker}
            selectedValue={form.tracks}
            onValueChange={(value: string | null) =>
              setForm((prevForm) => ({ ...prevForm, tracks: value }))
            }
          >
            <Picker.Item label="Select a Track" value={null} />
            {/* Map through the album options and display them as Picker Items */}
            {trackOptions.map((track) => (
              // Set the key to the album id and the label and value to the album title
              <Picker.Item
                key={track._id}
                label={track.title}
                value={track._id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Genre:</Text>
        <View style={styles.pickerContainer}>
          {/* Dropdown for selecting an album */}
          <Picker
            style={styles.picker}
            selectedValue={form.genres}
            onValueChange={(value: string | null) =>
              setForm((prevForm) => ({ ...prevForm, genres: value }))
            }
          >
            <Picker.Item label="Select a Genre" value={null} />
            {genreOptions.map((genre) => (
              <Picker.Item
                key={genre._id}
                label={genre.name}
                value={genre._id}
              />
            ))}
          </Picker>
        </View>

        {/* Display error messages */}
        <Text style={styles.error}>{error}</Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleClick}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the EditAlbum component
const styles = StyleSheet.create({
  // Container for the album item
  container: {
    flex: 1,
    padding: 16,
  },
  // Form Container
  formContainer: {
    flex: 1,
    padding: 16,
    alignSelf: "center",
    width: "50%",
  },
  // Label for the form inputs
  label: {
    fontSize: 24,
    marginBottom: 5,
  },
  // Input for the form
  input: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  // Error message
  error: {
    color: "red",
    marginTop: 10,
  },
  // Button Row for navigation
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
  // Button Text
  submitButton: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: "auto",
    alignItems: "center",
    width: 150,
    color: "black",
    borderWidth: 2,
    borderColor: "#000",
  },
  // Text inside the submit button
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Text inside the top button (All Albums and Go Home)
  buttonText: {
    color: "000",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Picker container
  pickerContainer: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  // Picker
  picker: {
    height: 40,
    color: "black",
  },
});
