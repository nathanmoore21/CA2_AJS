// Importing modules and components from React and React Native libraries
import React, { useState } from "react"; // Import React and useState
import axios from "axios"; // Import axios
import { Button } from "react-native"; // Import Button component
import { useSession } from "../contexts/AuthContext"; // Import useSession hook

interface MyProps {
  resource: string; // Resource to delete
  id: string; // Id of the resource to delete
  deleteCallback?: (id?: string) => void; // Callback function to call after deleting
}

export default function DeleteBtn({ resource, id, deleteCallback }: MyProps) {
  const [deleting, setDeleting] = useState(false); // State for storing the deleting status
  const { session } = useSession(); // Fetch user session

  // Function to handle the delete operation
  const handleDelete = () => {
    setDeleting(true); //

    // Make a DELETE request to the API
    axios
      .delete(`https://ajs-ca1.vercel.app/api/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      // Then response is received, log the response data and call the deleteCallback function
      .then((response: any) => {
        console.log(response.data);
        if (deleteCallback) {
          deleteCallback(id);
        }
      })
      // Catch any errors and log them to the console
      .catch((e: any) => {
        console.error(e);
      })
      // Finally, set deleting back to false
      .finally(() => {
        setDeleting(false);
      });
  };

  // Return a button component
  return (
    <Button
      title={deleting ? "Deleting..." : "Delete"}
      onPress={handleDelete}
      color={"red"}
    />
  );
}
