import { StyleSheet } from "react-native";

const FormStyle = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    width: 100,
  },
});

export default FormStyle;
