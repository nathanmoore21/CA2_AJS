// Importing modules and components from React and React Native libraries
import React from "react"; // Import React
import { View, Text, StyleSheet } from "react-native"; // Import View, Text, and StyleSheet components

// Footer component
const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* Footer text */}
      <Text style={styles.footerText}>© 2023 Tracks API.</Text>
    </View>
  );
};

// Styles for the Footer component
const styles = StyleSheet.create({
  // Footer container
  footer: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  // Footer text
  footerText: {
    color: "#000",
    fontSize: 12,
  },
});

export default Footer;
