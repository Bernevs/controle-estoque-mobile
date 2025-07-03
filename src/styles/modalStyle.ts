// modalStyle.ts
import { StyleSheet } from "react-native";

const ModalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1, // ocupa a tela toda
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center", // centraliza horizontalmente
    backgroundColor: "rgba(0, 0, 0, 0.5)", // fundo escuro semitransparente
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
});

export default ModalStyle;
