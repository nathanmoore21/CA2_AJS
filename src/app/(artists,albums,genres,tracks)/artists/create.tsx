import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRouter } from "expo-router";
import { useSession } from "../../../contexts/AuthContext";
import { ArtistType } from "../../../types";

export default function Page() {
  const { session, isLoading } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();

  const [form, setForm] = useState<ArtistType>({
    name: "",
    record_label: "",
    date_of_birth: "",
    tracks: null,
  });
  const [trackOptions, setTrackOptions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/tracks`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTrackOptions(response.data);
      })
      .catch((e) => {
        console.error(e);
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching tracks."
        );
      });
  }, [session]);

  if (isLoading) return <Text>Loading...</Text>;

  const handleChange = (value: string, id: string) => {
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClick = () => {
    axios
      .post(`https://ajs-ca1.vercel.app/api/artists`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        router.push(`/artists/${response.data._id}`);
      })
      .catch((e) => {
        console.error(e);
        setError(
          e.response?.data?.message ||
            "An error occurred while creating the artist."
        );
      });
  };

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

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(value) => handleChange(value, "name")}
          value={form.name}
        />

        <Text style={styles.label}>Record Label:</Text>
        <TextInput
          style={styles.input}
          placeholder="Record Label"
          onChangeText={(value) => handleChange(value, "record_label")}
          value={form.record_label}
        />

        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          onChangeText={(value) => handleChange(value, "date_of_birth")}
          value={form.date_of_birth}
        />

        <Text style={styles.label}>Track:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={form.tracks}
            onValueChange={(value) =>
              setForm((prevForm) => ({ ...prevForm, tracks: value }))
            }
          >
            <Picker.Item label="Select a Track" value={null} />
            {trackOptions.map((track) => (
              <Picker.Item
                key={track._id}
                label={track.title}
                value={track._id}
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
    marginTop: 10,
  },
  input: {
    height: 40,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
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
  },
  picker: {
    height: 40,
    color: "black",
  },
});
