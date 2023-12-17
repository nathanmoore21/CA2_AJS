// // Importing modules and components from React and React Native libraries
import { Text } from "react-native"; // Import the Text component
import { Slot, Redirect } from "expo-router"; // Import the Slot and Redirect components
import Footer from "../../components/Footer"; // Import the Footer component
import { useSession } from "../../contexts/AuthContext"; // Import the useSession hook

// AuthLayout component
export default function AuthLayout() {
  const { session, isLoading } = useSession(); // Fetch user session

  // Check if the session is loading
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  // Check if there is no session
  if (!session) {
    return <Redirect href="/" />;
  }
  // Return the Slot and Footer components
  return (
    <>
      <Slot />
      <Footer />
    </>
  );
}
