import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import ModalStyle from "../../styles/modalStyle";
import { ModalProps } from "../../types/Modal";
import FormStyle from "../../styles/formStyle";
import { useState } from "react";
import { createProduto } from "../../api/service/produtoService";
import { Produto } from "../../types/Produto";

export default function CadastrarProduto({
  modalVisible,
  onClose,
}: ModalProps) {
  const [nome, setNome] = useState<string>("");
  const [precoCompra, setPrecoCompra] = useState<string>("");
  const [precoVenda, setPrecoVenda] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const produto: Produto = {
        nome: nome,
        preco_compra: Number(precoCompra),
        preco_venda: Number(precoVenda),
        quantidade: Number(quantidade),
        status: 1,
      };
      const response = await createProduto(produto);

      if (response.status == 201) {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!", [
          { text: "OK", onPress: () => onClose(true) },
        ]);
      } else {
        Alert.alert("error", "Erro ao cadastrar o produto!", [{ text: "OK" }]);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

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
            <Text style={FormStyle.label}>quantidade: </Text>
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
                title="Cadastrar Produto"
                color={"black"}
                onPress={() => handleSubmit()}
              ></Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
