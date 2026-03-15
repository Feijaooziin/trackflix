import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { radius } from "@/theme/radius";
import { colors } from "@/theme/colors";
import ProgressBar from "@/components/ProgressBar";

interface PosterCardProps {
  title: string;
  poster: string;
  progress?: number;
  onPress?: () => void;
}

export default function PosterCard({
  title,
  poster,
  progress,
  onPress,
}: PosterCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: poster }} style={styles.poster} />
      <Text style={styles.title}>{title}</Text>
      {progress !== undefined && <ProgressBar progress={progress} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
  },

  poster: {
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
