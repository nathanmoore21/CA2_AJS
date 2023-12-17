// Importing modules and components from React and React Native libraries
import { Drawer } from "expo-router/drawer";
import { SessionProvider } from "../contexts/AuthContext";

// Layout component
export default function Layout() {
  return (
    // Wrap the app in the SessionProvider
    <SessionProvider>
      <Drawer>
        {/* Drawer items */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Tracks API",
          }}
        />
        <Drawer.Screen
          name="(tracks)"
          options={{
            drawerLabel: "Tracks",
            title: "Tracks API",
          }}
        />
        <Drawer.Screen
          name="(genres)"
          options={{
            drawerLabel: "Genres",
            title: "Tracks API",
          }}
        />
        <Drawer.Screen
          name="(albums)"
          options={{
            drawerLabel: "Albums",
            title: "Tracks API",
          }}
        />
        <Drawer.Screen
          name="(artists)"
          options={{
            drawerLabel: "Artists",
            title: "Tracks API",
          }}
        />
      </Drawer>
    </SessionProvider>
  );
}
