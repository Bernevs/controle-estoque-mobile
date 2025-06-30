import { StyleSheet } from "react-native";

const GlobalStyle = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e5e7e9",
  },
  item_title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default GlobalStyle;
