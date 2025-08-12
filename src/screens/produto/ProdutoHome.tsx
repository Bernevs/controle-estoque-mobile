import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Produto } from "../../types/Produto";
import GlobalStyle from "../../styles/globalStyle";
import IconButton from "../../components/IconButton";
import Loading from "../../components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import {
  deleteProduto,
  getProdutos,
  getProdutosEsgotados,
  readPDF,
} from "../../api/service/produtoService";
import { ProdutoStackScreenProps } from "../../types/ProdutoNavigation";
import CadastrarProduto from "./CadastrarProduto";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import EditarProduto from "./EditarProduto";

type Props = ProdutoStackScreenProps<"ProdutoHome">;

export default function ProdutoHome({ navigation }: Props) {
  const [produto, setProduto] = useState<Produto[]>([]);
  const [produto_esgotado, setProduto_esgotado] = useState<Produto[]>([]);
  const [produto_id, set_produto_id] = useState<number>();
  const [cadastrarModal, setCadastrarModal] = useState<boolean>(false);
  const [editarModal, setEditarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const produtos_response = await getProdutos();
      const produtos_esgotados_response = await getProdutosEsgotados();
      setProduto(produtos_response.data.produto);
      setProduto_esgotado(produtos_esgotados_response.data.produto);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectPDF = async () => {
    try {
      const pdf = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (pdf.canceled) {
        return;
      }

      const file = pdf.assets[0].uri;
      const base64 = await FileSystem.readAsStringAsync(file, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await readPDF(base64);
      const json = await response.json();
      const produtos_recebidos = json.produto;
      const produtos_formatados: Produto[] = produtos_recebidos.map(
        (p: any) => ({
          id: p.codigoItem,
          nome: p.nome,
          preco_compra: parseFloat(p.valorUnitario.replace(",", ".")),
          preco_venda: 0,
          quantidade: Number(p.quantidade),
          automatico: 1,
          status: 1,
        })
      );

      navigation.navigate("ImportarProduto", {
        produtos_importados: produtos_formatados,
      });
    } catch (error: any) {}
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Deletar Produto?", "", [
      { text: "Cancelar" },
      { text: "Confirmar", onPress: () => confirmDelete(id) },
    ]);
  };

  const confirmDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteProduto(id);

      if (response.status == 200) {
        Alert.alert("Sucesso", "Produto deletado com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              fetchProdutos();
              setLoading(false);
            },
          },
        ]);
      } else {
        Alert.alert("Error", "Erro ao deletar produto!", [{ text: "OK" }]);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProdutos();
    }, [])
  );

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <ScrollView style={GlobalStyle.screen}>
      <CadastrarProduto
        modalVisible={cadastrarModal}
        onClose={(reload) => {
          setCadastrarModal(false);
          if (reload) {
            fetchProdutos();
          }
        }}
      ></CadastrarProduto>
      <View style={GlobalStyle.iconGroup}>
        <IconButton
          iconName={"add-circle"}
          margin={300}
          onPress={() => setCadastrarModal(true)}
        ></IconButton>
        <IconButton
          iconName={"download-outline"}
          onPress={() => selectPDF()}
        ></IconButton>
      </View>
      <EditarProduto
        id={produto_id}
        modalVisible={editarModal}
        onClose={(reload) => {
          setEditarModal(false);
          if (reload) {
            set_produto_id(undefined);
            fetchProdutos();
          }
        }}
      ></EditarProduto>

      <View style={GlobalStyle.line}></View>
      {produto.map((produto: Produto) => (
        <View
          key={produto.id}
          style={[
            GlobalStyle.item,
            produto.preco_venda == 0 && { backgroundColor: "#fcf3cf" },
          ]}
        >
          <View>
            <View style={GlobalStyle.iconGroup}>
              <IconButton
                iconName={"trash-outline"}
                margin={280}
                onPress={() => handleDelete(produto.id!)}
              ></IconButton>
              <IconButton
                iconName={"create-outline"}
                margin={0}
                onPress={() => {
                  set_produto_id(produto.id!); // atualiza o ID
                  setEditarModal(true); // dá tempo para atualizar
                }}
              ></IconButton>
            </View>

            <Text style={GlobalStyle.item_title}>{produto.nome}</Text>
            <Text style={GlobalStyle.item_content}>
              Preço de compra: R${produto.preco_compra}
            </Text>
            <Text style={GlobalStyle.item_content}>
              Preço de venda: R${produto.preco_venda}
            </Text>
            <Text style={GlobalStyle.item_content}>
              Quantidade: {produto.quantidade}
            </Text>
          </View>
        </View>
      ))}
      <View style={GlobalStyle.line}></View>
      {produto_esgotado.map((produto: Produto) => (
        <View key={produto.id} style={[GlobalStyle.item_esgotado]}>
          <View>
            <View style={GlobalStyle.iconGroup}>
              <IconButton
                iconName={"trash-outline"}
                margin={280}
                onPress={() => handleDelete(produto.id!)}
              ></IconButton>
              <IconButton
                iconName={"create-outline"}
                margin={0}
                onPress={() => {
                  set_produto_id(produto.id!);
                  setEditarModal(true);
                }}
              ></IconButton>
            </View>

            <Text style={GlobalStyle.item_title}>{produto.nome}</Text>
            <Text style={GlobalStyle.item_content}>
              Preço de compra: R${produto.preco_compra}
            </Text>
            <Text style={GlobalStyle.item_content}>
              Preço de venda: R${produto.preco_venda}
            </Text>
            <Text style={GlobalStyle.item_content}>
              Quantidade: {produto.quantidade}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
