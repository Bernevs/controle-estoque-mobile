import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClienteNavigator from "./ClienteNavigator";
import ProdutoNavigator from "./ProdutoNavigator";
import VendaNavigator from "./VendaNavigator";
import IconButton from "../components/IconButton";
import CadastrarCliente from "../screens/cliente/CadastrarCliente";
import { View } from "react-native";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const [clienteModalVisible, setClienteModalVisible] =
    useState<boolean>(false);
  return (
    <>
      <CadastrarCliente
        modalVisible={clienteModalVisible}
        onClose={() => setClienteModalVisible(false)}
      ></CadastrarCliente>
      <Drawer.Navigator initialRouteName="Cliente">
        <Drawer.Screen name="Venda" component={VendaNavigator} />
        <Drawer.Screen
          name="Cliente"
          component={ClienteNavigator}
          options={{
            headerRight: () => (
              <IconButton
                iconName="add-circle"
                onPress={() => setClienteModalVisible(true)}
              ></IconButton>
            ),
          }}
        />
        <Drawer.Screen name="Produto" component={ProdutoNavigator} />
      </Drawer.Navigator>
    </>
  );
}
