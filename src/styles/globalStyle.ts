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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
    borderWidth: 0,
  },
  iconGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});

export default GlobalStyle;
