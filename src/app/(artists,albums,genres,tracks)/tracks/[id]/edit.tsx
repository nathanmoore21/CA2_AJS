import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "../../../../contexts/AuthContext";
import { TrackType } from "../../../../types";

export default function Page() {
  const { session, isLoading } = useSession();

  const [track, setTrack] = useState(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<TrackType>({
    title: "",
    album: null,
    rating: 0,
    artist: null,
  });
  const [albumOptions, setAlbumOptions] = useState<any[]>([]);
  const [artistOptions, setArtistOptions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        setTrack(response.data);
        setForm(response.data);
      })
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching the data."
        );
      });
  }, [id, session]);

  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/albums`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        setAlbumOptions(response.data);
      })
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching albums."
        );
      });
  }, [session]);

  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/artists`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        setArtistOptions(response.data);
      })
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching artists."
        );
      });
  }, [session]);

  if (isLoading) return <Text>Loading...</Text>;

  if (!track) return <Text>{error}</Text>;

  const handleChange = (value: string, id: string) => {
    setForm((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleClick = () => {
    axios
      .put(`https://ajs-ca1.vercel.app/api/tracks/${id}`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        router.push(`/tracks/${id}`);
      })
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while updating the track."
        );
      });
  };

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

      <View style={styles.formContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={(value) => handleChange(value, "title")}
          value={form.title}
        />

        <Text style={styles.label}>Albums:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={form.album}
            onValueChange={(value: string | null) =>
              setForm((prevForm) => ({ ...prevForm, album: value }))
            }
          >
            <Picker.Item label="Select an Album" value={null} />
            {albumOptions.map((album) => (
              <Picker.Item
                key={album._id}
                label={album.title}
                value={album._id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Rating:</Text>
        <TextInput
          style={styles.input}
          placeholder="Rating"
          onChangeText={(value) => handleChange(value, "rating")}
          value={form.rating.toString()}
        />

        <Text style={styles.label}>Artist:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={form.artist}
            onValueChange={(value: string | null) =>
              setForm((prevForm) => ({ ...prevForm, artist: value }))
            }
          >
            <Picker.Item label="Select an Artist" value={null} />
            {artistOptions.map((artist) => (
              <Picker.Item
                key={artist._id}
                label={artist.name}
                value={artist._id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.error}>{error}</Text>

        <TouchableOpacity style={styles.submitButton} onPress={handleClick}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    flex: 1,
    padding: 16,
    alignSelf: "center",
    width: "50%",
  },
  label: {
    fontSize: 24,
    marginBottom: 5,
  },
  input: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  error: {
    color: "red",
    marginTop: 10,
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
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "000",
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  picker: {
    height: 40,
    color: "black",
  },
});
