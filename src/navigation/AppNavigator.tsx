import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClienteNavigator from "./ClienteNavigator";
import ProdutoNavigator from "./ProdutoNavigator";
import VendaNavigator from "./VendaNavigator";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Cliente">
      <Drawer.Screen name="Venda" component={VendaNavigator} />
      <Drawer.Screen name="Cliente" component={ClienteNavigator} />
      <Drawer.Screen name="Produto" component={ProdutoNavigator} />
    </Drawer.Navigator>
  );
}
