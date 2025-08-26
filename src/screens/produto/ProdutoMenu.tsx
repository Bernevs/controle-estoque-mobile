import { Alert, ScrollView, View } from "react-native";
import { ProdutoStackScreenProps } from "../../types/ProdutoNavigation";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Loading from "../../components/Loading";
import {
  deleteProduto,
  getProdutoById,
} from "../../api/service/produtoService";
import { Produto } from "../../types/Produto";
import GlobalStyle from "../../styles/globalStyle";
import IconButton from "../../components/IconButton";
import { DataTable } from "react-native-paper";
import EditarProduto from "./EditarProduto";

type Props = ProdutoStackScreenProps<"ProdutoMenu">;

export default function ProdutoMenu({ navigation, route }: Props) {
  const [produto, setProduto] = useState<Produto>();
  const [editarModal, setEditarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduto = async () => {
    try {
      setLoading(true);
      const response = await getProdutoById(route.params.produtoId);
      setProduto(response.data.produto);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    Alert.alert("Deletar Produto?", "", [
      { text: "Cancelar" },
      { text: "Confirmar", onPress: () => confirmDelete() },
    ]);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteProduto(route.params.produtoId);

      if (response.status == 200) {
        Alert.alert("Sucesso", "Produto deletado com sucesso!", [
          { text: "OK" },
        ]);
      } else {
        Alert.alert("Error", "Erro ao deletar produto!", [{ text: "OK" }]);
      }
    } catch (error: any) {
      console.error(error);
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
      fetchProduto();
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
      <EditarProduto
        id={route.params.produtoId}
        modalVisible={editarModal}
        onClose={(reload) => {
          setEditarModal(false);
          if (reload) {
            fetchProduto();
          }
        }}
      ></EditarProduto>
      <View style={GlobalStyle.iconGroup}>
        <IconButton
          iconName={"trash-outline"}
          margin={300}
          onPress={() => handleDelete()}
        ></IconButton>
        <IconButton
          iconName={"pencil"}
          onPress={() => setEditarModal(true)}
        ></IconButton>
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
