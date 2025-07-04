import { useCallback, useEffect, useState } from "react";
import { Cliente } from "../../types/Cliente";
import { getClienteById } from "../../api/service/clienteService";
import { ScrollView, Text, View } from "react-native";
import GlobalStyle from "../../styles/globalStyle";
import { DataTable } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { ClienteStackScreenProps } from "../../types/Navigation";
import EditarCliente from "./EditarCliente";
import IconButton from "../../components/IconButton";

type Props = ClienteStackScreenProps<"ClienteMenu">;

export default function ClienteMenu({ navigation, route }: Props) {
  const [cliente, setCliente] = useState<Cliente>();
  const [editarModal, setEditarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCliente = async () => {
    try {
      setLoading(true);
      const clienteData = await getClienteById(route.params.clienteId);
      setCliente(clienteData.cliente);
    } finally {
      setLoading(false);
    }
  };

  const pedido = [];
  for (let i = 0; i < 10; i++) {
    pedido.push(i);
  }

  useFocusEffect(
    useCallback(() => {
      fetchCliente();
    }, [])
  );

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <ScrollView style={GlobalStyle.screen}>
      <EditarCliente
        id={route.params.clienteId}
        modalVisible={editarModal}
        onClose={(reload) => {
          setEditarModal(false);
          if (reload) {
            fetchCliente();
          }
        }}
      ></EditarCliente>
      <View style={GlobalStyle.iconGroup}>
        <IconButton iconName="arrow-back" onPress={() => navigation.goBack()} />
        <IconButton iconName="pencil" onPress={() => setEditarModal(true)} />
        <IconButton
          iconName="cash-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={GlobalStyle.line}></View>
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
