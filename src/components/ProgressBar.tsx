import { View, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radius";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 6,
    backgroundColor: "#333",
    borderRadius: radius.round,
  },

  progress: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: radius.round,
  },
});
