import { useEffect, useState } from "react";
import { Cliente } from "../../types/Cliente";
import { getClienteById } from "../../api/service/clienteService";
import { ScrollView, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ClienteStackParamList } from "../../navigation/ClienteNavigator";
import GlobalStyle from "../../styles/globalStyle";
import { DataTable } from "react-native-paper";

type Props = NativeStackScreenProps<ClienteStackParamList, "ClienteMenu">;

export default function ClienteMenu({ route }: Props) {
  const [cliente, setCliente] = useState<Cliente>();

  const fetchCliente = async () => {
    const clienteData = await getClienteById(route.params.clienteId);
    setCliente(clienteData.cliente);
  };

  const pedido = [];
  for (let i = 0; i < 10; i++) {
    pedido.push(i);
  }

  useEffect(() => {
    fetchCliente();
  }, []);

  return (
    <ScrollView style={GlobalStyle.screen}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Produto</DataTable.Title>
          <DataTable.Title>Quantidade</DataTable.Title>
          <DataTable.Title>Valor</DataTable.Title>
          <DataTable.Title>Valor Total</DataTable.Title>
        </DataTable.Header>
        {pedido.map((pedido) => (
          <DataTable.Row key={pedido}>
            <DataTable.Cell>teste</DataTable.Cell>
            <DataTable.Cell>teste</DataTable.Cell>
            <DataTable.Cell>teste</DataTable.Cell>
            <DataTable.Cell>teste</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
