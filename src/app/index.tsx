// Importing modules and components from React and React Native libraries
import React, { useState } from "react"; // Importing React and useState hook from React library
import { View, Text, StyleSheet } from "react-native"; // Importing View, Text and StyleSheet components from React Native library
import { Link } from "expo-router"; // Importing Link component from Expo Router library
import { Avatar, Button } from "react-native-elements"; // Importing Avatar and Button components from React Native Elements library
import LoginForm from "../components/LoginForm"; // Importing LoginForm component
import RegisterForm from "../components/RegisterForm"; // Importing RegisterForm component
import { useSession } from "../contexts/AuthContext"; // Importing useSession hook from AuthContext
import Footer from "../components/Footer"; // Importing Footer component

// Capitalise the first letter of a string because the API uses lowercase
const capitaliseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1); // Capitalise the first letter of a string

// HomePage component
const HomePage = () => {
  const { session, signOut } = useSession(); // Get the session and signOut functions from the AuthContext
  const [hoveredButton, setHoveredButton] = useState(null); // Track the hovered button
  const [currentForm, setCurrentForm] = useState("login"); // Track the current form

  // Switch between the login and register forms
  const switchForm = () => {
    setCurrentForm((prevForm) => (prevForm === "login" ? "register" : "login"));
  };

  return (
    <View style={styles.container}>
      {/* Check if the user is logged in */}
      {!session ? (
        // If not logged in, show the login and register forms
        currentForm === "login" ? (
          // If the current form is login, show the login form
          <LoginForm switchForm={switchForm} />
        ) : (
          // Else show the register form
          <RegisterForm switchForm={switchForm} />
        )
      ) : (
        // Else show the home page
        <>
          <View style={styles.logoutContainer}>
            <Text onPress={signOut} style={styles.logoutText}>
              Log out
            </Text>
          </View>
          <View style={styles.avatarContainer}>
            <Avatar
              size="small"
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              containerStyle={styles.avatarBackground}
            />
          </View>
          <Text style={styles.title}>Welcome to Tracks API!</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              {/* Map over the pages and create a button for each */}
              {["tracks", "albums"].map((page, index) => (
                <View
                  key={index}
                  onMouseEnter={() => setHoveredButton(page)} // Set the hovered button
                  onMouseLeave={() => setHoveredButton(null)} // Reset the hovered button
                >
                  <Link href={`/${page}`} asChild>
                    <Button
                      buttonStyle={[
                        styles.pagebutton,
                        hoveredButton === page && styles.pagebuttonHover,
                      ]}
                      title={capitaliseFirstLetter(page)}
                      titleStyle={[
                        styles.buttonText,
                        hoveredButton === page && styles.buttonTextHover,
                      ]}
                    />
                  </Link>
                </View>
              ))}
            </View>
            <View style={styles.buttonRow}>
              {["artists", "genres"].map((page, index) => (
                <View
                  key={index}
                  onMouseEnter={() => setHoveredButton(page)} // Set the hovered button
                  onMouseLeave={() => setHoveredButton(null)} // Reset the hovered button
                >
                  <Link href={`/${page}`} asChild>
                    <Button
                      buttonStyle={[
                        styles.pagebutton,
                        hoveredButton === page && styles.pagebuttonHover,
                      ]}
                      title={capitaliseFirstLetter(page)}
                      titleStyle={[
                        styles.buttonText,
                        hoveredButton === page && styles.buttonTextHover,
                      ]}
                    />
                  </Link>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
      <Footer />
    </View>
  );
};

// Styles for the home page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    position: "relative",
  },
  // Avatar
  avatarContainer: {
    position: "absolute",
    top: 16,
    right: 130,
    marginBottom: 16,
  },
  // Avatar background
  avatarBackground: {
    top: 7,
    backgroundColor: "black",
  },
  // Title
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  // Button container
  buttonContainer: {
    width: "24%",
    marginTop: 16,
  },
  // Button row
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 11,
    paddingLeft: 11,
    paddingRight: 11,
  },
  // Page button
  pagebutton: {
    width: 150,
    height: 150,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "transparent",
  },
  // Page button hover
  pagebuttonHover: {
    backgroundColor: "black",
  },
  // Button text
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  // Button text hover
  buttonTextHover: {
    color: "white",
  },
  // Logout container
  logoutContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: "auto",
    marginTop: 5,
    alignItems: "center",
    width: 100,
    color: "black",
    border: "1px solid #000",
  },
  // Logout text
  logoutText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomePage;
