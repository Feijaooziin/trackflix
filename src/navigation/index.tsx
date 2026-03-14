import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TestScreen from "@/screens/testScreen";
import HomeScreen from "@/screens/HomeScreen";
import WatchingScreen from "@/screens/WatchingScreen";
import WatchedScreen from "@/screens/WatchedScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import AddContentScreen from "@/screens/AddContentScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Testes" component={TestScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Assistindo" component={WatchingScreen} />
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
