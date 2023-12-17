import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import DeleteBtn from "./DeleteBtn";

interface MyProps {
  track: {
    _id: string;
    title: string;
    album: string;
    rating: number;
    artist: string;
  };
  onDelete?: (id?: string) => void;
}

export default function TrackItem({ track, onDelete }: MyProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButtonContainer}
        onPress={() => router.push(`/tracks/${track._id}`)}
      >
        <Text style={styles.iconButtonText}>{track.title.charAt(0)}</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: "/tracks/[id]",
          params: { id: track._id },
        }}
      >
        <Text style={styles.trackTitle}>{track.title}</Text>
      </Link>
      <View style={styles.editDeleteButtonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/tracks/${track._id}/edit`)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <DeleteBtn resource="tracks" id={track._id} deleteCallback={onDelete} />
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
  trackTitle: {
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
