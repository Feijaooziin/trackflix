import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Container from "@/components/Container";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import { deleteContent, updateProgress } from "@/database/contentRepository";
import { spacing } from "@/theme/spacing";
import { radius } from "@/theme/radius";
import { useTheme } from "@/theme/useTheme";

export default function DetailsScreen() {
  const { theme } = useTheme();
  const route = useRoute();
  const { content } = route.params as any;

  async function handleUpdateProgress() {
    const newProgress = content.progress + 10;
    await updateProgress(content.id, newProgress);
  }

  async function handleDelete() {
    await deleteContent(content.id);
  }

  return (
    <Container>
      <Image source={{ uri: content.poster ?? "" }} style={styles.poster} />

      <Text style={[styles.title, { color: theme.text }]}>{content.title}</Text>

      <Text style={[styles.info, { color: theme.textSecondary }]}>
        {content.platform} • {content.type}
      </Text>

      <View style={styles.section}>
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: "900",
            opacity: 0.8,
          }}
        >
          Onde parei:
        </Text>
        {content.type == "series" && (
          <>
            <Text style={{ color: theme.text }}>
              Temporada: {content.season}
            </Text>
            <Text style={{ color: theme.text }}>
              Episódio: {content.episode}
            </Text>
          </>
        )}
        <Text style={{ color: theme.text }}>
          Duração: {content.duration} min
        </Text>
      </View>

      <View style={{ marginBottom: spacing.sm }}>
        <ProgressBar progress={content.progress ?? 0} />
      </View>

      <View style={{ gap: spacing.md }}>
        <Button title="Assistir +10 min" onPress={handleUpdateProgress} />
        <Button title="Excluir da lista" onPress={handleDelete} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: 450,
    resizeMode: "contain",
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },

  info: {
    marginBottom: spacing.md,
  },

  section: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
});
