import React, { useState } from "react";
import ClienteHome from "../screens/cliente/ClienteHome";
import ClienteMenu from "../screens/cliente/ClienteMenu";
import { createStackNavigator } from "@react-navigation/stack";
import IconButton from "../components/IconButton";
import EditarCliente from "../screens/cliente/EditarCliente";

export type ClienteStackParamList = {
  ClienteHome: undefined;
  ClienteMenu: { clienteId: number; nome: string };
};

const Stack = createStackNavigator<ClienteStackParamList>();

export default function ClienteNavigator() {
  const [editarModal, setEditarModal] = useState<boolean>(false);
  const [cliente, setCliente] = useState<number>(0);
  return (
    <>
      <EditarCliente
        id={cliente}
        modalVisible={editarModal}
        onClose={() => setEditarModal(false)}
      ></EditarCliente>
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
                  onPress={() => {
                    setCliente(route.params.clienteId), setEditarModal(true);
                  }}
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
    </>
  );
}
