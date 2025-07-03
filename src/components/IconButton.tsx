import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function IconButton({
  iconName,
  onPress,
}: {
  iconName: any;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#e0e0e0" : "transparent",
        borderRadius: 20,
        padding: 6,
        marginRight: 20,
      })}
    >
      <Ionicons name={iconName} size={28} />
    </Pressable>
  );
}
