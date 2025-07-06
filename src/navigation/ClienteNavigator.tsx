import ClienteHome from "../screens/cliente/ClienteHome";
import ClienteMenu from "../screens/cliente/ClienteMenu";
import { createStackNavigator } from "@react-navigation/stack";
import { ClienteStackParamList } from "../types/Navigation";

const Stack = createStackNavigator<ClienteStackParamList>();

export default function ClienteNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClienteHome"
        component={ClienteHome}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name={"ClienteMenu"}
        component={ClienteMenu}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
