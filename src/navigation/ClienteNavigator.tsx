import React from "react";
import ClienteHome from "../screens/cliente/ClienteHome";
import ClienteMenu from "../screens/cliente/ClienteMenu";
import { createStackNavigator } from "@react-navigation/stack";
import IconButton from "../components/IconButton";

export type ClienteStackParamList = {
  ClienteHome: undefined;
  ClienteMenu: { clienteId: number; nome: string };
};

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
        options={({ route }) => ({
          title: route.params.nome,
          headerRight: () => (
            <>
              <IconButton
                iconName="pencil"
                onPress={() => console.log("editar")}
              />
              <IconButton
                iconName="cash-outline"
                onPress={() => console.log("dinheiro")}
              />
            </>
          ),
        })}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
