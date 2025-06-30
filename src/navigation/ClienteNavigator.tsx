import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClienteHome from "../screens/cliente/ClienteHome";

export type ClienteStackParamList = {
  ClienteHome: undefined;
};

const Stack = createNativeStackNavigator<ClienteStackParamList>();

export default function ClienteNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClienteHome"
        component={ClienteHome}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
