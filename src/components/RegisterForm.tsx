// Importing modules and components from React and React Native libraries
import { TextInput, StyleSheet, Text, TouchableOpacity } from "react-native"; // Importing TextInput, StyleSheet, Text and TouchableOpacity components from React Native library
import { useState } from "react"; // Importing useState hook from React library
import axios from "axios"; // Importing axios library
import { useSession } from "../contexts/AuthContext"; // Importing useSession hook from AuthContext
import { RegisterFormType } from "../types"; // Importing RegisterFormType type

// RegisterForm component
export default function RegisterForm({ switchForm }: { switchForm: () => void }) {
  // RegisterForm component
  const { signIn } = useSession(); // Get the signIn function from the AuthContext

  const [form, setForm] = useState<RegisterFormType>({
    // State for managing form inputs
    full_name: "", // State for storing the full name input
    email: "", // State for storing the email input
    password: "", // State for storing the password input
  });
  const [error, setError] = useState(""); // State for storing error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for storing success messages

  // Handle form input changes
  const handleChange = (text: string, inputId: string) => {
    // Handle form input changes
    setForm((prevState) => ({
      // Update the form state
      ...prevState, // Keep the previous state
      [inputId]: text, // Update the changed input
    }));
  };

  // Handle form submission
  const handleClick = () => {
    axios
      // Send a POST request to the API
      .post("https://ajs-ca1.vercel.app/api/users/register", form) // Send the form state as the request body
      .then((response) => {
        console.log(response.data); // Log the response
        signIn(response.data.token); // Sign in the user
        setSuccessMessage("Account created. Please log in to continue."); // Set the success message
        setError("");
      })
      .catch((e) => {
        // Log any errors
        console.error(e);
        // Check if the error response contains a message
        if (e.response && e.response.data && e.response.data.message) {
          // Set the error message
          setError(`Error: ${e.response.data.message}`);
        } else {
          // Else set a generic error message
          setError("An error occurred while registering.");
        }
        setSuccessMessage("");
      });
  };

  return (
    <>
      <Text style={styles.title}>Tracks API</Text>
      <Text style={styles.subheading}>
        You must Log in or Register to continue
      </Text>

      {/* Form inputs */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => handleChange(text, "full_name")}
        value={form.full_name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => handleChange(text, "email")}
        value={form.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => handleChange(text, "password")}
        value={form.password}
      />
      {successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleClick}>
        <Text style={styles.submitButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Switch to login form button */}
      <TouchableOpacity onPress={switchForm}>
        <Text style={styles.switchFormText}>Back to the Login Form</Text>
      </TouchableOpacity>
    </>
  );
}

// Styles for the RegisterForm
const styles = StyleSheet.create({
  // Styles for inputs
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  // Submit button
  submitButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: "auto",
    marginTop: 12,
    alignItems: "center",
    width: 150,
    color: "black",
    border: "2px solid #000",
  },
  // Submit button text
  submitButtonText: {
    color: "#black",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Title
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  // Subheading
  subheading: {
    fontSize: 16,
    marginBottom: 16,
  },
  // Success message
  successMessage: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  // Error message
  errorMessage: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  switchFormText: {
    color: "#808080", // Light grey color
    fontSize: 16,
    marginTop: 12,
    fontStyle: "italic", // Italic style
    textDecorationLine: "underline", // Underline style
  },
});
