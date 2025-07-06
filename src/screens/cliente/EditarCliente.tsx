import {
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
import { useState } from "react";
import { updateCliente } from "../../api/service/clienteService";
import { Alert } from "react-native";

export default function EditarCliente({
  id,
  modalVisible,
  onClose,
}: ModalProps) {
  const [nome, setNome] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await updateCliente(id!, nome);
      if (response.status == 200) {
        Alert.alert("Sucesso", "Cliente alterado com sucesso!", [
          { text: "OK", onPress: () => onClose(true) },
        ]);
      } else {
        Alert.alert("Error", "Não foi possivel alterar o cliente", [
          { text: "OK", onPress: () => onClose() },
        ]);
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
            <Text style={FormStyle.label}></Text>
            <TextInput
              placeholder="Informe o nome do cliente"
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
                title="Alterar Cliente"
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
