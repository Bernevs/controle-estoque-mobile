import { useCallback, useEffect, useState } from "react";
import { Cliente } from "../../types/Cliente";
import {
  deleteCliente,
  getClienteById,
  getPedidoById,
} from "../../api/service/clienteService";
import { Alert, ScrollView, Text, View } from "react-native";
import GlobalStyle from "../../styles/globalStyle";
import { DataTable } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { ClienteStackScreenProps } from "../../types/Navigation";
import EditarCliente from "./EditarCliente";
import IconButton from "../../components/IconButton";
import { Pedido } from "../../types/Pedido";
import { Produto } from "../../types/Produto";
import { getProdutoById } from "../../api/service/produtoService";

type Props = ClienteStackScreenProps<"ClienteMenu">;

export default function ClienteMenu({ navigation, route }: Props) {
  const [cliente, setCliente] = useState<Cliente>();
  const [pedido, set_pedido] = useState<Pedido[]>([]);
  const [editarModal, setEditarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const clienteData = await getClienteById(route.params.clienteId);
      const pedidoData = await getPedidoById(route.params.clienteId);

      setCliente(clienteData.cliente);

      const pedidosComProduto = await Promise.all(
        pedidoData.pedido.map(async (p: Pedido) => {
          const response = await getProdutoById(p.produto_id);
          const produto = response.data.produto;
          return {
            ...p,
            produto_nome: produto.nome,
            preco_venda: produto.preco_venda,
          };
        })
      );

      pedidosComProduto.sort((a, b) =>
        a.produto_nome.localeCompare(b.produto_nome)
      );

      set_pedido(pedidosComProduto);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Deletar Cliente?",
      "Isso removerá tudo relacionado a esse cliente",
      [
        { text: "Cancelar" },
        { text: "Confirmar", onPress: () => confirmDelete() },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteCliente(route.params.clienteId);

      if (response.status == 204) {
        Alert.alert("Sucesso", "Cliente deletado com sucesso!", [
          {
            text: "OK",
          },
        ]);
      } else {
        Alert.alert("Error", "Não foi possivel deletar o cliente!", [
          { text: "OK" },
        ]);
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <ScrollView
      style={GlobalStyle.screen}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <EditarCliente
        id={route.params.clienteId}
        modalVisible={editarModal}
        onClose={(reload) => {
          setEditarModal(false);
          if (reload) {
            fetchData();
          }
        }}
      ></EditarCliente>
      <View style={GlobalStyle.iconGroup}>
        <IconButton
          iconName="trash-outline"
          margin={200}
          onPress={() => handleDelete()}
        />
        <IconButton iconName="pencil" onPress={() => setEditarModal(true)} />
        <IconButton
          iconName="cash-outline"
          onPress={() =>
            navigation.navigate("PagamentoHome", {
              clienteId: route.params.clienteId,
            })
          }
        />
      </View>
      <View style={GlobalStyle.line}></View>
      <DataTable>
        <DataTable.Header style={{ backgroundColor: "#eee" }}>
          <DataTable.Title style={{ flex: 3, justifyContent: "flex-start" }}>
            Produto
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
            Qtd
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "center" }}>
            Valor
          </DataTable.Title>
          <DataTable.Title
            style={{
              flex: 1,
              justifyContent: "center",
              borderLeftWidth: 1,
              borderLeftColor: "#ccc",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Total</Text>
          </DataTable.Title>
        </DataTable.Header>

        {pedido.map((pedido: Pedido) => (
          <DataTable.Row
            key={pedido.id}
            style={{ borderBottomWidth: 1, borderBottomColor: "#eee" }}
          >
            <DataTable.Cell style={{ flex: 3, justifyContent: "flex-start" }}>
              {pedido.produto_nome}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
              {pedido.quantidade}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
              {Number(pedido.preco_venda ?? 0).toFixed(2)}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                flex: 1,
                justifyContent: "center",
                borderLeftWidth: 1,
                borderLeftColor: "#ccc",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {(pedido.preco_venda! * pedido.quantidade).toFixed(2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row style={{ backgroundColor: "#eee" }}>
          <DataTable.Cell style={{ flex: 4, justifyContent: "center" }}>
            Total
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 2, justifyContent: "center" }}>
            R$
            {pedido
              .reduce((acc, p) => acc + p.preco_venda! * p.quantidade, 0)
              .toFixed(2)}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </ScrollView>
  );
}
