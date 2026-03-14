import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
});
