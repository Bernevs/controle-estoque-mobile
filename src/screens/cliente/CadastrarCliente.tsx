import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import FormStyle from "../../styles/formStyle";
import ModalStyle from "../../styles/modalStyle";
import { createCliente } from "../../api/service/clienteService";
import { ModalProps } from "../../types/Modal";
import GlobalStyle from "../../styles/globalStyle";

export default function CadastrarCliente({
  modalVisible,
  onClose,
}: ModalProps) {
  const [nome, setNome] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await createCliente(nome);

      if (response.status == 201) {
        Alert.alert("Sucesso", "Cliente cadastrado com sucesso!", [
          { text: "OK", onPress: () => onClose(true) },
        ]);
      } else {
        Alert.alert("Erro", "Não foi possivel cadastrar o cliente");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => onClose()}
      >
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.modalView}>
            <Text style={FormStyle.label}>Nome:</Text>
            <TextInput
              placeholder="Informe o nome do cliente"
              multiline={true}
              value={nome}
              onChangeText={setNome}
              style={FormStyle.input}
            ></TextInput>
            <View style={FormStyle.buttonGroup}>
              <Button
                title="Cancelar"
                color={"red"}
                onPress={() => onClose()}
              ></Button>
              <Button
                title="Cadastrar Cliente"
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
