import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import Container from "@/components/Container";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import { updateProgress } from "@/database/contentRepository";
import { Content } from "@/database/contentTypes";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { radius } from "@/theme/radius";

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Detalhes"
>;

export default function DetailsScreen() {
  const route = useRoute();
  const { content } = route.params as any;

  async function handleUpdateProgress() {
    const newProgress = content.progress + 10;
    await updateProgress(content.id, newProgress);
  }

  return (
    <Container>
      <Image source={{ uri: content.poster ?? "" }} style={styles.poster} />

      <Text style={styles.title}>{content.title}</Text>

      <Text style={styles.info}>
        {content.platform} • {content.type}
      </Text>

      <View style={styles.section}>
        <Text style={{ color: colors.text }}>Temporada: {content.season}</Text>
        <Text style={{ color: colors.text }}>Episódio: {content.episode}</Text>
        <Text style={{ color: colors.text }}>
          Duração: {content.duration} min
        </Text>
      </View>

      <View style={{ marginBottom: spacing.sm }}>
        <ProgressBar progress={content.progress ?? 0} />
      </View>

      <Button title="Assistir +10 min" onPress={handleUpdateProgress} />
    </Container>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: 400,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: spacing.sm,
    color: colors.text,
  },

  info: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  section: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
});
