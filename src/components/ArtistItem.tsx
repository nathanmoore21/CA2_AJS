import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import DeleteBtn from "./DeleteBtn";

interface MyProps {
  artist: {
    _id: string;
    name: string;
    record_label: string;
    date_of_birth: string;
    tracks: string | null;
  };
  onDelete?: (id?: string) => void;
}

export default function ArtistItem({ artist, onDelete }: MyProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButtonContainer}
        onPress={() => router.push(`/artists/${artist._id}`)}
      >
        <Text style={styles.iconButtonText}>{artist.name.charAt(0)}</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: "/artists/[id]",
          params: { id: artist._id },
        }}
      >
        <Text style={styles.artistName}>{artist.name}</Text>
      </Link>
      <View style={styles.editDeleteButtonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/artists/${artist._id}/edit`)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <DeleteBtn
          resource="artists"
          id={artist._id}
          deleteCallback={onDelete}
        />
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
  artistName: {
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
