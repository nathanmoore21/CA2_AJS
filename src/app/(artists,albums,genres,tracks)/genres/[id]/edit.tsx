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
import { GenreType } from "../../../../types";

export default function Page() {
  const { session, isLoading } = useSession();

  const [genre, setGenre] = useState(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState<GenreType>({
    name: "",
    description: "",
    albums: null,
  });
  const [albumOptions, setAlbumOptions] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`https://ajs-ca1.vercel.app/api/genres/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        setGenre(response.data);
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

  if (isLoading) return <Text>Loading...</Text>;

  if (!genre) return <Text>{error}</Text>;

  const handleChange = (value: string, id: string) => {
    setForm((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleClick = () => {
    axios
      .put(`https://ajs-ca1.vercel.app/api/genres/${id}`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        router.push(`/genres/${id}`);
      })
      .catch((e) => {
        setError(
          e.response?.data?.message ||
            "An error occurred while updating the genre."
        );
      });
  };

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

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(value) => handleChange(value, "name")}
          value={form.name}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={(value) => handleChange(value, "description")}
          value={form.description}
        />

        <Text style={styles.label}>Album:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={form.albums}
            onValueChange={(value: string | null) =>
              setForm((prevForm) => ({ ...prevForm, albums: value }))
            }
          >
            <Picker.Item label="Select an album" value={null} />
            {albumOptions.map((album) => (
              <Picker.Item
                key={album._id}
                label={album.title}
                value={album._id}
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
