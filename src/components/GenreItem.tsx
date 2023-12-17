import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import DeleteBtn from "./DeleteBtn";

interface MyProps {
  genre: {
    _id: string;
    name: string;
    description: string;
    album: string;
  };
  onDelete?: (id?: string) => void;
}

export default function GenreItem({ genre, onDelete }: MyProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButtonContainer}
        onPress={() => router.push(`/genres/${genre._id}`)}
      >
        <Text style={styles.iconButtonText}>{genre.name.charAt(0)}</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: "/genres/[id]",
          params: { id: genre._id },
        }}
      >
        <Text style={styles.genreName}>{genre.name}</Text>
      </Link>
      <View style={styles.editDeleteButtonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/genres/${genre._id}/edit`)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <DeleteBtn resource="genres" id={genre._id} deleteCallback={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
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
  iconButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  genreName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editDeleteButtonContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
