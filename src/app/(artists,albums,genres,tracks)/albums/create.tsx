// Importing modules and components from React and React Native libraries
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"; // Import View, Text, TextInput, TouchableOpacity, and StyleSheet components
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import axios from "axios"; // Import axios library
import { useRouter } from "expo-router"; // Import useRouter hook
import { useSession } from "../../../contexts/AuthContext"; // Import useSession hook
import { AlbumType } from "../../../types"; // Import AlbumType interface

export default function Page() {
  const { session, isLoading } = useSession(); // Fetch user session
  const [error, setError] = useState(""); // Error message
  const router = useRouter(); // Router for navigation

  const [form, setForm] = useState<AlbumType>({
    title: "", // Value for the selected title
    description: "", // Value for the selected description
    song_count: 0, // Value for the selected song count
    tracks: null, // Value for the selected album; set to null by default
    genres: null, // Value for the selected album; set to null by default
  });
  const [trackOptions, setTrackOptions] = useState<any[]>([]); // List of available tracks
  const [genreOptions, setGenreOptions] = useState<any[]>([]); // List of available genres

  // Fetch track data when the session changes
  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/tracks`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      // Then the response is received, set the track options
      .then((response) => {
        console.log(response.data);
        setTrackOptions(response.data);
      })
      // Catch any errors and set the error message
      .catch((e) => {
        console.error(e);
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching tracks."
        );
      });
  }, [session]); // Re-run when the session changes

  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/genres`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      // Then response is received, set the genres options
      .then((response) => {
        console.log(response.data);
        setGenreOptions(response.data);
      })
      // Catch any errors and set the error message
      .catch((e) => {
        console.error(e);
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching genres."
        );
      });
  }, [session]);

  // Check if the album data is loading
  if (isLoading) return <Text>Loading...</Text>;

  // Handle form input changes
  const handleChange = (value: string, id: string) => {
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleClick = () => {
    axios
      // Send a POST request to the API
      .post(`https://ajs-ca1.vercel.app/api/albums`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      // Then the response is received, navigate to the albums page
      .then((response) => {
        console.log(response.data);
        router.push(`/albums/${response.data._id}`);
      })
      // Catch any errors and set the error message
      .catch((e) => {
        console.error(e);
        setError(
          e.response?.data?.message ||
            "An error occurred while creating the album."
        );
      });
  };

  // Navigate to the home page
  const navigateToHome = () => {
    router.push("/"); // Navigate to the home page
  };

  // Navigate to the albums page
  const navigateBack = () => {
    router.push("/albums"); // Navigate to the albums page
  };

  return (
    <View style={styles.container}>
      {/* Button Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateBack}>
          <Text style={styles.buttonText}>All Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name:</Text>
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
          {/* Picker component */}
          <Picker
            style={styles.picker}
            selectedValue={form.tracks}
            onValueChange={(value) =>
              setForm((prevForm) => ({ ...prevForm, tracks: value }))
            } // Update the form with the selected track
          >
            <Picker.Item label="Select a Track" value={null} />
            {trackOptions.map(
              (
                track // Map through the track options and display them as a Picker Item
              ) => (
                <Picker.Item
                  key={track._id}
                  label={track.title}
                  value={track._id}
                /> // Set the key to the track id and the label and value to the track title
              )
            )}
          </Picker>
        </View>

        <Text style={styles.label}>Genre:</Text>
        <View style={styles.pickerContainer}>
          {/* Picker component */}
          <Picker
            style={styles.picker}
            selectedValue={form.genres}
            onValueChange={(value) =>
              setForm((prevForm) => ({ ...prevForm, genres: value }))
            } // Update the form with the selected genre
          >
            <Picker.Item label="Select a Genre" value={null} />
            {genreOptions.map(
              (
                genre // Map through the genre options and display them as a Picker Item
              ) => (
                <Picker.Item
                  key={genre._id}
                  label={genre.name}
                  value={genre._id}
                /> // Set the key to the genre id and the label and value to the genre title
              )
            )}
          </Picker>
        </View>

        {/* Display error message */}
        <Text style={styles.error}>{error}</Text>

        {/* Submit button to handle form submission*/}
        <TouchableOpacity style={styles.submitButton} onPress={handleClick}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the GenreCreate component
const styles = StyleSheet.create({
  // Container for the genre create page
  container: {
    flex: 1,
    padding: 16,
  },
  // Form container
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
    marginTop: 10,
  },
  // Input field
  input: {
    height: 40,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white", // Set the background color to white as I can't change the background color of the picker
  },
  // Error message
  error: {
    color: "red",
    marginTop: 10,
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
  // Submit button
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
  // Text inside the button
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
    color: "black", // Text color
  },
});
