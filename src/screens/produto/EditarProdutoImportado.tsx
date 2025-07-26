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
import { Produto } from "../../types/Produto";

export default function EditarProdutoImportado({
  objeto,
  modalVisible,
  onClose,
}: ModalProps) {
  const produto = objeto as Produto;
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
            <Text style={FormStyle.label}>Nome: </Text>
            <TextInput style={FormStyle.input}></TextInput>
            <Text style={FormStyle.label}>Preco de compra: </Text>
            <TextInput style={FormStyle.input}></TextInput>
            <Text style={FormStyle.label}>Preco de venda: </Text>
            <TextInput style={FormStyle.input}></TextInput>
            <Text style={FormStyle.label}>Quantidade: </Text>
            <TextInput style={FormStyle.input}></TextInput>
            <View style={FormStyle.buttonGroup}>
              <Button
                title="Cancelar"
                color={"red"}
                onPress={() => onClose(true)}
              ></Button>
              <Button title="Editar" color={"black"}></Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
