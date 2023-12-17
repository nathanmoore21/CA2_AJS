import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import GenreItem from "../../../components/GenreItem";

export default function Page() {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://ajs-ca1.vercel.app/api/genres")
      .then((response) => {
        console.log(response.data);
        setGenres(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const onDelete = (id?: string) => {
    let newGenres = genres.filter((genre: any) => genre._id !== id);
    setGenres(newGenres);
  };

  let genresList = genres.map((genre: any) => {
    return <GenreItem key={genre._id} genre={genre} onDelete={onDelete} />;
  });

  const navigateToCreateGenre = () => {
    router.push("/genres/create");
  };

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={navigateToCreateGenre}>
          <Text style={styles.buttonText}>Create Genre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
      {genresList}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    width: 150,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
