import { Text, StyleSheet } from "react-native";
import { LondrinaOutline_400Regular, useFonts } from "@expo-google-fonts/londrina-outline";
import colors from "@/constants/colors";

type Props = {
  fontSize?: number;
  color?: string;
};

export function ThemedLogo({ fontSize = 36, color = colors.white }: Props) {
  const [fontsLoaded] = useFonts({
    LondrinaOutline_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text style={[styles.text, { fontSize, color }]}>
      +Hábitos
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "LondrinaOutline_400Regular",
    textAlign: "center",
  },
});
