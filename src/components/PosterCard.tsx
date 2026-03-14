import { View, Text, Image, StyleSheet } from "react-native";
import { radius } from "@/theme/radius";
import { colors } from "@/theme/colors";

interface PosterCardProps {
  title: string;
  poster: string;
}

export default function PosterCard({ title, poster }: PosterCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: poster }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: radius.md,
  },

  title: {
    color: colors.text,
    marginTop: 6,
    fontSize: 14,
  },
});
