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

interface CadastrarClientProps {
  modalVisible: boolean;
  onClose: () => void;
}

export default function CadastrarCliente({
  modalVisible,
  onClose,
}: CadastrarClientProps) {
  const [nome, setNome] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await createCliente(nome);

      console.log(response.status);

      if (response.status == 201) {
        Alert.alert("Sucesso", "Cliente cadastrado com sucesso!", [
          { text: "OK", onPress: () => onClose() },
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
              value={nome}
              onChangeText={setNome}
              style={FormStyle.input}
            ></TextInput>
            <Button title="Cancelar" onPress={() => onClose()}></Button>
            <Button
              title="Cadastrar Cliente"
              onPress={() => handleSubmit()}
            ></Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
