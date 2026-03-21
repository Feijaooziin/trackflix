import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MoviesScreen from "@/screens/MoviesScreen";
import SeriesScreen from "@/screens/SeriesScreen";
import WatchedScreen from "@/screens/WatchedScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import AddContentScreen from "@/screens/AddContentScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName: any;

          if (route.name === "Filmes") iconName = "film-outline";
          else if (route.name === "Séries") iconName = "tv-outline";
          else if (route.name === "Assistidos")
            iconName = "checkmark-circle-outline";
          else if (route.name === "Configurações")
            iconName = "settings-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#E50914",
        tabBarInactiveTintColor: "#999",
        // headerShown: false,
      })}
    >
      <Tab.Screen name="Filmes" component={MoviesScreen} />
      <Tab.Screen name="Séries" component={SeriesScreen} />
      <Tab.Screen name="Assistidos" component={WatchedScreen} />
      <Tab.Screen name="Configurações" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Detalhes" component={DetailsScreen} />
        <Stack.Screen name="Adicionar" component={AddContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
