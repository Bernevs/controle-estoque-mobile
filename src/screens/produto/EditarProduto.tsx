import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { ModalProps } from "../../types/Modal";
import ModalStyle from "../../styles/modalStyle";
import FormStyle from "../../styles/formStyle";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  getProdutoById,
  updateProduto,
} from "../../api/service/produtoService";
import { Produto } from "../../types/Produto";
import Loading from "../../components/Loading";

export default function EditarProduto({
  id,
  modalVisible,
  onClose,
}: ModalProps) {
  const [nome, setNome] = useState<string>("");
  const [precoCompra, setPrecoCompra] = useState<string>("");
  const [precoVenda, setPrecoVenda] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [loading, set_loading] = useState<boolean>(true);

  const fetchProduto = async () => {
    try {
      set_loading(true);
      const response = await getProdutoById(id!);
      setNome(response.data.produto.nome);
      setPrecoCompra(response.data.produto.preco_compra);
      setPrecoVenda(response.data.produto.preco_venda);
      setQuantidade(String(response.data.produto.quantidade));
    } catch (error: any) {
      console.error(error);
    } finally {
      set_loading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const produto: Produto = {
        nome: nome,
        preco_compra: Number(precoCompra),
        preco_venda: Number(precoVenda),
        quantidade: Number(quantidade),
        status: 1,
      };
      const response = await updateProduto(id!, produto);
      if (response.status == 200) {
        Alert.alert("Sucesso", "Produto alterado com sucesso!", [
          { text: "OK", onPress: () => onClose(true) },
        ]);
      } else {
        Alert.alert("error", "Erro ao alterar o produto!", [{ text: "OK" }]);
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    if (modalVisible && id) {
      fetchProduto();
    }
  }, [id, modalVisible]);

  return (
    <SafeAreaView>
      <Modal
        visible={modalVisible}
        onRequestClose={() => onClose()}
        animationType="fade"
        transparent={true}
      >
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.modalView}>
            {loading ? (
              <Loading></Loading>
            ) : (
              <View>
                <Text style={FormStyle.label}>Nome: </Text>
                <TextInput
                  value={nome}
                  onChangeText={setNome}
                  style={FormStyle.input}
                ></TextInput>
                <Text style={FormStyle.label}>Preço de compra: </Text>
                <TextInput
                  value={precoCompra}
                  onChangeText={setPrecoCompra}
                  style={FormStyle.input}
                ></TextInput>
                <Text style={FormStyle.label}>Preco de venda: </Text>
                <TextInput
                  value={precoVenda}
                  onChangeText={setPrecoVenda}
                  style={FormStyle.input}
                ></TextInput>
                <Text style={FormStyle.label}>Quantidade: </Text>
                <TextInput
                  value={quantidade}
                  onChangeText={setQuantidade}
                  style={FormStyle.input}
                ></TextInput>
                <View style={FormStyle.buttonGroup}>
                  <Button
                    title="Cancelar"
                    color={"red"}
                    onPress={() => onClose()}
                  ></Button>
                  <Button
                    title="Alterar Produto"
                    color={"black"}
                    onPress={() => handleSubmit()}
                  ></Button>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
